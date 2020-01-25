// i ++ 先使用 i 在给 i ++
// ++ i 先给 i ++, 在使用 i
class Stack {
    constructor() {
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
        this.size = 0;
        this.items = {};
    }
    get empty() {
        return this.size === 0;
    }
    static fromArray(arr) {
        const stack = new Stack();
        for (let e of arr) {
            stack.push(e);
        }
        return stack;
    }
    static fromFilter(arr, cb) {
        const stack = new Stack();
        for (let e of arr) {
            if (cb(e)) {
                stack.push(e);
            }
        }
        return stack;
    }
    static fromArrayReverse(arr) {
        const stack = new Stack();
        const newArr = arr.reverse();
        for (let e of newArr) {
            stack.push(e);
        }
        return stack;
    }
    toString(split = "") {
        let s = "";
        let top = this.pop();
        while (top) {
            s += top + split;
            top = this.pop();
        }
        if (split) {
            return s.slice(0, s.length - 1);
        }
        else {
            return s;
        }
    }
    clear() {
        this.items = {};
        this.size = 0;
    }
    pop() {
        if (this.empty) {
            return undefined;
        }
        this.size -= 1;
        const deleted = this.items[this.size];
        delete this.items[this.size];
        return deleted;
    }
    push(element) {
        this.items[this.size] = element;
        this.size += 1;
    }
    /**
     * [窥视]
     * 返回栈顶, 但是不会删除栈顶
     */
    peek() {
        if (this.empty) {
            return undefined;
        }
        return this.items[this.size - 1];
    }
}
export default Stack;
//# sourceMappingURL=Stack.js.map