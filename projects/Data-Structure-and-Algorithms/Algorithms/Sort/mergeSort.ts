import {Compare, defaultCompare} from "../../util";

/**
 * 计算过程
 * 假设输入值 [32, 12, 56, 78, 76, 45, 36]
 *
 *              进入 mergeSort
 *                  middle = 3
 *                  left = [32,12,56]
 *                  right = [78,76,45,36]
 *                  进入 merge( ms(left),               ms(right) )
 *                                      ↙                            ↘
 *                      middle = 1                                   middle = 2
 *                      left   = [32]                                left   = [78,76]
 *                      right  = [12,56]                             right  = [45,36]
 *                      进入 merge( ms(left), ms(right) )
 *                      |         ↙               ↘
 *                      |    return [32]          middle = 1
 *                      |                         left = [12]
 *                      |                         right = [56]
 *                      |                         进入 merge(ms(left), ms(right))
 *                      |                         |            ↙               ↘
 *                      |                         |  return [12]                return[56]
 *                      ↓                         ↓
 *                      merge([32],[23,56])       return [12,56]
 *                      ↓
 *                      return [23,32,56]
 *
 *
 * 归并算法
 * mergeSort 用于切分序列，递归将序列切分至最小
 * 如果序列已经是最小，则将其应用到 merge 中
 * merge 接受 left 和 right
 * left right 有两种情况
 * 1. left 和 right 仅有一个元素，这时候仅需对比两个值哪个大就将哪个放在最前面
 * 2. left 和 right 中都不止存在一个元素
 *      1. 第一种情况，其中某个一个数组到某个索引后剩下的值都大于另一个数组
 *      则值小的数组会先被处理玩，此时将结果数组与另一个数组链接即可
 *          例如： [1,5] [2,9,10,15]
 *          此时计算过程为:
 *          left = [1,5]
 *          right = [2,9,10,15]
 *          result = []
 *          1. left[0] < right[0]  1 < 2
 *             result.push(left.shift())
 *             result = [1]
 *             left = [5]
 *             right = [2,9,10,15]
 *          2. left[0] < right[0]  5 < 2
 *             result.push(right.shift())
 *             result = [1,2]
 *             left = [5]
 *             right = [9,10,15]
 *          3. left[0] < right[0]  5 < 9
 *             result.push(left.shift())
 *             result = [1,2,5]
 *             left = []
 *             right = [9,10,15]
 *          最后链接 result 和剩下的两个数组
 *          result.concat(left).concat(right)
 *
 *
 * @param array
 * @param compareFn
 */
function mergeSort(array, compareFn = defaultCompare) {
    if (array.length === 1) {
        return array
    }

    const middle = Math.floor(array.length / 2)

    const left = array.slice(0, middle)
    const right = array.slice(middle, array.length)

    return merge(mergeSort(left), mergeSort(right), compareFn)
}

function merge(left, right, compareFn) {
    const result = []

    while (left.length > 0 && right.length > 0) {
        if (compareFn(left[0], right[0]) === Compare.LESS_THAN) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }

    return result.concat([...left, ...right])
}


export default mergeSort
