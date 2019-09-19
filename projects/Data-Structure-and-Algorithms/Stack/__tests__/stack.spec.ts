import Stack from '../Stack'

describe('Stack 功能性测试', function () {

    it('case 1 POP', function () {
        const stack = new Stack()
        stack.push("张三")
        stack.push("李四")

        const poped = stack.pop()

        expect(poped).toBe("李四")

    });

    it('case 2 PUSH', function () {
        const stack = new Stack()

        stack.push("第三")
        stack.push("第二")
        stack.push("第一")

        expect(stack.length).toBe(3)
    });

    it('case 3 PEEK', function () {
        const stack = new Stack()

        stack.push("第三")
        stack.push("第二")
        stack.push("第一")

        expect(stack.peek()).toBe("第一")
    });


});

