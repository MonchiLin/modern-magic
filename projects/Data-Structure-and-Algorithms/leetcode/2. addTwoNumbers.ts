// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/add-two-numbers/
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

// TODO 未完成

describe("solution", () => {
  it('1', () => {
    class ListNode {
      val;
      next = null;

      constructor(val) {
        this.val = val
      }
    }

    const solution = (l1: ListNode, l2: ListNode): ListNode => {

      const reverseString = (s) => {
        let newStr = ""

        for (let i = s.length - 1; i >= 0; i--) {
          newStr += s[i]
        }

        return newStr
      }

      let x1 = ""
      let x2 = ""

      while (l1 || l2) {
        if (l1 && l1.val === 0) {
          x1 = ""
        }

        if (l2 && l2.val === 0) {
          x2 = ""
        }

        x1 += l1 ? l1.val : ""
        x2 += l2 ? l2.val : ""

        l1 = l1 && l1.next
        l2 = l2 && l2.next
      }


      const str = ~~reverseString(x1) + ~~reverseString(x2) + ""
      let list = new ListNode(str[str.length - 1])
      let node

      for (let i = str.length - 2; i >= 0; i--) {
        const newNode = new ListNode(str[i])
        if (node) {
          node.next = newNode
        } else {
          node = newNode
          list.next = node
        }
      }

      return list
    }

    const l12 = new ListNode(2)
    const l14 = new ListNode(4)
    const l13 = new ListNode(3)
    l12.next = l14
    l14.next = l13

    const l25 = new ListNode(5)
    const l26 = new ListNode(6)
    const l24 = new ListNode(4)
    l25.next = l26
    l26.next = l24

    expect(solution(l12, l25)).toStrictEqual(4)
  });

})
