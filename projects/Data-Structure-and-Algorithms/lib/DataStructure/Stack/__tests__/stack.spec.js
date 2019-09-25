"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Stack_1 = __importDefault(require("../Stack"));
describe('Stack 功能性测试', function () {
    it('case 1 POP', function () {
        const stack = new Stack_1.default();
        stack.push("张三");
        stack.push("李四");
        const poped = stack.pop();
        expect(poped).toBe("李四");
    });
    it('case 1 POP 2', function () {
        expect.assertions(2);
        const stack = new Stack_1.default();
        stack.push("张三");
        stack.push("李四");
        const poped = stack.pop();
        stack.push("王五");
        expect(poped).toBe("李四");
        expect(stack.peek()).toBe("王五");
    });
    it('case 1 POP 3', function () {
        expect.assertions(3);
        const stack = new Stack_1.default();
        stack.push("张三");
        stack.push("李四");
        let poped = stack.pop();
        expect(poped).toBe("李四");
        stack.push("王五");
        stack.push("王五1");
        stack.push("王五2");
        poped = stack.pop();
        expect(poped).toBe("王五2");
        stack.pop();
        expect(stack.pop()).toBe("王五");
    });
    it('case 2 PUSH', function () {
        const stack = new Stack_1.default();
        stack.push("第三");
        stack.push("第二");
        stack.push("第一");
        expect(stack.size).toBe(3);
    });
    it('case 3 PEEK', function () {
        const stack = new Stack_1.default();
        stack.push("第三");
        stack.push("第二");
        stack.push("第一");
        expect(stack.peek()).toBe("第一");
    });
    it('case 3 PEEK 2', function () {
        const stack = new Stack_1.default();
        stack.push("第三");
        stack.push("第二");
        stack.pop();
        expect(stack.peek()).toBe("第三");
    });
    it('case 4 ToString', function () {
        const stack = new Stack_1.default();
        stack.push("第一");
        stack.push("第二");
        stack.push("第三");
        expect(stack.toString()).toBe("第三第二第一");
    });
    it('case 4 ToString 2', function () {
        const stack = new Stack_1.default();
        stack.push("第一");
        stack.push("第二");
        stack.push("第三");
        expect(stack.toString(",")).toBe("第三,第二,第一");
    });
});
//# sourceMappingURL=stack.spec.js.map