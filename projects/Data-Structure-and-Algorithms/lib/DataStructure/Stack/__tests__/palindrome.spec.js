import Stack from '../Stack';
/**
 * 判断是不是回文
 * "word" -> "drow"
 *
 *
 * @param word
 */
function isPalindrome(word) {
    const stack = Stack.fromArray(word.split(""));
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