import {range} from "ramda";

const arr = [18, 4, 8, 9, 16, 1, 14, 7, 19, 3, 0, 5, 2, 11, 6]

function includes(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    if (value === arr[i]) {
      return true
    }
  }
  return false
}

describe("minFree", () => {
  it('1', () => {
    /**
     * 暴力算法，线性查找
     *
     */
    const solution = (input: number[]) => {
      let value = 0
      for (let curr of input) {
        if (includes(input, value)) {
          value += 1
        } else {
          return value
        }
      }
    }

    expect(solution(arr)).toBe(10)
  });


  it('2', () => {
    /**
     * 在 [18, 4, 8, 9, 16, 1, 14, 7, 19, 3, 0, 5, 2, 11, 6]
     * 这个正整数集合中，若
     *
     *
     */

    const solution = (input: number[]) => {
      const n = input.length + 1
      const flags = range(0, n).map(_ => false)

      for (let i = 0; i < input.length; i++) {
        const curr = input[i]
        if (curr < n) {
          flags[curr] = true
        }
      }

      for (let i = 0; i < flags.length; i++) {
        if (!flags[i]) {
          return i
        }
      }

    }

    expect(solution(arr)).toBe(10)
  });


})



