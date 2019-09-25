"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Stack_1 = __importDefault(require("../Stack"));
/**
 * 判断是不是回文
 * "word" -> "drow"
 *
 *
 * @param word
 */
function isPalindrome(word) {
    const stack = Stack_1.default.fromArray(word.split(""));
    const reverseString = stack.toString();
    return word === reverseString;
}
describe("回文转换", function () {
    it('should ', function () {
        expect(isPalindrome("ceshi")).toBe(false);
        expect(isPalindrome("racecar")).toBe(true);
    });
});
//# sourceMappingURL=palindrome.spec.js.map