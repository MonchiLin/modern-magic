import BinarySearchTree from "./BinarySearchTree";
import { BalanceFactor, defaultCompare } from "../../util";
class AVLTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
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
        if (node == null) {
            return -1;
        }
        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
    }
    /**
     * 如何判断树是否平衡：
     * 1. 左子树和右子树一样高
     * 2. 左子树比右子树高两两个
     * 3. 右子树比左子树高两两个
     * 除了以上三种情况，我们都认为树不平衡
     *
     * @param node
     */
    getBalanceFactor(node) {
        // 得出两边子树的高度差
        const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
        switch (heightDifference) {
            case -2:
                // 如果左子树高度比右子树低两
                return BalanceFactor.UNBALANCED_RIGHT;
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
            case 2:
                return BalanceFactor.UNBALANCED_LEFT;
            default:
                return BalanceFactor.BALANCED;
        }
    }
    rotationLL(node) {
        const temp = node.left;
        node.left = temp.right;
        temp.right = node;
        return temp;
    }
    rotationRR(node) {
        const temp = node.left;
        node.left = temp.right;
        temp.right = node;
        return temp;
    }
}
export default AVLTree;
//# sourceMappingURL=AVLTree.js.map