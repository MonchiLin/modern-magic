// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/rotate-matrix-lcci/
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

// TODO 缺少原地算法
describe("solution", () => {
  it('1', () => {
    const solution = (matrix: number[][]): number[][] => {
      // 对于矩阵中第 ii 行的第 jj 个元素，在旋转后，它出现在倒数第 ii 列的第 jj 个位置。
      const arr = matrix.map(i => new Array(i.length))
      const len = matrix.length

      for (let rowIndex = 0; rowIndex < len; rowIndex++) {
        for (let colIndex = 0; colIndex < len; colIndex++) {
          arr[colIndex][len - 1 - rowIndex] = matrix[rowIndex][colIndex]
        }
      }

      return arr
    }

    expect(solution([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ])).toStrictEqual([
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3]
    ])
  });

})
