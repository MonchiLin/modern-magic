import Queue from '../Queue'

describe('测试 Queue', function () {
    it('测试 enqueue', function () {
        const queue = new Queue();
        queue.enqueue("张三");
        queue.enqueue("李四");
        queue.enqueue("王五");
        queue.enqueue("赵二麻子");

        expect(queue.front()).toBe("张三")

    });
});
