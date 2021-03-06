import BinarySearchTree from "../BinarySearchTree";

describe('测试 BinarySearchTree', function () {
    it('插入', function () {
        expect.assertions(1);

        const tree = new BinarySearchTree();

        tree.insert(11);

        tree.insert(7);
        tree.insert(15);
        tree.insert(5);
        tree.insert(3);
        tree.insert(9);
        tree.insert(8);
        tree.insert(10);
        tree.insert(13);
        tree.insert(12);
        tree.insert(14);
        tree.insert(20);
        tree.insert(18);
        tree.insert(25);
        tree.insert(6);

        expect(tree.root.key).toBe(11)
    });

    it('中序遍历', function () {
        expect.assertions(1);

        const tree = new BinarySearchTree();
        tree.insert(11);
        tree.insert(7);
        tree.insert(15);
        tree.insert(5);
        tree.insert(3);
        tree.insert(9);
        tree.insert(8);
        tree.insert(10);
        tree.insert(13);
        tree.insert(12);
        tree.insert(14);
        tree.insert(20);
        tree.insert(18);
        tree.insert(25);
        tree.insert(6);

        tree.inOrderTraverse(console.log);

        expect(tree.root.key).toBe(11)
    });

    it('先序遍历', function () {
        expect.assertions(1);

        const tree = new BinarySearchTree();
        tree.insert(11);
        tree.insert(7);
        tree.insert(15);
        tree.insert(5);
        tree.insert(3);
        tree.insert(9);
        tree.insert(8);
        tree.insert(10);
        tree.insert(13);
        tree.insert(12);
        tree.insert(14);
        tree.insert(20);
        tree.insert(18);
        tree.insert(25);
        tree.insert(6);

        tree.preOrderTraverse(console.log);

        expect(tree.root.key).toBe(11)
    });

    it('后序遍历', function () {
        expect.assertions(1);

        const tree = new BinarySearchTree();
        tree.insert(11);
        tree.insert(7);
        tree.insert(15);
        tree.insert(5);
        tree.insert(3);
        tree.insert(9);
        tree.insert(8);
        tree.insert(10);
        tree.insert(13);
        tree.insert(12);
        tree.insert(14);
        tree.insert(20);
        tree.insert(18);
        tree.insert(25);
        tree.insert(6);

        tree.postOrderTraverse(console.log);

        expect(tree.root.key).toBe(11)
    });

    it('测试 min', function () {
        const tree = new BinarySearchTree();
        tree.insert(11);
        tree.insert(7);
        tree.insert(15);
        tree.insert(5);
        tree.insert(3);
        tree.insert(9);
        tree.insert(8);
        tree.insert(10);
        tree.insert(13);
        tree.insert(12);
        tree.insert(14);
        tree.insert(20);
        tree.insert(18);
        tree.insert(25);
        tree.insert(6);

        expect(tree.min().key).toBe(3)
    });

    it('测试 max', function () {
        const tree = new BinarySearchTree();
        tree.insert(11);
        tree.insert(7);
        tree.insert(15);
        tree.insert(5);
        tree.insert(3);
        tree.insert(9);
        tree.insert(8);
        tree.insert(10);
        tree.insert(13);
        tree.insert(12);
        tree.insert(14);
        tree.insert(20);
        tree.insert(18);
        tree.insert(25);
        tree.insert(6);

        expect(tree.max().key).toBe(25)
    });

    it('测试 search', function () {
        const tree = new BinarySearchTree();
        tree.insert(11);
        tree.insert(7);
        tree.insert(15);
        tree.insert(5);
        tree.insert(3);
        tree.insert(9);
        tree.insert(8);
        tree.insert(10);
        tree.insert(13);
        tree.insert(12);
        tree.insert(14);
        tree.insert(20);
        tree.insert(18);
        tree.insert(25);
        tree.insert(6);

        expect(tree.search(5)).toBe(true);
        expect(tree.search(16)).toBe(false)
    });

    it('测试 search', function () {
        const tree = new BinarySearchTree();
        tree.insert(11);
        tree.insert(7);
        tree.insert(15);
        tree.insert(5);
        tree.insert(3);
        tree.insert(9);
        tree.insert(8);
        tree.insert(10);
        tree.insert(13);
        tree.insert(12);
        tree.insert(14);
        tree.insert(20);
        tree.insert(18);
        tree.insert(25);
        tree.insert(6);

        tree.remove(3);

        expect(tree.root.left.left.left).toBe(null)
    });

});