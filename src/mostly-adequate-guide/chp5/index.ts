import {curry} from 'ramda'

/**
 * 组合 (compose) 可以把多个函数组合起来
 * 产生一个新函数
 */
function compose<P1, P2, P3>(f: (x: P2) => P1, g: (x: P3) => P2) {
    return function (x: P3): P1 {
        return f(g(x))
    }
}

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


function head<T>(x: T[]): T {
    return x[0]
}

function reverse<T>(x: T[]): T[] {
    return x.reduceRight((acc: T[], curr: T) => [...acc, curr], [])
}

function last<T>(x: T[]): T {
    return x[x.length - 1]
}

const fruits = ["apple", "orange", "starwberry"]

// @ts-ignore
const pickLast = compose(last, reverse)
const pickLastFruit = pickLast(fruits)

// compose 函数满足结合律(associativity)
// @ts-ignore
const associativityExample1 = compose(toUpperCase, compose(head, reverse))(fruits)

// compose 函数满足结合律(associativity)
// @ts-ignore
const associativityExample2 = compose(compose(toUpperCase, head), reverse)(fruits)

console.log("pickLastFruit =>", pickLastFruit)
console.log("associativityExample1 =>", associativityExample1)
console.log("associativityExample2 =>", associativityExample2)








