import intersection from 'lodash.intersection';
import { SBTree } from '../SBTree/SBTree';
import {getFieldNamesFromQuery} from '../utils/getFieldNamesFromQuery';
import {Document} from '../common/Document'

import { get } from './get';

async function resolveDocuments(this:SBTree, objectIds) {
  const documents = [];
  for (const oid of objectIds) {
    const doc = await this.getDocument(oid);
    documents.push(doc);
  }
  return documents;
}

const findIntersectingIdentifiers = (listOfListOfIdentifiers) => {
  const identifiers = [];

  listOfListOfIdentifiers.forEach((listOfIdentifiers) => {
    identifiers.push(listOfIdentifiers);
  });
  return intersection(...identifiers);
};


/**
 *
 * @param query
 * @returns {Promise<[]>}
 */
export async function query(this: SBTree, query):Promise<Array<Document>> {
  const findNested = async (_promises, _queryFieldName, _queryFieldValue)=> {
    for (const nestedQueryFieldName in _queryFieldValue) {
      const nestedQueryFieldValue = _queryFieldValue[nestedQueryFieldName];
      const nestedQueryFieldType = typeof nestedQueryFieldValue;

      if (['number', 'string', 'boolean', 'object'].includes(nestedQueryFieldType)) {
        const fTree = this.getFieldTree(`${_queryFieldName}.${nestedQueryFieldName}`);
        // Sometimes, like when excluded, this can not resolve.
        if (fTree) {
          _promises.push(fTree.find(nestedQueryFieldValue, '$eq'));
        }
      } else if (nestedQueryFieldType === 'object' && !Array.isArray(nestedQueryFieldValue)) {
        await findNested(_promises, `${_queryFieldName}.${nestedQueryFieldName}`, nestedQueryFieldValue);
      } else {
        throw new Error(`Not supported type : ${nestedQueryFieldType}`);
      }
    }
  };
  if (!query) return [];

  const fields = getFieldNamesFromQuery(query);

  // When our search is based on _id and only _id, we can just get document.
  if (fields.length === 1 && fields.indexOf('_id') > -1) {
    return [await (get.call(this, query._id) as ReturnType<typeof get>)];
  }

  const promises = [];

  fields.forEach((queryFieldName) => {

    let queryFieldValue;

    queryFieldName.split('.').forEach((subFieldName) => {
      queryFieldValue = (queryFieldValue && queryFieldValue[subFieldName])
          ? queryFieldValue[subFieldName]
          : query[subFieldName];
    })

    const queryFieldType = typeof queryFieldValue;
    let fieldTree;

    switch (queryFieldType) {
      case 'number':
      case 'boolean':
      case 'string':
        fieldTree = this.getFieldTree(queryFieldName);
        if (!fieldTree) {
          return;
        }
        promises.push(fieldTree.find(queryFieldValue, '$eq'));
        break;
      case 'object':
        if (Array.isArray(queryFieldValue)) {
          throw new Error('Not supported array input. Please open a Github issue to specify your need.');
        } else {
          const operators = Object.keys(queryFieldValue).filter((el) => el[0] === '$');

          if (operators.length === 0) {
            // Then we iterate on values to perform find on all trees of nested object
            findNested(promises, queryFieldName, queryFieldValue);
          } else {
            fieldTree = this.getFieldTree(queryFieldName);
            for (const operator of operators) {
              promises.push(fieldTree.find(queryFieldValue[operator], operator));
            }
          }
        }
        break;
      default:
        throw new Error(`Not supported type : ${queryFieldType}`);
    }
  });


  let intermediateIdentifiers = [];
  await Promise
      .all(promises)
      .then((pResults) => {
        for (const pResult of pResults) {
          // Whenever we sees that, we can quickly answer an empty response, as [] intersect with nothing.
          if (pResult.identifiers.length === 0) {
            // We remove any previous findings
            intermediateIdentifiers = [];
            break;
          }
          intermediateIdentifiers.push(pResult.identifiers);
        }
      });

  const matchingObjectIds = findIntersectingIdentifiers(intermediateIdentifiers);
  return (resolveDocuments.call(this, matchingObjectIds) as ReturnType<typeof resolveDocuments>);
}

