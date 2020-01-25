import mergeSort from "../mergeSort";
describe('mergeSort', function () {
    it('should sort', function () {
        const arr = [32, 12, 56, 78, 76, 45, 36];
        const result = mergeSort(arr);
        expect(result).toStrictEqual([12, 32, 36, 45, 56, 76, 78]);
    });
});
//# sourceMappingURL=mergeSort.spec.js.map