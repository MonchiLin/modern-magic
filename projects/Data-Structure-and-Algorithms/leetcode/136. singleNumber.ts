// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/single-number/
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


describe("solution", () => {
  it('1', () => {
    const solution = (nums: number[]): number => {
      const map = new Map()

      for (let i = 0; i < nums.length; i++) {
        const curr = nums[i]
        if (map.has(curr)) {
          map.delete(curr)
        } else {
          map.set(curr, i)
        }
      }

      return map.keys().next().value
    }

    expect(solution([2, 2, 1])).toStrictEqual(1)
    expect(solution([4, 1, 2, 1, 2])).toStrictEqual(4)
  });

})
