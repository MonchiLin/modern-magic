// ref: https://dev.to/gcanti/getting-started-with-fp-ts-setoid-39f3

import { contramap, getStructEq } from "fp-ts/lib/Eq";
import { getEq } from "fp-ts/lib/Array";

interface Eq<A> {
  readonly equals: (x: A, y: A) => boolean
}

const eqNumber: Eq<number> = {
  equals: (x, y) => x === y
}

/**
 * 接受一个实现了 Eq 的对象 E
 * 返回一个 E 实现的 equals 允许接受的类型 E 和 Array<E> 的函数
 *
 */
function elem<A>(E: Eq<A>): (a: A, as: Array<A>) => boolean {
  return (a, as) => as.some(item => E.equals(item, a))
}

type Point = {
  x: number,
  y: number
}

const aEqPoint: Eq<Point> = {
  // 这里作者提到了一个小技巧 先判断 a === b
  // 这意味着如果
  // a = {x:1,y:1}
  // b = a
  // 就可能出现 a === b // true 的情况
  equals: (a, b) => (a === b) || a.x === b.x && a.y === b.y
}

const eqPoint: Eq<Point> = getStructEq({
  x: eqNumber,
  y: eqNumber
})

type Vector = {
  from: Point
  to: Point
}

const eqVector: Eq<Vector> = getStructEq({
  from: eqPoint,
  to: eqPoint
})

const eqArrayOfPoints: Eq<Array<Point>> = getEq(eqPoint)

type User = {
  userId: number
  name: string
}

const eqUser = contramap((user:User) => user.userId)(eqNumber)


export {
  Eq,
  eqNumber,
  elem
}

