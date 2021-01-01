import { comparatorString, comparatorNum }from './comparators';
import { validTypes } from '../constants';

export function insertSorted (arr, item) {
    if (!validTypes.includes(typeof item)) {
      throw new Error(`Unsupported type typeof ${typeof item}`);
    }
    const comparator = (typeof item == 'string') ? comparatorString : comparatorNum;
    let min = 0;
    let max = arr.length;
    let index = Math.floor((min + max) / 2);
    while (max > min) {
      if (comparator(item, arr[index]) < 0) {
        max = index;
      } else {
        min = index + 1;
      }
      index = Math.floor((min + max) / 2);
    }
    if (Array.isArray(item)) {
      arr.splice(index, 0, ...item);
    }else{
      arr.splice(index, 0, item);
    }
    return index;
  }

  export async function forEach(array:Array<any>, eachFn:(item: any , index:number, array:Array<any> )=>Promise<void>) {
    for (let index = 0; index < array.length; index++) {
      await eachFn(array[index], index, array);
    }
  }
