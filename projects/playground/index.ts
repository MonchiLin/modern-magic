// import cloneDeep from 'lodash.cloneDeep'
// //
// // const circular = {
// //     x: 1,
// //     foo: {
// //         bar: 10
// //     }
// // }
// // // @ts-ignore
// // circular.foo.circular = circular
// //
// //
// // console.log(cloneDeep(circular))

// @ts-ignore
// eslint-disable-next-line no-extend-native
// Number.prototype.add = function (v) {
//     return this.valueOf() + v
// }

// @ts-ignore
// eslint-disable-next-line no-extend-native
// Number.prototype.reduce = function (v) {
//     return this.valueOf() - v
// }

// @ts-ignore
// console.log((10).add(10).reduce(2).add(10))
//

// @ts-ignore
// eslint-disable-next-line no-extend-native
Array.prototype.myFilter = function (predicate, self?) {
    const arr = this
    const newArr = []

    for (let i = 0; i < arr.length; i++) {
        if (predicate.call(self, arr[i])) {
            newArr.push(arr[i])
        }
    }

    return newArr
}


const arr = [1, 2, 3, 4]
// @ts-ignore
arr.my()
