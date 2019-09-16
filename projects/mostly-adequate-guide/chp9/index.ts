import {concat, compose, curry} from 'ramda'
import {IO, Identity, Maybe} from 'monet'

const tetris = IO(() => "tetris").map(concat(" master"))

const track = curry((tag, x) => {
    console.log(tag, x)
    return x
})

const fmap = curry((f, functor) => functor.map(f))

const safeProp = curry((x, obj) => Maybe.of(obj[x]))

const safeHead = curry((x) => safeProp(0, x))

const firstAddressStreet = x => compose(
    fmap(
        fmap(safeProp("street"))
    ),

    track("fmap('safeHead')"),
    fmap(safeHead),
    track("safeProp('addresses')"),
    safeProp("addresses")
)(x)

const first = firstAddressStreet(
    {addresses: [{street: {name: 'Mulburry', number: 8402}, postcode: "WC2N"}]}
)

const log = x => IO(() => {
    console.log("log =>", x)

    return x
})

const setStyle = curry((sel, props) => {
    return IO(() => {
        console.log("假装设置了样式")
        return new HTMLDivElement()
    })
})

const getItem = curry(key => IO(() => localStorage.getItem(key)))


















