import R from 'ramda'

const g = R.pipe(
    R.map(i => ({key: i, value: i})),
)

const arr = g(R.range(0, 15001))

const map = new Map(arr.map(i => [i.key, i.value]))

const target = {key: 15000, value: 15000}

describe('arr vs map', function () {
    it('arr', function () {
        console.time("arr start")
        console.log("arr", arr.includes(target))
        console.timeEnd("arr end")
    });
    it('map', function () {
        console.time("map start")
        console.log("map", map.has(target))
        console.timeEnd("map end")
    });
});
