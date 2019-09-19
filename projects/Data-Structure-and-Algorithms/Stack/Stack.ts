// i ++ 先使用 i 在给 i ++
// ++ i 先给 i ++, 在使用 i

class Stack {

    /**
     *  top 初始化为 0, 每有一个元素被推入栈中 top 就会 +1
     *
     * [ 7 ] - top 8
     * [ 6 ] - top 7
     * [ 5 ] - top 6
     * [ 4 ] - top 5
     * [ 3 ] - top 4
     * [ 2 ] - top 3
     * [ 1 ] - top 2
     * [ 0 ] - top 1
     *
     */

    top = 0
    dataStore = []

    get empty() {
        return this.length === 0
    }

    get length() {
        return this.top
    }

    static fromArray(arr: any[]): Stack {
        const stack = new Stack()

        for (let e of arr) {
            stack.push(e)
        }

        return stack
    }

    static fromFilter(arr: any[], cb) {
        const stack = new Stack()

        for (let e of arr) {
            if (cb(e)) {
                stack.push(e)
            }
        }

        return stack
    }


    static fromArrayReverse(arr: any[]): Stack {
        const stack = new Stack()

        const newArr = arr.reverse()

        for (let e of newArr) {
            stack.push(e)
        }

        return stack
    }

    toString() {
        let s = ""

        let top = this.pop()
        while (top) {
            s += top
            top = this.pop()
        }

        return s
    }

    clear() {
        this.top = 0
    }

    pop() {
        const toped = this.dataStore[this.top]
        this.top -= 1
        return toped
    }

    push(element) {
        this.top += 1
        this.dataStore[this.top] = element
    }

    /**
     * [窥视]
     * 返回栈顶, 但是不会删除栈顶
     */
    peek() {
        return this.dataStore[this.top]
    }
}

export default Stack