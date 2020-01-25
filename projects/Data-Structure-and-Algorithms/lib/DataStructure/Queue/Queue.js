class Queue {
    constructor() {
        this.dataStore = {};
        this.count = 0;
        this.headIndex = 0;
    }
    // 向队列添尾部加一个元素
    enqueue(e) {
        this.dataStore[this.count] = e;
        this.count += 1;
    }
    size() {
        return this.count - this.headIndex;
    }
    // 移除队列第一项
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        const deleted = this.dataStore[this.headIndex];
        delete this.dataStore[this.headIndex];
        this.headIndex += 1;
        return deleted;
    }
    // 返回队列中的第一个元素
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.dataStore[this.headIndex];
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this.dataStore[this.headIndex]}`;
        for (let i = this.headIndex + 1; i < this.count; i++) {
            objString = `${objString},${this.dataStore[i]}`;
        }
        return objString;
    }
    // 根据当前队列有没有元素返回 true 或者 false
    isEmpty() {
        return this.size() === 0;
    }
}
class DQueue {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    isEmpty() {
        return this.size() === 0;
    }
    // 该方法在双端队列前端添加新的元素。
    addFront(element) {
        if (this.isEmpty()) {
            this.addBack(element);
            return;
        }
        if (this.lowestCount > 0) {
            this.lowestCount -= 1;
            this.items[this.lowestCount] = element;
            return;
        }
        const items = Object.keys(this.items);
        for (let i of items.reverse()) {
            this.items[parseInt(i, 10) + 1] = this.items[i];
        }
        // 此时 lowestCount 一定等于 0
        this.items[this.lowestCount] = element;
        this.count += 1;
    }
    // 该方法在双端队列后端添加新的元素（实现方法和 Queue 类中的
    // enqueue 方法相同）。
    addBack(element) {
        this.items[this.count] = element;
        this.count += 1;
    }
    // 该方法会从双端队列前端移除第一个元素（实现方法和 Queue 类中的
    // dequeue 方法相同）。
    removeFront() {
        if (this.isEmpty()) {
            return null;
        }
        const deleted = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount += 1;
        return deleted;
    }
    // 该方法会从双端队列后端移除第一个元素（实现方法和 Stack 类中的
    // pop 方法一样）。
    removeBack() {
        if (this.isEmpty()) {
            return null;
        }
        const deleted = this.items[this.count - 1];
        delete this.items[this.count];
        this.count -= 1;
        return deleted;
    }
    // 该方法返回双端队列前端的第一个元素（实现方法和 Queue 类中的 peek
    // 方法一样）。
    peekFront() {
        return this.items[this.lowestCount];
    }
    // 该方法返回双端队列后端的第一个元素（实现方法和 Stack 类中的 peek
    // 方法一样）。
    peekBack() {
        return this.items[this.count - 1];
    }
    clear() {
        this.items = {};
        this.count = 0;
        this.lowestCount = 0;
    }
    size() {
        return this.count - this.lowestCount;
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }
}
export { Queue, DQueue };
//# sourceMappingURL=Queue.js.map