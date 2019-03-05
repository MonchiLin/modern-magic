import Mori from "mori"

const v = Mori.vector(1, 2, 3, 4)
console.log(v)
const v1 = Mori.conj(v, 1)
console.log(v1)

console.log(Mori.first(v))
console.log(Mori.rest(v))

const m0 = Mori.hashMap("领", 0, "1️⃣", 1)
console.log(m0)

console.log(Mori.assoc(m0, Mori.vector(1, 2), 2))

console.log(Mori.range(10,Mori.range()))

