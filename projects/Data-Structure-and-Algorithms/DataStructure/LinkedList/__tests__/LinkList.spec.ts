import {LinkedList} from '../LinkedList'

describe("测试 LinkedList", function () {
    it('测试 push', function () {
        const linkedList = new LinkedList();
        linkedList.push("站桑");
        linkedList.push("里斯");

        expect(linkedList.count).toBe(2)
    });

    it('测试 remove', function () {
        expect.assertions(2);
        const linkedList = new LinkedList();
        linkedList.push("站桑");
        linkedList.push("里斯");
        linkedList.push("汪芜");
        linkedList.push("赵小姐");

        expect(linkedList.removeAt(1)).toBe("里斯");
        expect(linkedList.count).toBe(3)
    });

    it('测试 getElementAt', function () {
        const linkedList = new LinkedList();
        linkedList.push("站桑");
        linkedList.push("里斯");
        linkedList.push("汪芜");
        linkedList.push("赵小姐");

        expect(linkedList.getElementAt(1).element).toBe("里斯")
    });

    it('测试 insert', function () {
        expect.assertions(2);
        const linkedList = new LinkedList();
        linkedList.push("站桑");
        linkedList.push("里斯");
        linkedList.push("汪芜");
        linkedList.push("赵小姐");
        linkedList.insert("小王八", 2);

        expect(linkedList.getElementAt(2).element).toBe("小王八");
        expect(linkedList.count).toBe(5)
    });

    it('测试 indexOf', function () {
        expect.assertions(2);
        const linkedList = new LinkedList();
        linkedList.push("站桑");
        linkedList.push("里斯");
        linkedList.insert("小王八", 1);
        linkedList.push("汪芜");
        linkedList.push("张哥");
        linkedList.push("赵小姐");

        expect(linkedList.indexOf("张哥")).toBe(4);
        expect(linkedList.indexOf("不存在的")).toBe(-1)
    });

});
