// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


describe("solution", () => {
  it('1', () => {
    const solution = (nums: number[]): number => {
      if (nums.length == 0) return 0;
      let i = 0;
      for (let j = 1; j < nums.length; j++) {
        if (nums[j] != nums[i]) {
          i++;
          nums[i] = nums[j];
        }
      }
      return i + 1;
    }

    expect(solution([1, 5, 5, 6, 7])).toStrictEqual(4)
  });

})
