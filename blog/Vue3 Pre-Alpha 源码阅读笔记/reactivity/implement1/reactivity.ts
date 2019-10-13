import {isObject, isNotUndefined, isUndefined} from 'ramda-adjunct'

const activeReactiveEffectStack = []
const targetMap = new WeakMap()

function track(target, type: "set" | "add" | "get", key: string) {
    const effect = activeReactiveEffectStack[activeReactiveEffectStack.length - 1]

    if (!effect) {
        return
    }

    let depsMap = targetMap.get(target)

    if (isUndefined(depsMap)) {
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }

    let dep = depsMap.get(key)

    if (isUndefined(dep)) {
        dep = new Set()
        depsMap.set(key, dep)
    }

    if (!depsMap.has(effect)) {
        dep.add(effect)
    }

}

function trigger(target, operation: "set" | "add", key: string) {
    // 取出 target 的依赖
    const depsMap = targetMap.get(target)

    // 因为 effects 是 Set, 所以多次添加相同的值也没关系
    const effects = new Set()

    // 如果 key 不是空的, 则尝试去取出所有 key 的 effect, 然后储存起来
    if(isNotUndefined(key)) {
        addRunners(effects, depsMap.get(key))
    }

    const run = (effect) => {
        effect()
    }

    effects.forEach(run)
}

function addRunners(effects, effectsToAdd) {
    if (isNotUndefined(effectsToAdd)) {
        effectsToAdd.forEach(effect => {
            effects.add(effect)
        })

    }
}


function createReactiveEffect(fn) {
    const effect = (...args) => {
        if (activeReactiveEffectStack.indexOf(effect) < 0) {
            try {
                activeReactiveEffectStack.push(effect)
                return fn(...args)
            } finally {
                activeReactiveEffectStack.pop()
            }
        }
    }

    return effect
}

function effect(cb) {
    const effectFn = createReactiveEffect(cb)

    effectFn()

    return effectFn
}

function set(target, key, value, receiver) {

    const oldValue = Reflect.get(target, key, receiver)

    const result = Reflect.set(target, key, value, receiver)

    if (isNotUndefined(oldValue) && oldValue === value) {
        return result
    }

    trigger(target, "set", key)

    return result
}

function get(target, key, receiver): any {
    const result = Reflect.get(target, key, receiver)

    track(target, "get", key)

    return result
}

const handler = {
    get,
    set
}

function reactive(o) {
   const observed = new Proxy(o, handler)

    targetMap.set(o, new Map())

    return observed
}

export {
    reactive, effect
}