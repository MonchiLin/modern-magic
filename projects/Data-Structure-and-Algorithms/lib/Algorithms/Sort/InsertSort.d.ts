import { defaultCompare } from "../../util";
/**
 * [1,5,6,7,2,4]
 * 计算过程
 *
 * 外层循环 0
 *      内层循环 0
 *          indexMin = 0 比较 arr[indexMin] - 1, arr[0] - 1
 *          arr[indexMin] 不大于 arr[0], 不改变, 当前 indexMin = 0
 *
 *
 * @param array
 * @param compareFn
 * @constructor
 */
declare function InsertSort(array: any, compareFn?: typeof defaultCompare): any;
export default InsertSort;
//# sourceMappingURL=InsertSort.d.ts.map