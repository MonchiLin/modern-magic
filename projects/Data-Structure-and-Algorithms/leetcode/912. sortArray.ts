// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/sort-an-array/
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

// TODO 未完成


describe("solution", () => {
  it('1', () => {
    const solution = (nums: number[]): number[] => {
      const sort = (arr) => {
        if (arr.length > 1) {
          let left = []
          let right = []
          const pivot = arr[arr.length - 1]
          for (let i = 0; i < arr.length - 1; i++) {
            const el = arr[i]
            if (el > pivot) {
              right.push(el)
            } else {
              left.push(el)
            }
          }
          if (left.length > 1) {
            left = sort(left)
          }
          if (right.length > 1) {
            right = sort(right)
          }
          left.push(pivot)
          return left.concat(right)
        } else {
          return arr
        }
      }

      return sort(nums)
    }

    expect(solution([5, 2, 3, 1])).toStrictEqual([1, 2, 3, 5])
  });
})
