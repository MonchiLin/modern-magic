export declare type ICompareFunction<T> = (a: T, b: T) => number;
export declare type IEqualsFunction<T> = (a: T, b: T) => boolean;
export declare type IDiffFunction<T> = (a: T, b: T) => number;
export declare const DOES_NOT_EXIST = -1;
export declare enum Compare {
    LESS_THAN = -1,
    BIGGER_THAN = 1,
    EQUALS = 0
}
export declare function lesserEquals<T>(a: T, b: T, compareFn: ICompareFunction<T>): boolean;
export declare function biggerEquals<T>(a: T, b: T, compareFn: ICompareFunction<T>): boolean;
export declare function defaultCompare<T>(a: T, b: T): number;
export declare function defaultEquals<T>(a: T, b: T): boolean;
export declare function defaultToString(item: any): string;
export declare function swap(array: any[], a: number, b: number): void;
export declare function reverseCompare<T>(compareFn: ICompareFunction<T>): ICompareFunction<T>;
export declare function defaultDiff<T>(a: T, b: T): number;
export declare function isNull(v: any): boolean;
export declare const BalanceFactor: {
    UNBALANCED_RIGHT: number;
    SLIGHTLY_UNBALANCED_RIGHT: number;
    BALANCED: number;
    SLIGHTLY_UNBALANCED_LEFT: number;
    UNBALANCED_LEFT: number;
};
//# sourceMappingURL=util.d.ts.map