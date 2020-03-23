// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
//
// 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
//
// 示例:
//
//   给定 nums = [2, 7, 11, 15], target = 9
//
// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]


describe("tow sum", () => {
  it('force', () => {
    const arr = [2, 5, 5, 11]
    const solution = (nums: number[], target: number) => {
      for (let i = 0; i < nums.length; i++) {
        const x = nums[i]

        for (let j = 0; j < nums.length; j++) {
          if (j === i) {
            continue
          }
          const y = nums[j]
          if (x + y === target) {
            return [i, j]
          }
        }

      }
    }

    expect(solution(arr, 10)).toStrictEqual([1, 2])
  });


  it('hash1', function () {
    const arr = [3, 2, 4]
    const solution = (nums: number[], target: number) => {
      const map = new Map()
      for (let i = 0; i < nums.length; i++) {
        map.set(nums[i], i)
      }

      for (let i = 0; i < nums.length; i++) {
        const difference = target - nums[i]
        const value = map.get(difference)
        if (value != null && value !== i) {
          return [i, value]
        }
      }
    }

    expect(solution(arr, 6)).toStrictEqual([1, 2])
  });
})
