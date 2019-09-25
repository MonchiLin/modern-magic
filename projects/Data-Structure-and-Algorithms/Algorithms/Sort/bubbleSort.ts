import {Compare, defaultCompare, swap} from "../../util";

/**
 * [1,3,5,2,6]
 * 计算过程
 * 外层循环 0
 *    内层循环 0
 *      比较 arr[0] - 1, arr[0 + 1] - 3
 *      arr[0] 更小, 此时不交换, 当前为 [1,3,5,2,6]
 *    内层循环 1
 *      比较 arr[1] - 3, arr[1 + 1] - 5
 *      arr[1] 更小, 此时不交换, 当前为 [1,3,5,2,6]
 *    内层循环 2
 *      比较 arr[2] - 5, arr[2 + 1] - 2
 *      arr[2] 更大, 此时交换, 当前为   [1,3,2,5,6]
 *    内层循环 3
 *      比较 arr[3] - 5, arr[3 + 1] - 6
 *      arr[3] 更小, 此时不交换, 当前为 [1,3,2,5,6]
 *
 * 外层循环 1
 *    内层循环 0
 *      比较 arr[0] - 1, arr[0 + 1] - 3
 *      arr[0] 更小, 此时不交换, 当前为 [1,3,2,5,6]
 *    内层循环 1
 *      比较 arr[1] - 3, arr[1 + 1] - 2
 *      arr[0] 更大, 此时交换, 当前为 [1,2,3,5,6]
 *    内层循环 2
 *      比较 arr[2] - 3, arr[2 + 1] - 5
 *      arr[0] 更小, 此时不交换
 * ... 以此类推
 *
 *
 * @param array
 * @param compareFn
 * @constructor
 */
function BubbleSort(array, compareFn = defaultCompare) {
    const {length} = array;

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1; j++) {
            if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
                swap(array, j, j + 1)
            }
        }
    }

    return array
}

export default BubbleSort