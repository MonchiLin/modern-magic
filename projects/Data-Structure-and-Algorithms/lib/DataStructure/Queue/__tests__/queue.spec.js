import { Queue } from '../Queue';
describe('测试 Queue', function () {
    it('测试 enqueue', function () {
        expect.assertions(3);
        const queue = new Queue();
        queue.enqueue("张三");
        queue.enqueue("李四");
        expect(queue.count).toBe(2);
        expect(queue.dequeue()).toBe("张三");
        expect(queue.headIndex).toBe(1);
    });
});
//# sourceMappingURL=queue.spec.js.map