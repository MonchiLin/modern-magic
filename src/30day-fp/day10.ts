import {curry} from 'ramda'

class Just {
    constructor(private _value) {

    }

    map(f) {
        return new Just(f(this._value))
    }

    maybe(n, f) {
        return f(this._value)
    }

    toString() {
        return `Just ${this._value}`
    }

}

class Noting {
    constructor() {

    }

    map(f) {
        return this
    }

    maybe(n, f) {
        return n
    }

    toString() {
        return `Noting`
    }

}

const Maybe = {
    Noting: _ => new Noting(),
    Just: x => new Just(x),
    of: x => new Just(x),
    fromNullable: a => {
        if (a) {
            return new Just(a)
        } else {
            return new Noting()
        }
    }
}

const safeFind = curry((f, a) => {
        return Maybe.fromNullable(a.find(f))
    }
)

const mambo5 = ["Monica", "Erica", "Rita", "Tina", "Sandra"]

const toUpperCase = s => s.toUpperCase()

const aLittleBitOf = target => safeFind(x => x === target, mambo5)
    .map(toUpperCase)
    .maybe(
        "Not fount a Mambo",
        (x) => `a little bit ${x} in my life!`
    )

console.log(aLittleBitOf("Erica"))
console.log(aLittleBitOf("小红"))


class Left {
    constructor(private _value) {

    }

    map(f) {
        return new Left(f(this._value))
    }

    bimap(f, _) {
        return new Left(f(this._value))
    }

    either(f, _) {
        return f(this._value)
    }

    toString() {
        return `Left ${this._value}`
    }
}

class Right {
    constructor(private _value) {

    }

    map(f) {
        return new Right(f(this._value))
    }

    bimap(_, f) {
        return new Right(f(this._value))
    }

    either(_, f) {
        return f(this._value)
    }

    toString() {
        return `Right ${this._value}`
    }
}

const Either = {
    Left: a => new Left(a),
    Right: a => new Right(a),
    of: a => new Right(a)
}


const tryCatch = f => (...args) => {
    try {
        return Either.Right(f.apply(null, args))
    } catch (e) {
        return Either.Left(e)
    }
}

const toDecimal = string => {
    const result = parseInt(string, 10)
    if (Number.isNaN(result)) {
        throw new Error("Parse Error")
    } else {
        return result
    }
}

const safeToDecimal = tryCatch(toDecimal)


console.log(
    safeToDecimal("910")
        .map(x => x + 1)
        .toString()
)

console.log(
    safeToDecimal("汉字")
        .map(x => x + 1)
        .toString()
)


