import {always, Maybe} from '../src'

describe('Maybe', function () {

    it('应该是一个 functor, 并且实现了 map', function () {
        const data = Maybe("hello").map(x => `${x} world`)
        const expectData = "Just(hello world)"

        expect(data.inspect()).toBe(expectData)

    });

    it('应该处理可以为空的数据', function () {
        expect(Maybe(null).isNothing()).toEqual(true)
        expect(Maybe(null).isJust()).toEqual(false)
        expect(Maybe('some data').isNothing()).toEqual(false)
        expect(Maybe('some data').isJust()).toEqual(true)
    });

    it('应该实现 cata', function (done) {

        Maybe("hello")
            .map(x => x + " world")
            .cata({
                Just: x => expect(x).toBe("hello world"),
                Nothing: () => done.fail('Should not be Nothing')
            })

        Maybe(null)
            .map(() => done.fail())
            .chain(() => done.fail())
            .cata({
                Just: () => done.fail(),
                Nothing: () => done()
            })

        expect(() => Maybe(null).cata({})).toThrow()
    });

    it('如果是 Nothing 要返回默认值', done => {
        Maybe(null)
            .default(() => 'some default')
            .cata({
                Just: x => expect(x).toBe('some default'),
                Nothing: () => done.fail('Should not be Nothing')
            })

        Maybe('some data')
            .chain(data => Maybe(null))
            .default(() => 'some default')
            .cata({
                Just: x => expect(x).toBe('some default'),
                Nothing: () => done.fail('Should not be Nothing')
            })

        done()
    })

    it(`如果不是 Nothing, 应该忽略默认值`, done => {
        Maybe({ name: 'jason' })
            .map(person => person.name)
            .default(() => 'some default')
            .cata({
                Just: x => expect(x).toBe('jason'),
                Nothing: () => done.fail('Should not be Nothing')
            })

        done()
    })

    it('应该正确获取内部值', () => {
        expect(Maybe('hello').inspect()).toBe('Just(hello)')
        expect(Maybe(null).inspect()).toBe('Nothing')
    })

    it('使用chain获取内部值', () => {
        expect(Maybe('hello').chain(always)).toBe('hello')

        const NullableChain = Maybe(null).chain(always)
        const expectData = Maybe(null)

        expect(NullableChain).toStrictEqual(expectData)
    })

    it('should apply 2 monads with ap', done => {
        const add = x => y => x + y
        const one = Maybe(1)
        const two = Maybe(2)

        Maybe(add)
            .ap(one)
            .ap(two)
            .cata({
                Just: x => expect(x).toBe(3),
                Nothing: () => done.fail('Should not be Nothing')
            })

        Maybe(null)
            .ap(one)
            .ap(two)
            .cata({
                Just: () => done.fail(),
                Nothing: done
            })

        done()

    })

});
