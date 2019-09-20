class Queue {
    dataStore = [];

    peek() {
        return this.dataStore[0]
    }

    // 往队尾添加一个元素
    enqueue(e) {
        this.dataStore.push(e)
    }

    // 删除队首
    dequeue() {
        return this.dataStore.shift()
    }

    // 读取队首
    front() {
        return this.dataStore[0];
    }

    // 删除队尾
    back() {
        return this.dataStore[this.dataStore.length-1];
    }

    toString() {
        let retStr = "";
        for (let i = 0; i < this.dataStore.length; ++i) {
            retStr += this.dataStore[i] + "\n";
        }
        return retStr;
    }

    empty() {
        return this.dataStore.length === 0
    }

}

export default Queue