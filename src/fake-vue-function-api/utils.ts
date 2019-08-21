import Vue from 'vue';

const toString = (x: any) => Object.prototype.toString.call(x);

const hasSymbol = typeof Symbol === 'function' && Symbol.for;

export const noopFn: any = (_: any) => _;

const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noopFn,
    set: noopFn,
}

function proxy(target: any, key: string, {get, set}: { get?: Function; set?: Function }) {
    sharedPropertyDefinition.get = get || noopFn;
    sharedPropertyDefinition.set = set || noopFn;
    Object.defineProperty(target, key, sharedPropertyDefinition);
}

function def(obj: Object, key: string, val: any, enumerable?: boolean) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true,
    });
}

const hasOwnProperty = Object.prototype.hasOwnProperty

const hasOwn = (obj: Object | any[], key: string) => {
    return hasOwnProperty.call(obj, key)
}

function assert(condition: any, msg: string) {
    if (!condition) {
        throw new Error(`[fake-vue-function-api] ${msg}`)
    }
}

function isArray<T>(x: unknown): x is T[] {
    return Array.isArray(x);
}

function isObject(val: unknown): val is Record<any, any> {
    return val !== null && typeof val === 'object';
}

function isPlainObject<T extends Object = {}>(x: unknown): x is T {
    return toString(x) === '[object Object]';
}

function isFunction(x: unknown): x is Function {
    return typeof x === 'function';
}

function warn(msg: string, vm?: Vue) {
    // @ts-ignore
    Vue.util.warn(msg, vm);
}

function logError(err: Error, vm: Vue, info: string) {
    // @ts-ignore
    if (process.env.NODE_ENV !== 'production') {
        warn(`Error in ${info}: "${err.toString()}"`, vm);
    }

    if (typeof window !== "undefined" && typeof console !== "undefined") {
        console.error(err)
    } else {
        throw err
    }
}

export {
    hasSymbol,
    proxy,
    def,
    hasOwn,
    assert,
    isArray,
    isObject,
    isPlainObject,
    isFunction,
    warn
}