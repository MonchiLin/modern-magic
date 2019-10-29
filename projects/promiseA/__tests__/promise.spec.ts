import PromiseA from "../promise";

describe("PromiseA", function () {
    it('同步的', function () {
        const promiseA = new PromiseA((resovle, reject) => {
            resovle(10)
        })

        return promiseA
            .then(v => {
                console.log(v)
            })

    });

    it('异步的', function () {
        const promiseA = new PromiseA((resovle, reject) => {
            setTimeout(() => {
                resovle(10)
            }, 100)
        })

        return promiseA
            .then(v => {
                console.log(v)
            })

    });

    it('传入了 promise', function () {
        const promise1 = new PromiseA((resolve, reject) => {
            resolve(122)
        })

        const promiseA = new PromiseA((resolve, reject) => {
            resolve(promise1)
        })

        return promiseA
            .then(v => {
                console.log(v)
            })

    });

    it('then 链式调用', function () {

        const promiseA = new PromiseA((resolve, reject) => {
            resolve(1212)
        })

        return promiseA
            .then(v => {
                return v
            })
            .then(v => {
                console.log(v === 1212)
            })

    });

    it('传入相同的 promise', function () {

        const promiseA = new PromiseA((resolve, reject) => {
            resolve(121212)
        })

        return promiseA
            .then(v => {
                return promiseA
            })
            .then(v => {
                console.log(v === 1212)
            })

    });

})
