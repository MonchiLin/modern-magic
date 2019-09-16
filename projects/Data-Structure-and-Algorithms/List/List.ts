
export default class List {
    listSize = 0;

    pos = 0

    dataStore = []

    clear() {
        this.dataStore = []
        this.listSize = 0
        this.pos = 0
    }

    find(element) {
        return this.findByPredicate((e => e === element))
    }

    findByPredicate(cb) {
        for (let i = 0; i < this.dataStore.length; i++) {
            if (cb(this.dataStore[i])) {
                return i
            }
        }

        return -1
    }

    map(cb) {
        const list = new List()

        for (let i = 0; i < this.dataStore.length; i++) {
            list.append(cb(this.dataStore[i]))
        }

        return list
    }

    reduce(cb, initValue) {
        for (let i = 0; i < this.dataStore.length; i++) {
            initValue = cb(initValue, this.dataStore[i])
        }

        return initValue
    }

    forEach(cb) {
        this.map(cb)
    }

    toString() {
        return this.reduce((acc, curr) => acc + curr, "")
    }

    insert(elemnt, after) {
        const afterPos = this.find(after)

        if (afterPos < -1) {
            return false
        }

        this.dataStore.splice(afterPos, 0, elemnt)
        this.listSize += 1

        return true
    }

    append(element) {
        this.dataStore[this.listSize] = element
        this.listSize += 1
    }

    filter(cb) {
        const dataStore = []
        for (let e of this.dataStore) {
            if (cb(e)) {
                dataStore.push(e)
            }
        }

        return dataStore
    }

    remove(element) {
        const foundAt = this.find(element)

        if (foundAt > -1) {
            this.dataStore.splice(foundAt, 1)
            this.listSize -= 1
            return true
        }

        return false
    }

    front() {
        this.pos = 0
    }

    end() {
        this.pos = this.listSize - 1
    }

    prev() {
        if (this.pos <= 0) {
            return
        }

        this.pos -= 1
    }

    next() {
        if (this.pos >= this.listSize - 1) {
            return
        }

        this.pos += 1
    }


    get length() {
        return this.listSize
    }

    currPos() {
        return this.pos
    }

    moveTo(position) {
        this.pos = position
    }

    getElement() {
        return this.dataStore[this.pos]
    }

    contains(element) {
        const foundAt = this.find(element)

        return foundAt > -1;
    }


}