const STATE = {
    Pending: 0,
    Fulfilled: 1,
    Rejected: 2
}

function isPromise(o: any): o is PromiseA {
    return o instanceof PromiseA
}

function isThenable(o: any): o is PromiseA {
    return typeof o === "function" && typeof o.then === "function"
}

function isFunction(o: any): boolean {
    return typeof o === "function"
}

function resolvePromise(promise, value, resolve, reject) {
    if (value === promise) {
        throw new TypeError('Chaining cycle detected for promise #<Promise>');
    }

    try {
        if (isThenable(value)) {
            const then = value.then
            then.call(value, nextValue => {
                resolvePromise(promise, nextValue, resolve, reject)
            }, (nextError) => {
                reject(nextError)
            })
        } else {
            resolve(value)
        }
    } catch (e) {
        reject(e)
    }

    resolve(value)
}

function deferred() {
    let dfd = {promise: null, resolve: null, reject: null};
    dfd.promise = new PromiseA((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}

class PromiseA {

    static defer = deferred
    static deferred = deferred


    private state = STATE.Pending
    private value
    private reason

    // 储存在 state 变化到 fulfilled 时的回调函数
    // 这里的回调函数来自于 then 接受的
    private onFulfilledCallbacks = []

    private onRejectedCallbacks = []

    constructor(excutor) {
        try {
            excutor(this.resolve.bind(this), this.reject.bind(this))
        } catch (err) {
            this.reject.call(this, err)
        }
    }


    private resolve = (value) => {
        // 处理传入时 promise 的情况
        if (isPromise(value)) {
            return value.then(this.resolve.bind(this), this.reject.bind(this))
        }

        if (this.state !== STATE.Pending) {
            return
        }

        this.value = value
        this.state = STATE.Fulfilled

        this.onFulfilledCallbacks.forEach(cb => cb(value))
    }


    private reject = (reason) => {
        if (this.state !== STATE.Pending) {
            return
        }

        this.reason = reason
        this.state = STATE.Rejected

        this.onRejectedCallbacks.forEach(cb => cb(reason))
    }

    then(onFulfilled?, onRejected?) {
        onFulfilled = isFunction(onFulfilled) ? onFulfilled : v => v
        onRejected = isFunction(onRejected) ? onRejected : err => {
            throw err
        }

        const self = this

        const promise2 = new PromiseA((resolve, reject) => {

            switch (self.state) {
                case STATE.Pending:
                    // 在 pending 状态时储存回调函数
                    this.onFulfilledCallbacks.push((value) => {
                        try {
                            resolvePromise(promise2, onFulfilled(value), resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })

                    this.onRejectedCallbacks.push(reason => {
                        try {
                            resolvePromise(promise2, onRejected(reason), resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                    break
                case STATE.Fulfilled:
                    setTimeout(() => {
                        try {
                            resolvePromise(promise2, onFulfilled(self.value), resolve, reject)
                        } catch (err) {
                            reject(err)
                        }
                    }, 0)
                    break
                case STATE.Rejected:
                    setTimeout(() => {
                        try {
                            resolvePromise(promise2, onRejected(self.reason), resolve, reject)
                        } catch (err) {
                            reject(err)
                        }
                    }, 0)
                    break
            }

        })

        return promise2
    }

}

export default PromiseA

