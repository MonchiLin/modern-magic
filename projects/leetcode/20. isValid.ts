// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/valid-parentheses/
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


describe("solution", () => {
  it('1', () => {
    const solution = (s: string): boolean => {
      let index = 0

      const stack = []

      while (index < s.length) {
        const curr = s[index]
        const prev = stack[stack.length - 1]
        if (prev != null) {
          const curr = s[index]
          switch (curr) {
            case "(":
            case "{":
            case "[":
              stack.push(curr)
              break
            case ")":
              if (prev !== "(") {
                return false
              } else {
                stack.pop()
              }
              break
            case "}":
              if (prev !== "{") {
                return false
              } else {
                stack.pop()
              }
              break
            case "]":
              if (prev !== "[") {
                return false
              } else {
                stack.pop()
              }
              break
            default:
              return false
          }
        } else {
          stack.push(curr)
        }

        index += 1
      }

      return stack.length === 0
    }

    expect(solution("{[]}")).toStrictEqual(true)
  });

})
