describe('l', function () {

    it("weakmap this", () => {
        let x = {foo: 1}
        const ws = new WeakMap()

        ws.set(x, 1)
        console.log(ws.get(x))

        // @ts-ignore 增加一个属性不会影响 this, 所以仍然可以 get 到
        x.bar = 1
        console.log(ws.get(x))

        // 改变 this 后无法通过 ws.get 到
        x = {foo: 2}
        console.log(ws.get(x))
    })

    it("override name", () => {
        function name() {
            const name = function name() {
                console.log("name")
            }
            console.log(name)
            console.log(name())
        }

        name()
    })

});
