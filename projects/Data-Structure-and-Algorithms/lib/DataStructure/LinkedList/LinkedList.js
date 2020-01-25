class LinkedList {
    constructor(eqFunction = simpleEQ) {
        this.eqFunction = null;
        this.count = 0;
        this.head = null;
        this.eqFunction = eqFunction;
    }
    push(element) {
        const node = new Node(element);
        let current;
        // 如果是初始化的时候, head 当时还是 null, 这时候我们把 head 赋值 node
        if (!this.head) {
            this.head = node;
        }
        else {
            // 这段代码的意思是使用 current 通过循环拿到链表中的最后一个节点
            current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = node;
        }
        this.count += 1;
    }
    insert(element, position) {
        const node = new Node(element);
        if (position === 0) {
            this.head = node;
        }
        else {
            const previous = this.getElementAt(position - 1);
            const current = previous.next;
            node.next = current;
            previous.next = node;
        }
        this.count += 1;
    }
    getElementAt(index) {
        if (index === 0) {
            return this.head;
        }
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }
    removeAt(index) {
        let current = this.head;
        if (index === 0) {
            this.head = current.next;
        }
        else {
            const previous = this.getElementAt(index - 1);
            current = previous.next;
            previous.next = current.next;
        }
        this.count -= 1;
        return current.element;
    }
    remove(element) {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }
    indexOf(element) {
        let current = this.head;
        for (let i = 0; i < this.count; i++) {
            if (!current) {
                return -1;
            }
            if (this.eqFunction(element, current.element)) {
                return i;
            }
            current = current.next;
        }
        return -1;
    }
    isEmpty() {
        return this.size() === 0;
    }
    size() {
        return this.count;
    }
    getHead() {
        return this.head;
    }
    toString() {
        if (this.head == null) {
            return '';
        }
        let objString = `${this.head.element}`;
        let current = this.head.next;
        for (let i = 1; i < this.size() && current != null; i++) {
            objString = `${objString},${current.element}`;
            current = current.next;
        }
        return objString;
    }
}
function simpleEQ(a, b) {
    return a === b;
}
class Node {
    constructor(element) {
        this.element = null;
        this.next = null;
        this.element = element;
    }
}
class DoubleLinkedList extends LinkedList {
    constructor() {
        super(...arguments);
        this.tail = null;
    }
    push(element) {
        const node = new DoubleNode(element);
        if (!this.head) {
            this.head = node;
            this.tail = node;
            this.head.next = this.tail;
            this.tail.previous = node;
        }
        else {
            this.tail.next = node;
            node.previous = this.tail;
            this.tail = node;
        }
        this.count += 1;
    }
    removeAt(index) {
        this.count -= 1;
        if (index === 0) {
            const current = this.head;
            this.head = this.tail;
            return current;
        }
        const previous = this.getElementAt(index - 1);
        const current = previous.next;
        previous.next = current.next;
        current.next.previous = previous;
        return current;
    }
    insert(element, index) {
        const node = new DoubleNode(element);
        this.count += 1;
        if (index === 0) {
            if (!this.head) {
                this.head = node;
                this.tail = node;
            }
            else {
                node.next = this.head;
                this.head.previous = node;
                this.head = node;
            }
            return;
        }
        // 如果是最后一项, 注意这一项是没有值的
        if (index === this.count) {
            // 将 tail.next 指向 node
            this.tail.next = node;
            // node 上一项指向 tail
            node.previous = this.tail;
            // 重新指定 tail
            this.tail = node;
            return;
        }
        // 找出当前上一个元素
        const previous = this.getElementAt(index - 1);
        // 找出要被代替的元素
        const current = previous.next;
        node.previous = previous;
        current.previous = node;
        previous.next = node;
        node.next = current;
    }
}
class DoubleNode extends Node {
    constructor(element, next, previous) {
        super(element);
        this.element = element;
        this.next = next;
        this.previous = previous;
    }
}
class CircularLinkedList extends LinkedList {
}
export { LinkedList, simpleEQ, Node, DoubleLinkedList, DoubleNode, };
//# sourceMappingURL=LinkedList.js.map