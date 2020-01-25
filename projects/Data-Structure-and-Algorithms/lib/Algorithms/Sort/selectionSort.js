import { Compare, defaultCompare, swap } from "../../util";
/**
 * [1,5,6,7,2,4]
 * 计算过程
 *
 * 外层循环 0
 *      内层循环 0
 *          indexMin = 0 比较 arr[indexMin] - 1, arr[0] - 1
 *          arr[indexMin] 不大于 arr[0], 不改变, 当前 indexMin = 0
 *
 *      内层循环 1
 *          indexMin = 0 比较 arr[indexMin] - 1, arr[1] - 5
 *          arr[indexMin] 不大于 arr[1], 不改变, 当前 indexMin = 0
 *
 *      内层循环 2
 *          indexMin = 0 比较 arr[indexMin] - 1, arr[2] - 6
 *          arr[indexMin] 不大于 arr[2], 不改变, 当前 indexMin = 0
 *
 *      内层循环 3
 *          indexMin = 0 比较 arr[indexMin] - 1, arr[3] - 7
 *          arr[indexMin] 不大于 arr[3], 不改变, 当前 indexMin = 0
 *
 *      内层循环 4
 *          indexMin = 0 比较 arr[indexMin] - 1, arr[4] - 2
 *          arr[indexMin] 不大于 arr[4], 不改变, 当前 indexMin = 0
 *
 *      内层循环 5
 *          indexMin = 0 比较 arr[indexMin] - 1, arr[5] - 4
 *          arr[indexMin] 不大于 arr[5], 不改变, 当前 indexMin = 0
 *
 * 外层循环 1
 *      内层循环 1
 *          indexMin = 1 比较 arr[indexMin] - 5, arr[1] - 5
 *          arr[indexMin] 不大于 arr[1], 不改变, 当前  indexMin = 1
 *
 *      内层循环 2
 *          indexMin = 1 比较 arr[indexMin] - 5, arr[2] - 6
 *          arr[indexMin] 不大于 arr[2], 不改变, 当前  indexMin = 1
 *
 *      内层循环 3
 *          indexMin = 1 比较 arr[indexMin] - 5, arr[3] - 7
 *          arr[indexMin] 不大于 arr[3], 不改变, 当前  indexMin = 1
 *
 *      内层循环 4
 *          indexMin = 1 比较 arr[indexMin] - 5, arr[4] - 2
 *          arr[indexMin] 大于 arr[4],  改变,   当前  indexMin = 4
 *
 *      内层循环 5
 *          indexMin = 4 比较 arr[indexMin] - 2, arr[5] - 4
 *          arr[indexMin] 不大于 arr[5], 不改变,  当前 indexMin = 4
 *  交换 1(外层循环) 和 4(indexMin)
 *
 *
 *
 *
 * @param array
 * @param compareFn
 * @constructor
 */
function SelectionSort(array, compareFn = defaultCompare) {
    const { length } = array;
    let indexMin;
    for (let i = 0; i < length; i++) {
        indexMin = i;
        for (let j = i; j < length; j++) {
            if (compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
                indexMin = j;
            }
        }
        // console.log("indexMin", indexMin);
        if (i !== indexMin) {
            swap(array, i, indexMin);
        }
    }
    return array;
}
export default SelectionSort;
//# sourceMappingURL=selectionSort.js.map