import {reactive, effect} from './reactivity'

describe('reactivity/reactive', () => {

    test('Object', () => {
        let counter = 0
        const original = {foo: 1}
        const observed = reactive(original)

        effect(() => {
            counter += 1
            console.log(observed.foo)
        })

        observed.foo = 2
        expect(counter).toBe(2)
    })
})
