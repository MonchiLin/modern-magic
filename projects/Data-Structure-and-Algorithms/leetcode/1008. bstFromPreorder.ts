// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/construct-binary-search-tree-from-preorder-traversal/
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


describe("solution", () => {
  it('1', () => {
    const solution = (preorder: number[]) => {
      class TreeNode {
        val;
        left = null;
        right = null;

        constructor(val) {
          this.val = val;
        }
      }

      class BST {
        root = null

        constructor() {
        }

        static fromArray(array) {
          const tree = new this()
          for (let i = 0; i < array.length; i++) {
            const curr = array[i]
            tree.insert(curr)
          }
          return tree
        }

        insert(ele) {
          if (!this.root) {
            this.root = new TreeNode(ele)
          } else {
            this.insertNode(ele, this.root)
          }
        }

        insertNode(ele, node) {
          if (ele > node.val) {
            if (node.right) {
              this.insertNode(ele, node.right)
            } else {
              node.right = new TreeNode(ele)
            }
          } else {
            if (node.left) {
              this.insertNode(ele, node.left)
            } else {
              node.left = new TreeNode(ele)
            }
          }
        }

        preorder(fn) {
          this.preorderNode(fn, this.root)
        }

        preorderNode(fn, node) {
          if (node) {
            fn(node)
            this.preorderNode(fn, node.left)
            this.preorderNode(fn, node.right)
          }
        }

        toArray() {
          const arr = []
          this.preorder(node => arr.push(node.val))
          return arr
        }

      }

      const tree = BST.fromArray(preorder)
      const preorderTree = new BST()
      tree.preorder(node => preorderTree.insert(node.val))

      return preorderTree.root
    }

    expect(solution([8, 5, 1, 7, 10, 12])).toStrictEqual([8, 5, 10, 1, 7, null, 12])
  });

})
