// https://www.shuxuele.com/algebra/logarithms.html

describe('对数', function () {
    it('三个二相乘', function () {
        const ThreeTwo = 2 * 2 * 2
        expect(ThreeTwo).toBe(8)


        // 用 log 的方式写

        // log (8) = 3
        //    2

        // 上面 log 数学符号, 表示对数
        // 2 底数
        // 8 积
        // 3 log
        // 8的 log 在以 2 为底数时是 3
        //
        //  3
        // 2 = 8 === log 8 = 3
        //              2
    });

    it('例子1 log5(625) ', function () {
        // 多少个 5 相乘是 625
        // 5 * 5 * 5 ....  = 625

        expect(5 * 5 * 5 * 5).toBe(625)
    });



});