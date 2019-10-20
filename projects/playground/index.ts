import cloneDeep from 'lodash.cloneDeep'



const circular = {
    x: 1,
    foo: {
        bar: 10
    }
}
// @ts-ignore
circular.foo.circular = circular


console.log(cloneDeep(circular))
