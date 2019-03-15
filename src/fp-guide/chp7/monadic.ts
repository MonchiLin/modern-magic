const log = console.log.bind(console)

class Functor {
    value

    static of(v) {
        return new Functor(v)
    }

    constructor(value) {
        this.value = value
    }

    map(f) {
        return Functor.of(f(this.value))
    }

    flat() {
        this.value
    }

    flatMap(f) {
        return this.map(f).flat()
    }
}

class Applicative extends Functor {
    ap(container) {
        return container.map(this.value)
    }

    flat() {
        this.value
    }

    flatMap(f) {
        return this.map(f).flat()
    }
}

class Just {
    value

    static of(v) {
        return new Just(v)
    }

    constructor(value) {
        this.value = value
    }

    ap(container) {
        return container.map(this.value)
    }

    map(f) {
        return Just.of(f(this.value))
    }

    flat() {
        return this.value
    }

    flatMap(f) {
        return this.map(f).flat()
    }
}

const fa = Just.of("a")

log(fa)
log(fa.map(x => x + "b"))

const a1 = [1, 2, 3, 4]
log(a1.map(x => x))
log(a1)
const f = x => x + 2
const g = x => x * 2

log(a1.map(v => f(g(v))))
log(a1.map(g).map(f))

const fplus2 = Just.of(x => x + 2)
log(fplus2.ap(Just.of(2)))

log(Just.of(x => x).ap(Just.of(3)))

const x = Just.of(f).ap(Just.of(2))
const x1 = Just.of(f(2))
log("x=>", x, "x1 =>", x1)

const c = Just.of(x => x).ap(Just.of(3))
const c1 = Just.of(x => x(3)).ap(Just.of(x => x))
console.log("c=>", c, "c1=>", c1)

class Sum extends Applicative {
    static of(v) {
        return new Sum(v)
    }

    static empty() {
        return Sum.of(0)
    }

    append(aSum) {
        return aSum.map(v => this.value + v)
    }
}

log(Sum.of(1).append(Sum.of(2)))

class Noting {
    map() {
        return this
    }

    flatMap() {
        return this.map()
    }
}

const noting = new Noting

const a = Just.of({value: 0})
    .flatMap(x => {
        if (!x) return noting
        return Just.of(x.value)
    })
    .map(x => x + 1)
    .map(x => x / 2)

console.log(a)





