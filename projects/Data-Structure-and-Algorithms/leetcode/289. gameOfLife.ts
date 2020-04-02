// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/game-of-life/
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


describe("solution", () => {
  it('1', () => {
    const solution = (number: number[][]) => {
      const isLive = (cell) => cell === 1
      const swap = (arr, i1, i2) => {
        const temp = arr[i1]
        arr[i1] = temp[i2]
        arr[i2] = temp
      }

      const getNeighbor = (arr) => {
        
      }

      const newNumber = number.map(cells => {
        return cells.map(v => v)
      })


    }

    expect(solution([
      [0, 1, 0],
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ])).toStrictEqual([
      [0, 0, 0],
      [1, 0, 1],
      [0, 1, 1],
      [0, 1, 0]
    ])
  });

})
