"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BubbleSort_1 = require("../BubbleSort");
describe('测试 BubbleSort', function () {
    it('case 1', function () {
        expect(BubbleSort_1.BubbleSort([1, 3, 5, 2, 6])).toStrictEqual([1, 2, 3, 5, 6]);
    });
    it('case 2', function () {
        // 第一轮 [1, 5, 8, 0, 9]
        // 第二轮 [1, 5, 0, 8, 9]
        // 第三轮 [1, 0, 5, 8, 9]
        // 第四轮 [0, 1, 5, 8, 9]
        expect(BubbleSort_1.BubbleSort([1, 5, 9, 8, 0])).toStrictEqual([0, 1, 5, 8, 9]);
    });
    it('ModifiedBubbleSort', function () {
        expect(BubbleSort_1.ModifiedBubbleSort([1, 5, 9, 8, 0])).toStrictEqual([0, 1, 5, 8, 9]);
    });
});
//# sourceMappingURL=BubbleSort.spec.js.map