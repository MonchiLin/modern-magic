import {curry, compose} from 'ramda'

/**
 * 组合 (compose) 可以把多个函数组合起来
 * 产生一个新函数
 */
// function compose<P1, P2, P3>(f: (x: P2) => P1, g: (x: P3) => P2) {
//     return function (x: P3): P1 {
//         return f(g(x))
//     }
// }

const toUpperCase = (x: string) => x.toUpperCase()

// exclaim 中文释义: 喊叫, 这个函数如同释义一样, 最后加一个 "!"
const exclaim = (x: string) => x + "!"

// shout 中文释义: 喊叫, 可作为名词
const shout = compose(exclaim, toUpperCase)

const shoutLadyG = shout("glr")

const checkCat = compose(
    (x) => x.length,
    (x: string) => x.match(/cat/g) ? "ok" : "Can't be without cat!!!!!!!!!"
)("GLR's cat")

console.log("shoutLadyG =>", shoutLadyG)
console.log("GLR's cat =>", checkCat)


function head(x: any[]) {
    return x[0]
}

function reverse(x: any[]): any[] {
    return x.reduceRight((acc, curr) => [...acc, curr], [])
}

function last<T>(x: T[]): T {
    return x[x.length - 1]
}

const fruits = ["apple", "orange", "starwberry"]

const pickLast = compose(last, reverse)
const pickLastFruit = pickLast(fruits)

// compose 函数满足结合律(associativity)
const associativityExample1 = compose(toUpperCase, compose(head, reverse))(fruits)

// compose 函数满足结合律(associativity)
// @ts-ignore
const associativityExample2 = compose(compose(toUpperCase, head), reverse)(fruits)

console.log("pickLastFruit =>", pickLastFruit)
console.log("associativityExample1 =>", associativityExample1)
console.log("associativityExample2 =>", associativityExample2)


// point free

const replace = curry((what, replacement, str) => {
    return str.replace(what, replacement)
})

const filter = curry((f, ary) => {
    return ary.filter(f)
})


const map = curry((f, ary) => {
    return ary.map(f);
});

const join = curry((target, source) => {
    return source.join(target)
})

const split = curry((symbol, source: string) => source.split(symbol))

const snakeCase = compose(replace(/\s+/ig, "_"), toUpperCase)

const initials = compose(join('. '), map(compose(toUpperCase, head)), split(' '));

console.log("snakeCase =>", snakeCase("测 试 输 入"))

// @ts-ignore
console.log("initials =>", initials("aAaA bBbB cCcC dDdD"))


// debug

const trace = curry((tag, x) => {
    console.log(tag, x)
    return
})

var dasherize = compose(
    join('-'),
    toUpperCase,
    split(' '),
    replace(/\s{2,}/ig, ' ')
);

dasherize('The world is a vampire');








