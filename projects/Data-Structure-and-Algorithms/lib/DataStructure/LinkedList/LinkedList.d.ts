declare class LinkedList {
    eqFunction: any;
    count: number;
    head: any;
    constructor(eqFunction?: typeof simpleEQ);
    push(element: any): void;
    insert(element: any, position: any): void;
    getElementAt(index: any): any;
    removeAt(index: any): any;
    remove(element: any): any;
    indexOf(element: any): number;
    isEmpty(): boolean;
    size(): number;
    getHead(): any;
    toString(): string;
}
declare function simpleEQ(a: any, b: any): boolean;
declare class Node {
    element: any;
    next: any;
    constructor(element: any);
}
declare class DoubleLinkedList extends LinkedList {
    tail: any;
    push(element: any): void;
    removeAt(index: any): any;
    insert(element: any, index: any): void;
}
declare class DoubleNode extends Node {
    previous: DoubleNode;
    next: DoubleNode;
    element: any;
    constructor(element: any, next?: any, previous?: any);
}
export { LinkedList, simpleEQ, Node, DoubleLinkedList, DoubleNode, };
//# sourceMappingURL=LinkedList.d.ts.map