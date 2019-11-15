import {swap} from "../../lib/util";

function randomSort<T>(arr: T[]): T[] {
    const len = arr.length
    // console.log("初始数组", arr)

    for (let i = len - 1; i > 0; i--) {
        const randomIndex = Math.floor((i + 1) * Math.random())
        // console.log(`第${arr.length - len}轮，当前随机数${randomIndex}, 当前数组${arr}`)
        swap(arr, i, randomIndex)
    }

    return arr
}


export {
    randomSort
}