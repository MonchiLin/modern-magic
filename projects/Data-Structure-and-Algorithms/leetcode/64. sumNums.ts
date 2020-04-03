// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/qiu-12n-lcof/
//   著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

describe("solution", () => {
  it('1', () => {
    const solution = (n): number => {
      const fn = (n) => {
        // 如果 n ！== 0 则 n + n - 1 .... 直到 n === 0 的时候结束调用函数
        return n && n + fn(n - 1)
      }

      return fn(n)
    }

    expect(solution(3)).toStrictEqual(6)
  });

})
