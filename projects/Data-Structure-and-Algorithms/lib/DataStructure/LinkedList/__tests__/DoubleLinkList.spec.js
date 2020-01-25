import { DoubleLinkedList } from '../LinkedList';
describe("测试 DoubleLinkedList", function () {
    it('测试 push', function () {
        expect.assertions(2);
        const linkedList = new DoubleLinkedList();
        linkedList.push("站桑");
        linkedList.push("里斯");
        linkedList.push("汪芜");
        linkedList.push("赵小姐");
        expect(linkedList.getElementAt(1).element).toBe("里斯");
        expect(linkedList.getElementAt(1).previous.element).toBe("站桑");
    });
    it('测试 insert', function () {
        expect.assertions(3);
        const linkedList = new DoubleLinkedList();
        linkedList.push("站桑");
        linkedList.push("里斯");
        linkedList.insert("汪芜", 1);
        linkedList.push("赵小姐");
        expect(linkedList.getElementAt(1).element).toBe("汪芜");
        expect(linkedList.getElementAt(1).previous.element).toBe("站桑");
        linkedList.insert("瞅瞅", 0);
        expect(linkedList.head.element).toBe("瞅瞅");
    });
    it('测试 removeAt case1', function () {
        const linkedList = new DoubleLinkedList();
        linkedList.push("站桑");
        linkedList.push("里斯");
        linkedList.insert("汪芜", 1);
        linkedList.push("赵小姐");
        expect(linkedList.removeAt(0).element).toBe("站桑");
    });
    it('测试 removeAt case2', function () {
        const linkedList = new DoubleLinkedList();
        linkedList.push("站桑");
        linkedList.push("里斯");
        linkedList.insert("汪芜", 1);
        linkedList.push("赵小姐");
        expect(linkedList.removeAt(1).element).toBe("汪芜");
    });
});
//# sourceMappingURL=DoubleLinkList.spec.js.map