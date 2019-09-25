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


/**
 *
 * 下面的代码看似和上面的代码很像, 但是其效率却要比上面的代码高很多
 * 而其中的原因正是内部循环每次都会少循环一次, 具体原因看下方的计算过程对比
 *
 * [1,3,5,2,6]
 * 计算过程   数组长度 = 5
 * 外层循环 0 当前内部循环次数为 数组长度 - 1(不对比最后一个) - 外层循环索引 = 4
 *    内层循环 0
 *      比较 arr[0] - 1, arr[0 + 1] - 3
 *      arr[0] 更小, 此时不交换, 当前为  [1,3,5,2,6]
 *    内层循环 1
 *      比较 arr[1] - 3, arr[1 + 1] - 5
 *      arr[1] 更小, 此时不交换, 当前为  [1,3,5,2,6]
 *    内层循环 2
 *      比较 arr[2] - 5, arr[2 + 1] - 2
 *      arr[2] 更大, 此时交换, 当前为    [1,3,2,5,6]    --- 交换
 *    内层循环 3
 *      比较 arr[3] - 5, arr[3 + 1] - 6
 *      arr[3] 更小, 此时不交换, 当前为  [1,3,2,5,6]
 *
 * 外层循环 1 当前内部循环次数为 数组长度 - 1(不对比最后一个) - 外层循环索引 = 3
 *    内层循环 0
 *      比较 arr[0] - 1, arr[0 + 1] - 3
 *      arr[0] 更小, 此时不交换, 当前为  [1,3,2,5,6]
 *    内层循环 1
 *      比较 arr[1] - 3, arr[1 + 1] - 2
 *      arr[1] 更大, 此时交换,  当前为  [1,2,3,5,6]      --- 交换
 *    内层循环 2
 *      比较 arr[2] - 5, arr[2 + 1] - 2
 *      arr[2] 更大, 此时交换,  当前为  [1,3,2,5,6]
 *  ... 以此类推
 *
 *  可以看到第一次循环我们可以保证数组 最后一个数 是最大的
 *        第二次循环我们可以保证数组 倒数第二个数 是最大的
 *  由此我们内部循环可以少循环一次
 *
 * @param array
 * @param compareFn
 * @constructor
 */
function ModifiedBubbleSort(array, compareFn = defaultCompare) {
    const {length} = array;

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1 - i; j++) {
            if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
                swap(array, j, j + 1)
            }
        }
    }

    return array
}


export {
    BubbleSort,
    ModifiedBubbleSort
}

export default ModifiedBubbleSort
