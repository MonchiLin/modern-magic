// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/roman-to-integer/
//   著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

describe("reverse", () => {
  it('force', () => {
    const solution = (s: string): number => {
      const map = new Map([
        ["I", 1],
        ["V", 5],
        ["X", 10],
        ["L", 50],
        ["C", 100],
        ["D", 500],
        ["M", 1000]
      ])

      let index = 0
      while (index < s.length) {

        index += 1
      }

      return 1
    }
    expect(solution("III")).toStrictEqual(3)
  });

})
