import {compose, concat, curry, eqProps, filter, head, last, map, prop, split, toString} from 'ramda'
import {Either} from 'monet'
import Moment from 'moment'

class Maybe {
    private __value: any;

    static of(v: any) {
        return new Maybe(v)
    }

    constructor(v: any) {
        this.__value = v
    }

    isNoting() {
        return !!this.__value
    }

    map(f: any) {
        return Maybe.of(f(this.__value))
    }

}

const safeHead = (xs: any[]) => Maybe.of(xs[0])

const fmap = curry((f, functor) => {
    return functor.map(f)
})

const trace = curry((tag, v) => {
    console.log(tag, v)
    return v
})

type Address = {
    addresses: any[]
}

const streetName = compose(fmap(prop('street')), safeHead, prop('addresses'));

// console.log(streetName({addresses: []}))
console.log(streetName({addresses: [{street: "Shady Ln.", number: 4201}]}));

const getAge = curry((now, user) => {
    const birthDate = Moment(user.birthdate, "YYYY-MM-DD")
    return !birthDate.isValid()
        ? Either.Left("Birth date cloud not be parsed")
        : Either.Right(now.diff(birthDate, "year"))
})

const right1 = getAge(Moment(), {birthdate: "2015-12-12"}).right()

const lefi1 = getAge(Moment(), {birthdate: "balloons!"}).left()

const getEitherValue = (v) => v.isRight() ? v.right() : v.left()

const add = curry((x1, x2) => x1 + x2)

const fortunr = compose(
    concat("If you survive, you will be "),
    add(1),
    toString,
)

const zolatar = compose(
    console.log,
    getEitherValue,
    fmap(fortunr),
    getAge(Moment())
)

zolatar({birthdate: '2005-12-12'})

zolatar({birthdate: 'balllons!'})

class IO {
    private __value: any;

    constructor(f) {
        this.__value = f
    }

    static of(x) {
        return new IO(() => x)
    }

    map(f) {
        return new IO(compose(f, this.__value))
    }

}

const ioWindow = IO.of(window)

const width = ioWindow.map(win => win.innerWidth)

const sets = ioWindow.map(
    compose(
        split("/"),
        prop("href"),
        prop("location")
    )
)

const $ = selector => IO.of(document.querySelectorAll(selector))

// const div = $("div").map(head).map(div => div.innerHTML)

const url = IO.of(window.location.href)

const toPairs = compose(
    map(
        split("="),
        split("&")
    )
)

const param = compose(
    toPairs,
    last,
    split('?')
)

const findParam = (key) => fmap(compose(
    Maybe.of,
    filter(
        compose(
            eqProps(key),
            head
        )
    ),
    param,
), url)

// 5 * 2 + 5 * 3 === 5 * (2 + 3)

class Container {
    constructor(x: any) {
        this.__value = x
    }

    __value: any;


    static of(x) {
        new Container(x)
    }
}

const id = x => x

// const idLaw1 = map(id)
// const idLaw2 = id
// console.log(idLaw1(Container.of(2)))
// console.log(idLaw2(Container.of(2)))










