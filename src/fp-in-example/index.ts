import * as _ from 'lodash'
import {curry} from 'ramda'
import {Either, Left, Right} from "monet";

/**
 * 计算商品的税金和折扣, 最后显示总价
 *
 * 价格不是数据, 那么函数 tax 会抛出错误
 * 价格不是数据, 那么函数 discount 会抛出错误
 * 商品价格小于 10, 它也会抛出错误
 *
 */

enum errorMessage {
    "价格必须是数值" = "价格必须是数值",
    "不足10美元" = "不足10美元",

}

const tax = curry((tax, price) => {
    if (!_.isNumber(price)) {
        return Either.Left(new Error(errorMessage.价格必须是数值))
    }

    return Either.of(price + (tax * price))
})

const discount = curry((dis, price) => {
    if (!_.isNumber(price)) {
        return Either.Left(new Error(errorMessage.价格必须是数值))
    }

    if (price < 10) {
        return Either.Left(new Error(errorMessage.不足10美元))
    }

    return Either.of(price - (price * 10))
})

const getItemPrice = (item) => Either.of(item.price)

const displayTotal = (total) => {
    console.log(`Total Price: ${total}`)
}

const logErr: (e) => never = (err) => {
    console.log(`Error : ${err.message}`)
    throw new Error("?")
}


const showTotalPrice = (item) =>
    Either.of(getItemPrice(item)).cata(
        err => "On! Mother Fuck",
        displayTotal
    )










