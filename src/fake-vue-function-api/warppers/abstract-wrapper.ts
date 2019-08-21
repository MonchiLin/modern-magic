import Vue from 'vue';
import {proxy, hasOwn, def, warn} from '../utils';

interface Wrapper<V> {
    value: V
}

type Value<T> = Wrapper<T>

type BailTypes = Function | Map<any, any> | Set<any> | WeakMap<any, any> | WeakSet<any>





