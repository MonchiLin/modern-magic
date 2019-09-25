declare class Queue {
    dataStore: {};
    count: number;
    headIndex: number;
    enqueue(e: any): void;
    size(): number;
    dequeue(): any;
    peek(): any;
    toString(): string;
    isEmpty(): boolean;
}
declare class DQueue {
    count: number;
    lowestCount: number;
    items: {};
    isEmpty(): boolean;
    addFront(element: any): void;
    addBack(element: any): void;
    removeFront(): any;
    removeBack(): any;
    peekFront(): any;
    peekBack(): any;
    clear(): void;
    size(): number;
    toString(): string;
}
export { Queue, DQueue };
//# sourceMappingURL=Queue.d.ts.map