import {SelectionSort} from '../SelectionSort'

describe('测试 SelectionSort', function () {
    it('case 1', function () {
        expect(SelectionSort([1, 5, 6, 7, 2, 4])).toStrictEqual([1, 2, 4, 5, 6, 7])
    });
});
