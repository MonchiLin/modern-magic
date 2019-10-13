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

    it("change this", () => {
        const target = {
            foo: 1
        }

        const handler = {
            get(target, p: string | number | symbol, receiver: any): any {
                console.log(this === handler) // true
                return target[p]
            },
            set(target: { foo: number }, p: string | number | symbol, value: any, receiver: any): boolean {
                return Reflect.set(target, p, value)
            }
        }

        const proxies = new Proxy(target, handler)

        console.log(proxies.foo)
    })

    it("incorrect proxy this", () => {
        const target = {
            foo: function () {
                return this.bar
            },
            bar: "bar"
        }

        const handler = {
            get(target, p: string | number | symbol, receiver: any): any {
                if (p === "foo") {
                    return this.bar
                }

                return target[p]
            },
            set(target, p: string | number | symbol, value: any, receiver: any): boolean {
                return Reflect.set(target, p, value)
            }
        }

        const proxies = new Proxy(target, handler)

        // TypeError: proxies.foo is not a function
        // 因为 此时访问的是 handler.foo
        console.log(proxies.foo())
        console.log(proxies.bar)
    })

    it("why is receiver?", () => {
        const target = {
            foo: 1
        }

        const handler = {
            get(target, p: string | number | symbol, receiver: any): any {
                console.log(receiver === proxies) // true

                return Reflect.get(target, p, receiver)
            },
        }

        const proxies = new Proxy(target, handler)

        console.log(proxies.foo)
    })

});
