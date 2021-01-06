import { AdapterLeaf } from './data/AdapterLeafs'
import { Document } from './data/Document'
import { SBTree } from '../../types/SBTree/SBTree'
import { OperationResult } from '../../types/common/OperationResult'
import { SiblingsResult } from './SiblingsResult'
import { RemoveInLeafResult } from './RemoveInLeafResult'
import { SBFLeaf } from '../../types/SBFLeaf/SBFLeaf'
import { PossibleKeys } from './PossibleKeys'
import { QueryOperations } from './QueryOperations'

export interface PersistenceAdapter {
  readonly isReady: boolean
  initWith: (tree: SBTree) => Promise<boolean>
  // CRUD
  getDocument(identifier: string): Promise<Document>
  removeDocument(identifier: string): Promise<void>
  replaceDocument(doc: Document): Promise<void>
  saveDocument(doc: Document): Promise<void>
  //tree operations
  openLeaf(leafName): Promise<AdapterLeaf>
  addInLeaf(
    leafName: string,
    identifier: string,
    value: PossibleKeys,
  ): Promise<number>
  replaceInLeaf(
    leafId: string,
    identifier: string,
    value: PossibleKeys,
  ): Promise<number>
  createLeaf(leafName: string): Promise<void>
  splitLeaf(sourceLeaf: SBFLeaf, siblingLeaf: SBFLeaf): Promise<PossibleKeys>
  getRightInLeaf(leafId: string): Promise<SiblingsResult>
  getLeftInLeaf(leafId: string): Promise<SiblingsResult>
  findInLeaf(
    leafId: string,
    value: PossibleKeys,
    op?: QueryOperations,
  ): Promise<OperationResult>
  getAllInLeaf(leafId: string): Promise<OperationResult>
  removeInLeaf(leafId, identifier): Promise<Array<RemoveInLeafResult>>
}
