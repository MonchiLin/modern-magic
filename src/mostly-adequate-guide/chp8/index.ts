import {prop, compose, curry, concat, map, toString} from 'ramda'
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