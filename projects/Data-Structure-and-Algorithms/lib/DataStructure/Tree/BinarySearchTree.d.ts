import { defaultCompare } from '../../util';
declare class BinarySearchTree {
    root: any;
    compareFn: any;
    constructor(compareFn?: typeof defaultCompare);
    /**
     * 向树中插一个新的键
     * @param key
     */
    insert(key: any): void;
    insertNode(node: any, key: any): void;
    /**
     * 在树中查找一个键, 找到返回 true, 没找到返回 false
     * @param key
     */
    search(key: any): any;
    searchNode(node: any, key: any): any;
    inOrderTraverse(callback: any): void;
    inOrderTraverseNode(node: any, callback: any): void;
    preOrderTraverse(callback: any): void;
    preOrderTraverseNode(node: any, callback: any): void;
    postOrderTraverse(callback: any): void;
    postOrderTraverseNode(node: any, callback: any): void;
    min(): any;
    minNode(node: any): any;
    max(): any;
    maxNode(node: any): any;
    remove(key: any): any;
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
    removeNode(node: any, key: any): any;
}
export default BinarySearchTree;
//# sourceMappingURL=BinarySearchTree.d.ts.map