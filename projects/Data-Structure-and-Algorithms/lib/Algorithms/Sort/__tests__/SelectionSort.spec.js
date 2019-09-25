"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SelectionSort_1 = __importDefault(require("../SelectionSort"));
describe('测试 SelectionSort', function () {
    it('case 1', function () {
        expect(SelectionSort_1.default([1, 5, 6, 7, 2, 4])).toStrictEqual([1, 2, 4, 5, 6, 7]);
    });
});
//# sourceMappingURL=SelectionSort.spec.js.map