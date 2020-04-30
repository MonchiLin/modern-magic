import { fromNullable, map, some, option, getOrElse } from 'fp-ts/lib/Option'
import { pipe } from "fp-ts/lib/pipeable";
import {} from "fp-ts";
import { gt, lt } from "ramda";
import E from "fp-ts/lib/Either";

const Task = require('data.task')

jest.useFakeTimers()

describe('chp8', () => {
  it('case 1', () => {
    const callback = jest.fn();

    const read = new Task((reject, resolve) => {
      setTimeout(() => {
        try {
          resolve("SSR")
        } catch (e) {
          reject(e)
        }
      }, 0)
    })

    read.fork(err => err, data => {
      callback()
    })

    jest.runAllTimers();
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);

  });

  // 练习 4
  // ==========
  // 使用 Maybe 重写 ex4，不要有 if 语句

  // var ex4 = function (n) {
  //   if (n) { return parseInt(n); }
  // };
  //
  // var ex4 = undefined
  it('case 4', () => {
    const ex4 = (value) => pipe(
      option.map(fromNullable(value), data => Number.parseInt(data)),
      getOrElse(() => 0)
    )

    expect(ex4(1)).toStrictEqual(1)
    expect(ex4(null)).toStrictEqual(0)
  });


  // 练习 7
  // ==========
  // 写一个验证函数，检查参数是否 length > 3。如果是就返回 Right(x)，否则就返回
  // Left("You need > 3")

  // var ex7 = function(x) {
  //   return undefined // <--- write me. (don't be pointfree)
  // }
  it('case 7', () => {
    const ex7 = (x) => {
      return gt(x.length, 3)
        ? E.right(x)
        : E.left("You need > 3")
    }

  });


  // 练习 8
  // ==========
  // 使用练习 7 的 ex7 和 Either 构造一个 functor，如果一个 user 合法就保存它，否则
  // 返回错误消息。别忘了 either 的两个参数必须返回同一类型的数据。

  // var save = function(x){
  //   return new IO(function(){
  //     console.log("SAVED USER!");
  //     return x + '-saved';
  //   });
  // }
  //
  // var ex8 = undefined
  it('case 8', () => {
    const ex8 = (value) => pipe(
      option.map(fromNullable(value), data => Number.parseInt(data)),
      getOrElse(() => 0)
    )

    expect(ex8(1)).toStrictEqual(1)
  });

});
