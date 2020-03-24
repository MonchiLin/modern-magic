import {range} from "ramda";

class BST {
  root: Node

  constructor() {

  }

  insert(key) {
    if (this.root == null) {
      this.root = new Node(key)
      return
    }

    this.insertKey(key, this.root)
  }

  private insertKey(key: number, root: Node) {
    const node = new Node(key)

    if (key > root.value) {
      if (root.right == null) {
        root.right = node
      } else {
        this.insertKey(key, root.right)
      }
    } else if (key < root.value) {
      if (root.left == null) {
        root.left = node
      } else {
        this.insertKey(key, root.left)
      }
    }
  }

  // 4, 3, 1, 2, 8, 7, 16, 10, 9, 14；
  traver(fn) {
    fn(this.root.value)
    this.traverNode(fn, this.root)
  }

  traverNode(fn, node) {
    if (node.left) {
      fn(node.left.value)
      this.traverNode(fn, node.left)
    }

    if (node.right) {
      fn(node.right.value)
      this.traverNode(fn, node.right)
    }

  }

}

class Node {
  left: Node
  right: Node
  value: number

  constructor(value?) {
    this.value = value
  }
}

describe("BST", () => {
  it('1', () => {
    const bst = new BST()
    bst.insert(4)
    bst.insert(3)
    bst.insert(1)
    bst.insert(2)


    bst.insert(8)
    bst.insert(7)
    bst.insert(16)
    bst.insert(10)
    bst.insert(9)
    bst.insert(14)

    bst.traver(node => console.log(node))
  });


})



