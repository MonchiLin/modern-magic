import _ from 'ramda'

const tap = (fn, special: string) => {
  console.log("执行了", special)
  return (...args) => fn(...args)
}

const sum = (p: number, v: number) => {
  console.log("执行了 《sum》", p, v)
  return p + v
}
const inc = (n: number) => {
  console.log("执行了 《inc》", n)
  return n + 1
}
const reduce = (fn, acc, list) => list.reduce(fn, acc)

describe('transducer', function () {

  it('初始：加一求和', function () {
    const r = reduce(sum, 0, _.map(inc, [1, 2, 3, 4]))
  });

  it('初始：优化一', function () {
    /**
     * 计算过程
     * @param fn
     * map(inc) =
     * (reduceFn) = > {
     *   return (result, input) => {
     *    return reduceFn(result, inc(input))
     *   }
     * }
     *
     * map(inc)(sum) =
     * (result, input) => {
     *   return sum(result, inc(input))
     * }
     *
     * // 第一次 reduce
     * sum(0, inc(1))
     * // 第二次 reduce
     * sum(2, inc(2))
     * // 第三次 reduce
     * sum(5, inc(3))
     * // 第四次 reduce
     * sum(9, inc(4))
     * // 14
     */
    function map(fn) {
      return (reduceFn) => {
        // result 是 reduce 的累加值，input 是本次输入的值
        return (result, input) => {
          return reduceFn(result, fn(input))
        }
      }
    }

    const r = reduce(map(inc)(sum), 0, [1, 2, 3, 4])

  });

  it("rmap", () => {
    function rmap(fn, coll) {

    }
  })

  it("二进制转换为十六进制", () => {
    const map = {
      '0000': 0,
      '0001': 1,
      '0010': 2,
      '0011': 3,
      '0100': 4,
      '0101': 5,
      '0110': 6,
      '0111': 7,
      '1000': 8,
      '1001': 9,
      '1010': "A",
      '1011': "B",
      '1100': "C",
      '1101': "D",
      '1110': "E",
      '1111': "F"
    }

    // 将二进制分离为 四位一组
    const spliter = (n: string) => {
      const groups = []
      let index = n.length
      while (n.length > 0) {
        let lastFourIndex = index - 4
        if (lastFourIndex < 0) {
          lastFourIndex = 0
        }
        let t = n.slice(lastFourIndex)
        n = n.slice(0, lastFourIndex)
        groups.push(t.padStart(4, "0"))
        index = lastFourIndex
      }
      return groups
    }

    // 将 spliter 函数分离结果转换为十六进制
    const toHex = (n: string[]) => {
      const hex = n.reverse().reduce((p, c) => p + map[c], "")
      return hex
    }

    const groups = spliter(`001001011110`)
    expect(toHex(groups)).toBe("25E")
  })

});
