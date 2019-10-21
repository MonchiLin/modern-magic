/**
 * 用 JavaScript 写一个函数，输入 int 型，返回整数逆序后的字符串。
 * 如：输入整型 1234，返回字符串“4321”。
 * 要求必须使用递归函数调用，不能用全局变量，输入函数必须只有一个参数传入，必须返回字符串。
 */

function answer1(input: number) {
    if (input < 0) {
        return answer1(Math.abs(input))
    }

    const inputToS = input.toString()
    const index = inputToS.length - 1

    if (index === 0) {
        return inputToS[index]
    }

    return inputToS[index] + answer1(parseInt(inputToS.slice(0, index), 10))
}

describe("day99", () => {

    it('q&a 转换成 String', function () {
        // 我只能想出平庸的转换写法, github 上有人给出了性能更高的算法, 参见 q&a 2
        expect(answer1(1234)).toBe("4321")
        expect(answer1(-1234)).toBe("4321")
    });

    it('q&a 2', function () {
        function fun(num){
            let num1 = num / 10;
            let num2 = num % 10;
            if(num1<1){
                return num;
            }else{
                num1 = Math.floor(num1)
                return `${num2}${fun(num1)}`
            }
        }
        const a = fun(12345)
    });
})
