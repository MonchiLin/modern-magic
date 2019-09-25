"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BinarySearchTree_1 = __importDefault(require("./BinarySearchTree"));
const util_1 = require("../../util");
class AVLTree extends BinarySearchTree_1.default {
    constructor(compareFn = util_1.defaultCompare) {
        super(compareFn);
    }
    insert(key) {
    }
    insertNode(node, key) {
    }
    removeNode(node, key) {
    }
    // 这里的 node 是中间节点
    rotationLL(node) {
        const temp = node.left;
        node.left = temp.right;
        node.right = node;
        return temp;
    }
    rotationRR(node) {
        const tmp = node.right; // {1}
        node.right = tmp.left; // {2}
        tmp.left = node; // {3}
        return tmp;
    }
    rotationLR(node) {
        node.left = this.rotationRR(node.left);
        return this.rotationLL(node);
    }
    rotationRL(node) {
        node.right = this.rotationLL(node.right);
        return this.rotationRR(node);
    }
    /**
     * 计算过程
     *             3
     *         ↙        ↘
     *        2           6
     *                ↙        ↘
     *               5          7
     *             ↙
     *           4
     * 假设获取 5 的高度
     * return Math.max(5.left, 5.right)
     *      进入 5.left (4)
     *          return Math.max(4.left.left, 4.left.right)
     *          进入 4.left.left (4)
     *              return -1
     *          进入 4.left.right (null)
     *              return -1
     *          return Math.max(-1,-1) + 1 = 0
     *      进入 5.right (null)
     *          return -1
     *      return Mat.max(0, -1) + 1
     *      return 1
     *
     * 假设获取 3 的高度
     * return max(3.left, 3.right) + 1
     *      进入 3.left - (2)
     *      return max(2.left,2.right) + 1
     *          进入 2.left(null)
     *              return -1
     *          进入 2.right
     *              return -1
     *      3.left return max(-1,-1) + 1 = 0
     *
     *      进入 3.right (6)
     *      return max(6.left,6.right) + 1
     *          进入 6.left - (5)
     *          return max(5.left,5.right) + 1
     *              进入 5.left - (4)
     *              return max(4.left, 4.right) + 1
     *                  进入 4.left
     *                      return -1
     *                  进入 4.right
     *                      return -1
     *              进入 5.right
     *                  return -1
     *          6.left return max(0,-1) + 1 = 1
     *
     *          进入 6.right - (7)
     *          return max(7.left,7.right) + 1
     *              进入 7.left
     *                  return -1
     *              进入 7.right
     *                  return -1
     *          6.right return max(-1,-1) + 1 = 0
     *       3.right return  max(1,0) + 1 = 2
     * 3 return (0,2) + 1 = 3
     *
     *
     * @param node
     */
    getNodeHeight(node) {
        if (util_1.isNull(node)) {
            return -1;
        }
        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
    }
    getBalanceFactor(node) {
        const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
        switch (heightDifference) {
            case -2:
                // 右边不平衡
                return util_1.BalanceFactor.UNBALANCED_RIGHT;
            case -1:
                // 右边稍微有一点不平衡
                return util_1.BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
            case 1:
                // 左边稍微有一点不平衡
                return util_1.BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
            case 2:
                // 左边不平衡
                return util_1.BalanceFactor.UNBALANCED_LEFT;
            default:
                return util_1.BalanceFactor.BALANCED;
        }
    }
}
exports.default = AVLTree;
//# sourceMappingURL=AVLTree.js.map