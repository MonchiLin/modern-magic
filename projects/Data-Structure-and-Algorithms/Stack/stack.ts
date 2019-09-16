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