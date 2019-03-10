import Mori from "mori"

const v = Mori.vector(1, 2, 3, 4);
console.log(v);
const v1 = Mori.conj(v, 1);
console.log(v1);

console.log(Mori.first(v));
console.log(Mori.rest(v));

const m0 = Mori.hashMap("领", 0, "1️⃣", 1);
console.log(m0);

console.log("mo assoc", Mori.assoc(m0, Mori.vector(1, 2), 2));

console.log(Mori.range(10, Mori.range()));

const r2 = {a: 1, b: 2, c: 3}
const r3 = Mori.toClj(r2)

const r1 = Mori.reduce((acc, c) => {
        return Mori.assoc(acc, c.key, c.val + 1)
    },
    Mori.hashMap(), r3)

console.log("r1->", r1)
console.log("r2->", r2)
console.log("r3->", r3)


















