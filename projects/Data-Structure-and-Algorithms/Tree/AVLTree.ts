import BinarySearchTree from "./BinarySearchTree";
import {defaultCompare, isNull} from "../util";

class AVLTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn)
    }

    insert(key) {

    }

    insertNode(node, key) {

    }

    removeNode(node, key): null | any {

    }

    getNodeHeight(node) {
        if (isNull(node)) {
            return -1
        }

        return Math.max(
            this.getNodeHeight(node.left), this.getNodeHeight(node.right)
        ) + 1
    }

}

export default AVLTree

