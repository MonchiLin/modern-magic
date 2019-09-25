import Node from './Node'
import {Compare, defaultCompare, isNull} from '../../util'

class BinarySearchTree {
    root = null;
    compareFn = null;

    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn
    }

    /**
     * 向树中插一个新的键
     * @param key
     */
    insert(key) {
        if (!this.root) {
            this.root = new Node(key)
        } else {
            this.insertNode(this.root, key)
        }
    }

    insertNode(node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (isNull(node.left)) {
                node.left = new Node(key)
            } else {
                this.insertNode(node.left, key)
            }
        } else {
            if (isNull(node.right)) {
                node.right = new Node(key)
            } else {
                this.insertNode(node.right, key)
            }
        }
    }

    /**
     * 在树中查找一个键, 找到返回 true, 没找到返回 false
     * @param key
     */
    search(key) {
        return this.searchNode(this.root, key)
    }

    searchNode(node, key) {
        if (isNull(node)) {
            return false
        }

        const compareResult = this.compareFn(node.key, key);

        // 如果当前节点的值小于传入的值
        if (compareResult === Compare.LESS_THAN) {
            return this.searchNode(node.right, key)
        } else if (compareResult === Compare.BIGGER_THAN) {
            return this.searchNode(node.left, key)
        } else {
            return true
        }

    }

    // 中序遍历所有节点
    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback)
    }


    inOrderTraverseNode(node: any, callback: any) {
        if (!isNull(node)) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right, callback)
        }
    }

    // 前序遍历所有节点
    preOrderTraverse(callback) {
        this.preOrderTraverseNode(this.root, callback)
    }

    // 前序遍历所有节点
    preOrderTraverseNode(node: any, callback) {
        if (!isNull(node)) {
            callback(node.key);
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback)
        }
    }

    // 后序遍历所有节点
    postOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback)
    }

    // 后序遍历所有节点
    postOrderTraverseNode(node, callback) {
        if (!isNull(node)) {
            this.inOrderTraverseNode(node.left, callback);
            this.inOrderTraverseNode(node.right, callback);
            callback(node.key)
        }
    }

    // 返回树中最小值
    min() {
        return this.minNode(this.root)
    }

    minNode(node) {
        let current = node;

        while (!isNull(current.left)) {
            current = current.left
        }

        return current
    }

    // 返回树中最大值
    max() {
        return this.maxNode(this.root)
    }

    maxNode(node) {
        let current = node;

        while (!isNull(current.right)) {
            current = current.right
        }

        return current
    }

    // 删除某个键
    remove(key) {
        return this.removeNode(this.root, key)
    }

    /**
     * 删除 key
     * 一开始删除会有三种情况
     * 1.
     *
     *
     *
     *
     * @param node
     * @param key
     */
    removeNode(node, key) {
        if (isNull(node)) {
            return null
        }

        const compareResult = this.compareFn(key, node.key);

        if (compareResult === Compare.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key);
            return node
        } else if (compareResult === Compare.LESS_THAN) {
            node.left = this.removeNode(node.left, key);
            return node
        } else {
            if (isNull(node.left)) {
                node = node.right;
                return node
            } else if (isNull(node.right)) {
                node = node.left;
                return node
            }

            if (isNull(node.left) && isNull(node.right)) {
                node = null;
                return node
            }

            const aux = this.minNode(node.right);
            node.key = aux.key;
            node.right = this.removeNode(node.right, aux.key);
            return node
        }


    }

}

export default BinarySearchTree

