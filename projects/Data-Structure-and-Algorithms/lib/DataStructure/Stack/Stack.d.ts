declare class Stack {
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
    size: number;
    items: {};
    readonly empty: boolean;
    static fromArray(arr: any[]): Stack;
    static fromFilter(arr: any[], cb: any): Stack;
    static fromArrayReverse(arr: any[]): Stack;
    toString(split?: string): string;
    clear(): void;
    pop(): any;
    push(element: any): void;
    /**
     * [窥视]
     * 返回栈顶, 但是不会删除栈顶
     */
    peek(): any;
}
export default Stack;
//# sourceMappingURL=Stack.d.ts.map