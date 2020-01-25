import { defaultToString } from "../../util";
declare class SimpleHashTable {
    toString: typeof defaultToString;
    table: any[];
    constructor(toString?: typeof defaultToString);
    loseloseHashCode(key: any): number;
    hashCode(key: any): number;
    put(key: any, value: any): void;
    get(key: any): any;
    remove(key: any): void;
}
export default SimpleHashTable;
//# sourceMappingURL=SimpleHashTable.d.ts.map