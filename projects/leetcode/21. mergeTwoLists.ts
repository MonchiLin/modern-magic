// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/valid-parentheses/
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

class ListNode {
  private val: any;
  private next: null;

  constructor(val) {
    this.val = val;
    this.next = null;
  }

  append(node) {
    this.next = node
    return this
  }
}

const l12 = new ListNode(2)
const l13 = new ListNode(4)
const l1 = new ListNode(1)
l12.append(l13)
l1.append(l12)

const l21 = new ListNode(1)
const l22 = new ListNode(3)
const l2 = new ListNode(4)
l22.append(l21)
l2.append(l22)


describe("solution", () => {
  it('1', () => {
    const solution = (l1, l2): boolean => {
      if (l1 == null) {
        return l2
      } else if (l2 == null) {
        return l1
      } else if (l1.val > l2.val) {
        return l1
      }
    }

    expect(solution(l1, l2)).toStrictEqual(true)
  });

})
