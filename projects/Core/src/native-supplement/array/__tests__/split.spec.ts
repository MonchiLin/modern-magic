import split from '../split';

describe('split', function () {
  it('功能性测试-1', function () {
    const fakeData = [1, 2, 3, 4, 5, 6];
    const expectData = [[1, 2, 3], [4, 5, 6]];

    expect(split(3, fakeData)).toStrictEqual(expectData);
  });
  it('功能性测试-2', function () {
    const fakeData = ['x', 'A', 1, 4, 5, 6, 7, [1, 2, 3]];
    const expectData = [['x', 'A', 1], [4, 5, 6], [7, [1, 2, 3]]];

    expect(split(3, fakeData)).toStrictEqual(expectData);
  });
});
