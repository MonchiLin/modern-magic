export default class List {
    listSize: number;
    pos: number;
    dataStore: any[];
    clear(): void;
    find(element: any): number;
    findByPredicate(cb: any): number;
    map(cb: any): List;
    reduce(cb: any, initValue: any): any;
    forEach(cb: any): void;
    toString(): any;
    insert(elemnt: any, after: any): boolean;
    append(element: any): void;
    filter(cb: any): any[];
    remove(element: any): boolean;
    front(): void;
    end(): void;
    prev(): void;
    next(): void;
    get length(): number;
    currPos(): number;
    moveTo(position: any): void;
    getElement(): any;
    contains(element: any): boolean;
}
//# sourceMappingURL=List.d.ts.map