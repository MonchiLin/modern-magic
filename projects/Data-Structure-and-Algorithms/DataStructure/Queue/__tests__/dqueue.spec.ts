import {DQueue} from '../Queue'

describe('测试 DQueue', function () {
    it('测试 enqueue', function () {
        expect.assertions(2);

        const dqueue = new DQueue();
        dqueue.addBack("张三");
        dqueue.addBack("李四");

        expect(dqueue.size()).toBe(2);
        dqueue.addFront("小王在前面");
        expect(dqueue.peekFront()).toBe("小王在前面")
    });

    it('测试 addFront', function () {
        const dqueue = new DQueue();
        dqueue.addBack("张三");
        dqueue.addBack("李四");
        dqueue.addFront("小王");

        expect(dqueue.peekFront()).toBe("小王")
    });

    it('测试 peekBack', function () {
        const dqueue = new DQueue();
        dqueue.addBack("张三");
        dqueue.addBack("李四");
        dqueue.addFront("小王");

        expect(dqueue.peekBack()).toBe("李四")
    });

    it('测试 peekFront', function () {
        const dqueue = new DQueue();
        dqueue.addBack("张三");
        dqueue.addBack("李四");
        dqueue.addFront("小王");
        dqueue.addBack("大王");

        expect(dqueue.peekFront()).toBe("小王")
    });

    it('测试 removeFront', function () {
        expect.assertions(2);
        const dqueue = new DQueue();
        dqueue.addBack("张三");
        dqueue.addBack("李四");
        dqueue.addFront("小王");
        dqueue.addBack("大王");

        expect(dqueue.removeFront()).toBe("小王");
        expect(dqueue.peekFront()).toBe("张三")
    });

});
