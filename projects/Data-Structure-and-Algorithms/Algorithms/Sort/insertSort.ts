import {Compare, defaultCompare} from "../../util";


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
function InsertSort(array, compareFn = defaultCompare) {
    if (array.length === 2) {
        switch (compareFn(array[0], array[1])) {
            case Compare.LESS_THAN:
                return [array[1], array[0]];
            case Compare.BIGGER_THAN:
            default:
                return array
        }
    }


    const {length} = array;

    const tempArray = [];


    for (let i = 0; i < length; i++) {

        let tempIndex = i;
        while (tempIndex < length) {

            tempIndex += 1
        }

    }


    return array
}

export default InsertSort
