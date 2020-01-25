class MSet {
    constructor() {
        this.items = {};
    }
    add(element) {
        if (!this.has(element)) {
            this.items[element] = element;
            return true;
        }
        return false;
    }
    delete(element) {
        if (this.has(element)) {
            delete this.items[element];
            return true;
        }
        return false;
    }
    has(element) {
        return this.items[element];
    }
    clear() {
        this.items = {};
    }
    size() {
    }
    values() {
    }
}
export { MSet };
//# sourceMappingURL=Set.js.map