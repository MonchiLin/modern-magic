// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/permutations/
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


describe("solution", () => {
  it('1', () => {
    const solution = (nums: number[]): number[][] => {
      return nums.map((n, index) => {
        return []
      })
    }

    expect(solution([1, 2, 3])).toStrictEqual([
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1]
    ])
  });

})
