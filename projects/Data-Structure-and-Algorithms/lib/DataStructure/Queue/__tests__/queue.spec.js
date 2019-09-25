"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Queue_1 = require("../Queue");
describe('测试 Queue', function () {
    it('测试 enqueue', function () {
        expect.assertions(3);
        const queue = new Queue_1.Queue();
        queue.enqueue("张三");
        queue.enqueue("李四");
        expect(queue.count).toBe(2);
        expect(queue.dequeue()).toBe("张三");
        expect(queue.headIndex).toBe(1);
    });
});
//# sourceMappingURL=queue.spec.js.map