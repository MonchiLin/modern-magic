// associative operation 可组合的，是结合律

interface Semigroup<A> {
  concat: (x: A, y: A) => A
}

// 一个半群必须满足结合律
// concat(concat(x,y),z) === concat(x,concat(y,z))

// concat 这个名字对于数组有特殊的意思，但是在 A 这个类型的上下中，是具有不同意义的。


// 实现半群实例
const semigroupProduct: Semigroup<number> = {
  concat: (x, y) => x * y
}


// string 实现半群
const semigroupConcat: Semigroup<string> = {
  concat: (x, y) => x + y
}

// 如果给定一个类型 A，A 没有定义结合操作（associative operation）
// 你只需要使用下面的结构就可以创建每个类型的实例

// 返回第一个参数的半群实例
function getFirstSemigroup<A = never>(): Semigroup<A> {
  return {
    concat: (x, y) => x
  }
}

// 返回第二个参数的半群实例
function getLastSemigroup<A = never>(): Semigroup<A> {
  return {
    concat: (x, y) => y
  }
}

// 一种技巧是定义 Array<A> 的半群实例，调用 A 的 **自由半群**
function getArraySemigroup<A = never>(): Semigroup<Array<A>> {
  return {
    concat: (x, y) => x.concat(y)
  }
}

// 映射类型 A 的元素到一个只有一个元素的类型 Array<A>
function of<A>(a: A): Array<A> {
  return [a]
}

// (*) 严格来讲是一个 A 类型非空数组的半群实例







