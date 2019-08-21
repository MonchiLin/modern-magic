import {Data} from "./component";

export type PropType<T> = PropConstructor<T> | PropConstructor<T>[];

type PropConstructor<T> = { new (...args: any[]): T & object } | { (): T };

type RequiredKeys<T, MakeDefaultRequired> = {
    [K in keyof T]: T[K] extends
        | { required: true }
        | (MakeDefaultRequired extends true ? { default: any } : never)
        ? K
        : never;
}[keyof T];

type OptionalKeys<T, MakeDefaultRequired> = Exclude<keyof T, RequiredKeys<T, MakeDefaultRequired>>;

type InferPropType<T> = T extends null
    ? any // null & true would fail to infer
    : T extends { type: null }
        ? any // somehow `ObjectContructor` when inferred from { (): T } becomes `any`
        : T extends ObjectConstructor | { type: ObjectConstructor }
            ? { [key: string]: any }
            : T extends Prop<infer V>
                ? V
                : T;


export type ExtractPropTypes<O, MakeDefaultRequired extends boolean = true> = {
    readonly [K in RequiredKeys<O, MakeDefaultRequired>]: InferPropType<O[K]>;
} & {
    readonly [K in OptionalKeys<O, MakeDefaultRequired>]?: InferPropType<O[K]>;
};

type PropOptions<T = any> = {
    type?: PropType<T> | null
    required?: boolean;
    default?: T | null | undefined | (() => T | null | undefined);
    validator?(value: any): boolean;
}

type Prop<T> = PropOptions<T> | PropType<T>

/**
 *
 * interface X {
 *    x1: string;
 *    x2: string;
 *    x3: string;
 * }
 * X1: "x1" | "x2" | "x3"
 * type X1 = keyof X
 *
 * X2: 签名与 X 相同
 * type X2 = { [K in keyof X]: string }
 *
 */
export type ComponentPropsOptions<P = Data> = {
    [K in keyof P]: Prop<P[K]> | null
}

type X = { (): string }