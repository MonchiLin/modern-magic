const isProperCata = obj => obj.Just && obj.Nothing
const improperCata = () => {
    throw new Error('Cata missing Just or Maybe')
}

/**
 * ap 计算过程
 *
 * @example
 * const add = x => y => x + y
 * const one = Maybe(1)
 * const two = Maybe(2)
 *
 * Maybe(add)
 * .ap(one)
 * .ap(two)
 * .cata({
 *      Just: x => expect(x).toBe(3),
 *      Nothing: () => done.fail('Should not be Nothing')
 *  })
 *
 *  此时 v 是 add
 *  ap(one) === one => add(one)
 *  ap(one).ap(two) === (one => add(one)).ap(two) === (two) => addOne(two)  === 3
 *
 *
 * @param v
 * @constructor
 */

class Just {
    constructor(private _value: Function | any) {
    }

    static of(value) {
        return new Just(value)
    }

    /**
     * 接受一个 Maybe M 然后对类中的 value 调用 M.map
     * @param just
     */
    ap(just) {
        return just.map(this._value)
    }

    /**
     * 接受一个回调函数应用在 cb 上, 之后将结果包在一个新的 Maybe 中, 返回这个 Maybe
     * @param cb
     */
    map(cb: Function) {
        return Just.of(cb(this._value))
    }

    /**
     * 借一个一个回调函数, 应用在内部值上, 然后返回结果
     * @example ap(const)
     * @param cb
     */
    chain(cb: Function) {
        return cb(this._value)
    }

    default(cb?: Function) {
        return this
    }

    cata(o) {
        return isProperCata(o)
            ? o.Just(this._value)
            : improperCata()
    }

    inspect() {
        return `Just(${this._value})`
    }

    isNothing() {
        return false
    }

    isJust() {
        return true
    }
}

class Nothing {
    static of(value) {
        return new Nothing()
    }

    ap(cb) {
        return this
    }

    map(cb) {
        return this
    }

    chain(cb) {
        return this
    }

    default(cb) {
        return Maybe(cb())
    }

    cata(obj) {
        return isProperCata(obj)
            ? obj.Nothing()
            : improperCata()
    }

    inspect() {
        return "Nothing"
    }

    isNothing() {
        return true
    }

    isJust() {
        return false
    }

}

const Maybe = (v) => v ? Just.of(v) : Nothing.of(v)

export {
    Just,
    Nothing,
    Maybe
}