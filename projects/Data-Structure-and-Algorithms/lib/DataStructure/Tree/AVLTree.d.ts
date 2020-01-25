import BinarySearchTree from "./BinarySearchTree";
import { defaultCompare } from "../../util";
declare class AVLTree extends BinarySearchTree {
    compareFn: typeof defaultCompare;
    constructor(compareFn?: typeof defaultCompare);
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
    getNodeHeight(node: any): any;
    /**
     * 如何判断树是否平衡：
     * 1. 左子树和右子树一样高
     * 2. 左子树比右子树高两两个
     * 3. 右子树比左子树高两两个
     * 除了以上三种情况，我们都认为树不平衡
     *
     * @param node
     */
    getBalanceFactor(node: any): number;
    rotationLL(node: any): any;
    rotationRR(node: any): any;
}
export default AVLTree;
//# sourceMappingURL=AVLTree.d.ts.map