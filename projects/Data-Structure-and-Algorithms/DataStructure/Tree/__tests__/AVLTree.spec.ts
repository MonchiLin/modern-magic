import AVLTree from "../AVLTree";

describe('测试 AVLTree', function () {
    it('插入', function () {

        const tree = new AVLTree();

        tree.insert(3);
        tree.insert(2);
        tree.insert(1);

        expect(tree.getNodeHeight(tree.root)).toBe(3)
    });

    it('rotationLL', function () {

        const tree = new AVLTree();

        tree.insert(50);
        tree.insert(30);
        tree.insert(70);
        tree.insert(10);
        tree.insert(40);
        tree.insert(5);

        tree.rotationLL(tree.root)
    });


});