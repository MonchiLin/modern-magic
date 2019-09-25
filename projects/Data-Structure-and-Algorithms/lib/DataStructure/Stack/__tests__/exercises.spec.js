"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Stack_1 = __importDefault(require("../Stack"));
const predicates_1 = require("@magic/predicates");
function 比较优先级(s1, s2) {
    const priorities = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2,
        "(": 3,
        ")": 3
    };
    return priorities[s1] > priorities[s2];
}
function infix2Suffix(input) {
    const input$ = input.split("");
    const Output = new Stack_1.default();
    const Operator = new Stack_1.default();
    for (let e of input$) {
        if (predicates_1.isSpace(e)) {
            continue;
        }
        if (predicates_1.isNumber(e)) {
            Output.push(e);
            continue;
        }
        let peeked = Operator.peek();
        if (predicates_1.isOperator(e)) {
            if (Operator.empty) {
                Operator.push(e);
                continue;
            }
            if (predicates_1.isLeftBrackets(peeked)) {
                Operator.push(e);
                continue;
            }
            if (比较优先级(e, peeked)) {
                Operator.push(e);
                continue;
            }
            // 栈顶元素高于或者等于当前元素
            if (!比较优先级(e, peeked)) {
                // 只要操作符栈没空并且当前不是开括号
                while (!Operator.empty
                    && !predicates_1.isLeftBrackets(Operator.peek())
                    && !比较优先级(e, Operator.peek())) {
                    const poped = Operator.pop();
                    Output.push(poped);
                }
                Operator.push(e);
                continue;
            }
        }
        if (predicates_1.isLeftBrackets(e)) {
            Operator.push(e);
            continue;
        }
        if (predicates_1.isRightBrackets(e)) {
            while (!Operator.empty
                && !predicates_1.isLeftBrackets(Operator.peek())) {
                Output.push(Operator.pop());
            }
            // 弹出 左括号
            Operator.pop();
            continue;
        }
        console.log("居然有没有处理的情况 => ", e);
    }
    let poped = Operator.pop();
    while (poped) {
        Output.push(poped);
        poped = Operator.pop();
    }
    return Output;
}
function calcSuffix(stack) {
    let poped = stack.pop();
    while (poped) {
        if (predicates_1.isOperator(poped)) {
            const poepd1 = stack.pop();
            const poepd2 = stack.pop();
            const s = poepd1 + poped + poepd2;
            stack.push(eval(s));
        }
        poped = stack.pop();
    }
}
describe('Stack 练习', function () {
    /**
     * 栈可以用来判断一个算术表达式中的括号是否匹配。编写一个函数，该函数接受一个算
     * 术表达式作为参数，返回括号缺失的位置。下面是一个括号不匹配的算术表达式的例
     * 子：2.3 + 23 / 12 + (3.14159×0.24。
     *
     */
    it('练习一', function () {
        function matchBrackets(input) {
            const stack = new Stack_1.default();
            for (let index in input.split("")) {
                const e = input[index];
                if (e === "(") {
                    stack.push(e);
                }
                else if (e === ")") {
                    const top = stack.pop();
                    if (top !== "(") {
                        console.log(`当前位置${index}, 缺少 )`);
                        return false;
                    }
                }
            }
            if (stack.size === 1) {
                console.log(input, "仅匹配到了一个括号");
                return false;
            }
            return true;
        }
        expect(matchBrackets("2.3 + 23 / 12 + (3.14159×0.24")).toBe(false);
        expect(matchBrackets("2.3 + 23 / 12 + (3.14159×0.24)")).toBe(true);
        expect(matchBrackets("2.3 + (23 / 12) + (3.14159×0.24)")).toBe(true);
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
        const output = infix2Suffix("(3 + 4) * 5 - 6")
            .toString(" ")
            .split("")
            .reverse()
            .join("");
        expect(output).toBe("3 4 + 5 * 6 -");
    });
    it('练习二 计算后缀表达式', function () {
        // TODO
        // expect(infix2Suffix("a + b * c + ( d * e + f ) * g")).toBe("a b c * + d e * f  + g * +")
        expect(true).toBe(false);
    });
    /**
     * 现实生活中栈的一个例子是佩兹糖果盒。想象一下你有一盒佩兹糖果，里面塞满了红
     * 色、黄色和白色的糖果，但是你不喜欢黄色的糖果。使用栈（有可能用到多个栈）写一
     * 段程序，在不改变盒内其他糖果叠放顺序的基础上，将黄色糖果移出。
     */
    it('删除黄色糖果', function () {
    });
});
//# sourceMappingURL=exercises.spec.js.map