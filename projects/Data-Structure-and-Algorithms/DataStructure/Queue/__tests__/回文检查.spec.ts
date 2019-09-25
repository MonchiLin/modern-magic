/**
 *
 回文是正反都能读通的单词、词组、数或一系列字符的序列，例如 madam或 racecar。
 *
 */
import {DQueue} from "../Queue";

/**
 * 计算过程 "madam"
 * 1. m
 * 2. ma
 * 3. mad
 * 4. mada
 * 5. madam
 *
 *
 * @param word
 */
function palindromeChecker(word: string): boolean {
    const queue = new DQueue();
    word.split("")
        .forEach(w => {
            queue.addBack(w)
        });
    let newStr = "";

    while (queue.size() !== 0) {
        newStr += queue.removeBack()
    }

    return newStr === word
}

describe('回文检查', function () {
    it('should ', function () {
        expect.assertions(2);
        expect(palindromeChecker("madam")).toBe(true);
        expect(palindromeChecker("test")).toBe(false)
    });
});