/**
 function changeObjProperty(o) {
  o.siteUrl = "http://www.baidu.com"
  o = new Object()
  o.siteUrl = "http://www.google.com"
}
 let webSite = new Object();
 changeObjProperty(webSite);
 console.log(webSite.siteUrl);

 */

describe("day98", () => {
    it('q&a', function () {
        function changeObjProperty(o) {
            o.siteUrl = "http://www.baidu.com"
            // eslint-disable-next-line
            o = new Object()
            o.siteUrl = "http://www.google.com"
        }
        // eslint-disable-next-line
        let webSite = new Object();
        changeObjProperty(webSite);

        // 结果为 http://www.baidu.com
        // 因为传入的 o 是 webSide 这个对象的引用, 当重新为 o 赋值为 new Object() 时,
        // o 指向新的地址, 此时已经与 webSite 无关
        // @ts-ignore
        console.log(webSite.siteUrl);
    });

    it('使用 WeakSet 验证', function () {
        const ws = new WeakSet()

        function changeObjProperty(o) {
            // true 此时 ws 仍存在 o
            console.log(ws.has(o))
            // eslint-disable-next-line no-param-reassign
            o = {}
            // false 此时 ws 中已经不存在 o
            console.log(ws.has(o))
        }

        const webSite = {}
        ws.add(webSite)
        changeObjProperty(webSite)

    });

})
