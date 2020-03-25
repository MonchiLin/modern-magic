import { range } from "ramda";

class BST {
  root: Node

  constructor() {

  }

  insert(key) {
    if (this.root == null) {
      this.root = new Node(key)
      return
    }

    this.insertKey(key, this.root, this.root)
  }

  private insertKey(key: number, node: Node, parent: Node) {
    this.root
    const newNode = new Node(key)
    newNode.parent = parent

    if (key > node.value) {
      if (node.right == null) {
        node.right = newNode
      } else {
        this.insertKey(key, node.right, node)
      }
    } else if (key < node.value) {
      if (node.left == null) {
        node.left = newNode
      } else {
        this.insertKey(key, node.left, node)
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

  remove(key) {
    let node = this.lookup(key)
    if (!node) {
      return
    }
    const parent = node.parent
    const left = node.left
    parent.left = left
    left.parent = parent
  }


  lookup(key) {
    return this.lookupNode(key, this.root)
  }

  lookupNode(key, node) {
    while (node && node.value != null) {
      if (node.value === key) {
        return node
      }
      const left = this.lookupNode(key, node.left)
      if (left != null) {
        return left
      } else {
        return this.lookupNode(key, node.right)
      }
    }
  }

  succ(key) {
    let node = this.lookup(key)
    if (!node) {
      return
    }

    if (node.right) {
      return this.minByNode(node.right)
    }

    node = node.parent

    while (node) {
      if (node.value > key) {
        return node
      } else {
        node = node.parent
      }
    }

  }

  get min() {
    return this.minByNode(this.root)
  }

  minByNode(node) {
    while (node.left) {
      node = node.left
    }
    return node
  }

  maxByNode(node) {
    while (node.right) {
      node = node.right
    }
    return node
  }

  get max() {
    return this.maxByNode(this.root)
  }

}

class Node {
  left: Node
  right: Node
  parent: Node
  value: number

  constructor(value?) {
    this.value = value
  }
}

describe("BST", () => {
  it('1', () => {
    const bst = new BST()
    bst.insert(6)
    bst.insert(1)
    bst.insert(7)
    bst.insert(5)


    bst.insert(3)
    bst.insert(2)
    bst.insert(4)
    bst.insert(9)
    bst.insert(8)
    bst.insert(10)

    const x = bst.lookup(5)
    const succ = bst.succ(5)
  });


})



