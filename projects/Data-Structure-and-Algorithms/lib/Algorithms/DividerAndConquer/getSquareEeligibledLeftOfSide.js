/**
 * 从任意一个长方形中获取他能够分割成正方形的边长
 */
function getSquareEeligibledLeftOfSide(height, widht) {
    const remainder = height % widht;
    if (remainder === 0) {
        return widht;
    }
    return getSquareEeligibledLeftOfSide(widht, remainder);
}
export { getSquareEeligibledLeftOfSide };
//# sourceMappingURL=getSquareEeligibledLeftOfSide.js.map