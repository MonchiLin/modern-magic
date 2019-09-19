import Stack from '../Stack'
import {isBrackets, isNumber, isOperator} from '@magic/predicates'

describe('Stack 练习', function () {

    /**
     * 栈可以用来判断一个算术表达式中的括号是否匹配。编写一个函数，该函数接受一个算
     * 术表达式作为参数，返回括号缺失的位置。下面是一个括号不匹配的算术表达式的例
     * 子：2.3 + 23 / 12 + (3.14159×0.24。
     *
     */
    it('练习一', function () {

        function matchBrackets(input: string) {
            const stack = new Stack()


            for (let index in input.split("")) {
                const e = input[index]

                if (e === "(") {
                    stack.push(e)
                } else if (e === ")") {
                    const top = stack.pop()

                    if (top !== "(") {
                        console.log(`当前位置${index}, 缺少 )`)
                        return false
                    }
                }
            }

            if (stack.length === 1) {
                console.log(input, "仅匹配到了一个括号")
                return false
            }

            return true
        }

        expect(matchBrackets("2.3 + 23 / 12 + (3.14159×0.24")).toBe(false)
        expect(matchBrackets("2.3 + 23 / 12 + (3.14159×0.24)")).toBe(true)
        expect(matchBrackets("2.3 + (23 / 12) + (3.14159×0.24)")).toBe(true)
    });

    /**
     *
     * 2. 一个算术表达式的后缀表达式形式如下：
     * op1 op2 operator
     * 使用两个栈，一个用来存储操作数，另外一个用来存储操作符，设计并实现一个 JavaScript 函
     * 数，该函数可以将中缀表达式转换为后缀表达式，然后利用栈对该表达式求值。
     *
     *  (3 + 4) × 5 - 6  中缀表达式
     *  - × + 3 4 5 6    前缀表达式
     *  3 4 + 5 × 6 -    后缀表达式
     *
     */
    it('练习二 中缀表达式转换后缀表达式', function () {
        function infix2suffix(input: string) {

            const operands = new Stack()
            const operators = new Stack()

            for (let i = 0; i < input.length; i++) {
                const e = input[i]

                if (isNumber(e)) {
                    operands.push(e)
                } else if (isOperator(e)) {
                    operators.push(e)
                } else if (isBrackets(e)) {

                } else {
                    throw new TypeError(`传入了错误的表达式${e}`)
                }
            }


        }


        expect(infix2suffix("(3 + 4) × 5 - 6")).toBe("3 4 + 5 × 6 -")
    });

});

