// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/valid-parentheses/
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

class ListNode {
  val: any;
  next: null;

  constructor(val?) {
    this.val = val;
    this.next = null;
  }

  append(node) {
    this.next = node
    return this
  }

  toArray() {
    const array = [this.val]
    let node = this.next

    while (node) {
      // @ts-ignore
      array.push(node.val)
      // @ts-ignore
      node = node.next
    }

    return array
  }
}

const l12 = new ListNode(2)
const l13 = new ListNode(4)
const l1 = new ListNode(1)
l12.append(l13)
l1.append(l12)

const l21 = new ListNode(3)
const l22 = new ListNode(4)
const l2 = new ListNode(1)
l22.append(l21)
l2.append(l22)


describe("solution", () => {
  it('1', () => {
    const solution = (l1, l2): ListNode => {
      if (!l1) {
        return l2
      } else if (!l2) {
        return l1
      } else if (l1.val < l2.val) {
        l1.next = solution(l1.next, l2)
        return l1
      } else {
        l2.next = solution(l1, l2.next)
        return l2
      }
    }

    const x1 = solution(l1, l2)
  });

  it('2', () => {
    const solution = (l1, l2): ListNode => {
      const prehead = new ListNode()

      let head = prehead

      while (l1 && l2) {
        if (l1.val >= l2.val) {
          head.next = l2
          l2 = l2.next
        } else {
          head.next = l1
          l1 = l1.next
        }
        head = head.next
      }

      return prehead.next
    }

    const x1 = solution(l1, l2)
  });

})
