import {defaultToString} from "../../util";
import ValuePair from "./ValuePair";

class SimpleHashTable {
    table = []

    constructor(public toString = defaultToString) {

    }

    loseloseHashCode(key) {
        if (typeof key === "number") {
            return key
        }

        const tableKey = this.toString(key)
        let hash = 0

        for (let i = 0; i < tableKey.length; i++) {
            hash += tableKey.charCodeAt(i)
        }

        return hash % 37
    }

    hashCode(key) {
        return this.loseloseHashCode(key)
    }

    put(key, value) {
        const position = this.hashCode(key)
        this.table[position] = new ValuePair(key ,value)
    }

    get(key){
        const valuePair = this.table[this.hashCode(key)]
        return valuePair.value
    }

    remove(key){
        const hash = this.hashCode(key)
        delete this.table[hash]
    }


}

export default SimpleHashTable

