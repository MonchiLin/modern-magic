import {IO, Identity} from 'monet'
import {compose, map, curry, head} from 'ramda'

const fs = require("fs")

const readFile = (fileName) => IO<string>(() => fileName)

const fmap = curry((f, functor) => {
    return functor.map(f)
})

const print = x => IO<string>(() => {
    console.log("tak", x)
    return x
})

const cat = compose(
    fmap(print),
    readFile
)

const catFirstChar = compose(fmap(fmap(head)), cat)