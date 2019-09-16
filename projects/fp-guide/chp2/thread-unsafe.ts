import * as Mori from 'mori'

function charge(order, callback) {
    // Object.freeze(order)
    // console.log(callback)
    setTimeout(() => callback(order), 100)
}

function drinkMilkThenChange(order) {
    setTimeout(() => Mori.conj(order, {name: "R2D2", price: 99999}), 99)
}

function printReceipt(order) {
    console.log(order.toString())
}

// 下单
let order = Mori.vector({name: "kindle", price: 99}, {name: 'drone', price: 299})
// 购买
charge(order, printReceipt)

// 购买的同时喝杯牛奶
drinkMilkThenChange(order)
