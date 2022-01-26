# 深入 VUE-RX 源码

* \[创建时间\]: 2019/2/15
* \[更新时间\]: 2019/3/31
* \[keyword\]: Vue，Vue Directive，Javasctipt，RxJS，源码阅读

> 这篇文章是我 19 年的时候写的，现在已经是 20 年了，vue-rx 又做了一些更新，笔者水平也提升了一些，所以准备重构（refactor）一下这篇文章，最主要的原因还是因为某次面试面试官问笔者这篇文章，笔者居然懵了，有兴趣的小伙伴可以在 github 上看到这篇文章历史版本（俗称：黑历史）



笔者写源码分析的时只想将核心部分写下来，所以希望读者读之前先掌握 Vue 中下面几个功能的用法，文章中不会对基础做太多讲解：

[Vue.mixin](https://cn.vuejs.org/v2/api/#Vue-mixin) 

[Vue.\$options](https://cn.vuejs.org/v2/api/#vm-options)

[Vue.use](https://cn.vuejs.org/v2/api/#Vue-use)

[Vue.directive](https://cn.vuejs.org/v2/api/#Vue-directive)

并且读这篇文章之前读者应该使用过 `vue-rx` 或者 `rxjs` 开发过一个以上的项目，否则读这篇文章对读者的意义不是很大。

本文对应的代码仓库：https://github.com/MonchiLin/impl-yourself-vue-rx

vue-rx 代码仓库：https://github.com/vuejs/vue-rx

[impl-yourself-vue-rx](https://github.com/MonchiLin/impl-yourself-vue-rx) 仓库里 `src` 均可使用 `vue serve xx.vue` 来直接启动看效果

注1：本文会从每个大函数入手，先根据功能来自行实现一个简单版本，最后逐行（并不）分析源代码。

注2：下文中 `vm.xx = xx` vm 为上文中的 [组件的实例]([https://cn.vuejs.org/v2/guide/instance.html#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA-Vue-%E5%AE%9E%E4%BE%8B](https://cn.vuejs.org/v2/guide/instance.html#创建一个-Vue-实例))，这是 `vue` 中约定俗成的一个术语。



## 阅读这篇文章你会得到什么？

vue 指令的开发

vue 指令如何与 rxjs 结合

学习一个成熟的 vue 指令是如何开发的



## 从 Vue.use 开始

从 Readme 我们可以看到, vue-rx 在现代 JS 模块( ES6 module )系统中用法为
```javascript
import Vue from 'vue'
import VueRx from 'vue-rx'

Vue.use(VueRx)
```
然后, 根据 [Vue.use](https://cn.vuejs.org/v2/api/#Vue-use) 文档可知 `Vue.use` 函数有两种用法: 
1. 传入一个函数, 把 Vue 作为参数传入这个函数, 并且调用它.
2. 传入一个对象, 会调用传入对象的 install 函数
这时我们打开 [index.jsx](https://github.com/vuejs/vue-rx/blob/master/src/index.jsx) 可以看到下面部分，`vue-rx` 使用的是第 二 种方法

```javascript
export default function VueRx (Vue) {
  install(Vue)
  Vue.mixin(rxMixin)
  Vue.directive('stream', streamDirective)
  Vue.prototype.$watchAsObservable = watchAsObservable
  Vue.prototype.$fromDOMEvent = fromDOMEvent
  Vue.prototype.$subscribeTo = subscribeTo
  Vue.prototype.$eventToObservable = eventToObservable
  Vue.prototype.$createObservableMethod = createObservableMethod
  Vue.config.optionMergeStrategies.subscriptions = Vue.config.optionMergeStrategies.data
}

// auto install
if (typeof Vue !== 'undefined') {
  Vue.use(VueRx)
}
```
可以看到这个文件默认导出一个函数, 而这个函数接受一个 Vue , 这正是我们上面提到的 Vue.use 第二种使用形式.

然后我们看最后两行

```javascript
if (typeof Vue !== 'undefined') {
  Vue.use(VueRx)
}
```

如果 `Vue` 不是 `undefined` 那么就意味着 `Vue` 是全局变量, 这也就意味着 **这里的 Vue 是通过传统的 script 标签引入的**，然后调用全局变量的 Vue.use, 并且传入 `VueRx`，这也是默认导出 (export default) 的函数为什么起名为`VueRx` 的原因，

如果执行到这段代码的 if 语句里面, 则表示这里的 `Vue` 是通过传统的 script 标签引入的, 这样 vue-rx 就可以兼容 现代 JS 模块系统 和 通过 script 标签引入。

接下来我们来看 VueRx 函数做了什么。



## VueRx 函数

```javascript
export default function VueRx (Vue) {
  install(Vue)
  Vue.mixin(rxMixin)
  Vue.directive('stream', streamDirective)
  Vue.prototype.$watchAsObservable = watchAsObservable
  Vue.prototype.$fromDOMEvent = fromDOMEvent
  Vue.prototype.$subscribeTo = subscribeTo
  Vue.prototype.$eventToObservable = eventToObservable
  Vue.prototype.$createObservableMethod = createObservableMethod
  Vue.config.optionMergeStrategies.subscriptions = Vue.config.optionMergeStrategies.data
}
```



## install(Vue)

[源码位置](https://github.com/vuejs/vue-rx/blob/master/src/util.js#L7)

```javascript
export let Vue
export let warn = function () {}

// NOTE(benlesh): the value of this method seems dubious now, but I'm not sure
// if this is a Vue convention I'm just not familiar with. Perhaps it would
// be better to just import and use Vue directly?
export function install (_Vue) {
  Vue = _Vue
  warn = Vue.util.warn || warn
}
```



### 总结

`install()` 方法为这个文件导出的 Vue 和 warn 对象赋值。

注释的意思是说：这种行为似乎是 Vue 的一种约定, 但是却不一定好, 或许应该使用 `import vue` 来代替。



## Vue.mixin(rxMixin) 

[源码位置](https://github.com/vuejs/vue-rx/blob/master/src/mixin.js)

我们看到, 这个文件 **默认导出** 了一个对象, 而这个对象拥有两个 vue 的生命周期函数, 这两个函数最终都会被混入 (mixin) 到所有 vue 的实例中.


### 概览

先来说说这段代码实现了什么效果吧：

1. 允许通过 domStreams 传入一个字符串数组，然后以字符串的名称为变量名创建一个对应的 `Subject`，然后将这个 `Subject` 挂载在组件实例上(通过 this.subjectName) 访问。

   ```javascript
   new Vue({
     domStreams: ['plus$']
   })
   // 等价于 vm.plus$ = new Subject()
   ```

   

2. 允许通过 observableMethods 传入一个字符串数组，然后以字符串的名称为变量名创建一个对应的 `Observable`。

   ```javascript
   new Vue({
     observableMethods: ['plus$']
   })
   // 等价于 vm.plus$ = new Observable()
   // 下面是源代码，我们可以看出源码做的事情就是在 vm 上挂载开发者传进来的属性，值为 vm.$createObservableMethod 创建的，重点主要在 $createObservableMethod，所以笔者会在 $createObservableMethod 来写出它的实现和源码分析，这里就不赘述了
   
   // 储存传入的 observableMethods
   const observableMethods = vm.$options.observableMethods
   
   if (observableMethods) {
     if (Array.isArray(observableMethods)) {
       observableMethods.forEach(methodName => {
         vm[methodName + '$'] = vm.$createObservableMethod(methodName)
       })
     } else {
       Object.keys(observableMethods).forEach(methodName => {
         vm[observableMethods[methodName]] = vm.$createObservableMethod(methodName)
       })
     }
   }
   ```

   

3. 允许通过 subscriptions 传入一个**对象**或者一个**返回对象的函数**，这里先理解成传入一个对象即可，然后把对象的属性挂载在 vm 上面，例如下方代码例子，即可以用通过 `this.count` 访问，对象的属性的值挂载在 `vm.$observables` 上面，方便开发者手动访问。

   注意，对象属性的值应该为 `Observer` 类似下面这种结构：

   ```javascript
   new Vue({
     subscriptions: {
       count: new Subject()
         .pipp(scan(total, change) => total + change)
     }
   })
   
   // 等价于
   // 在组件实例上挂载 count 这个属性
   vm.count = undefined
   // 在 subscriptions.count 对应的值触发更新时将值赋值给 vm.count
   const obs = new Subject()
     .pipp(scan(total, change) => total + change)
   obs.subscribe(val => vm.count = val)
   
   vm.$observables = {}
   // 保存 observable
   vm.$observables["count"] = obs
   ```

   

3. 自动取消订阅，这个功能是和上面那条（第三条）对应的，这段代码量比较少，就不单独在 **实现** 部分写了。

   ```javascript
   const subscription =  new Subject()
     .pipp(scan(total, change) => total + change)
     .subscribe(val => vm.count = val)
   // subscribe 方法返回一个 subscription 对象，这个对象用于取消订阅。
   // 跟着这个思路，若是要实现自动取消订阅就需要一个储存 subscription 对象集的地方
   // 例如我们挂载一个 Subscription 对象放在 vm 上
   vm._subscriptions = new Subscription()
   
   // 接着利用 Subscription.add 实例方法，可以让一个 Subscription 对象储存多个 Subscription 对象
   vm._subscriptions.add(subscription)
   
   // 最后只需要 Subscription.unsubscribe() 即可
   vm._subscriptions.unsubscribe()
   ```

   



### 实现

#### domStreams

`domStreams` 实现的代码已经在下面了，注释应该也足够完善，如果还有疑问请留言。

笔者将写好的代码放在了代码仓库里，如果小伙伴们自己写的时候发现有问题可以参考这个文件，包含了实现和使用的例子，[文件地址](https://github.com/MonchiLin/impl-yourself-vue-rx/blob/master/src/rx-domStream.vue)

```javascript
export default {
  // 在 
  domStreams: ["plus$", "minus$"],
  mixins: [
    {
      created() {
        const vm = this
        // 获取 domStreams，此处的 domStreams 值为 ["plus$", "minus$"]
        const domStreams = vm.$options.domStreams
        domStreams.forEach(key => {
          // 遍历 domStreams，将 vm[key] 赋值为 new Subject
          vm[key] = new Subject()
        })
        // 执行完上面这段 vm["plus$"] 和 vm["minus$"] 的值就变成了 new Subject
      }
    }
  ],
}
```



#### subscriptions

`subscriptions` 实现的代码已经在下面了，注释应该也足够完善，如果还有疑问请留言。

笔者将写好的代码放在了代码仓库里，如果小伙伴们自己写的时候发现有问题可以参考这个文件，包含了实现和使用的例子，[文件地址](https://github.com/MonchiLin/impl-yourself-vue-rx/blob/master/src/rx-mixin-subscriptions.vue)

```vue
<template>
  <div>
    <button @click="plus$.next($event)">增加</button>
    <span> >> {{ counter }} << </span>
  </div>
</template>

<script>
import {
  map,
  scan,
  startWith
} from "rxjs/operators";
import {
  Subject
} from "rxjs";
import Vue from 'vue'

const plus$ = new Subject()

export default {
  data() {
    return {
      plus$: plus$
    }
  },
  // 通过 subscriptions 传入 [counter]
  subscriptions: {
    counter: plus$
      .pipe(
        map(() => 1),
        startWith(0),
        scan((total, change) => total + change)
      )
  },
  mixins: [{
    created() {
      const vm = this
      // 获取 subscriptions, 这里我们假设 subscriptions = [{counter: Observable}]
      const subscriptions = vm.$options.subscriptions
      vm.$observables = {}

      Object.keys(subscriptions)
        .forEach(key => {
          // 在 vm 上创建一个响应式的属性，这里等价于 Vue.util.defineReactive(vm, "counter", undefined)
          Vue.util.defineReactive(vm, key, undefined)
          vm.$observables[key] = subscriptions[key]

          // 然后我们订阅 Observable, 并且在发生更新的时候赋值给 vm["counter"]
          subscriptions[key]
            .subscribe(e => {
              vm[key] = e
            })
        })

    }
  }],
}
</script>
```



### 源码解析

```javascript
export default {
  created() {
    const vm = this
    // 处理 domStreams, 参考上方文章
    const domStreams = vm.$options.domStreams
    // 做空值处理
    if (domStreams) {
      domStreams.forEach(key => {
        vm[key] = new Subject()
      })
    }

    const observableMethods = vm.$options.observableMethods
    if (observableMethods) {
      if (Array.isArray(observableMethods)) {
        observableMethods.forEach(methodName => {
          vm[methodName + '$'] = vm.$createObservableMethod(methodName)
        })
      } else {
        Object.keys(observableMethods).forEach(methodName => {
          vm[observableMethods[methodName]] = vm.$createObservableMethod(methodName)
        })
      }
    }

    let obs = vm.$options.subscriptions
    // 这里判断 obs 如果是函数就先执行下
    if (typeof obs === 'function') {
      obs = obs.call(vm)
    }
    // 做空值处理  
    if (obs) {
      // 声明 $observables 用于储存 observable
      vm.$observables = {}
      // 声明 _subscription 用于储存 subscription 之后方便取消订阅
      vm._subscription = new Subscription()
      Object.keys(obs).forEach(key => {
        // 使值变成响应式  
        defineReactive(vm, key, undefined)
        // 在 $observables 存一份
        const ob = vm.$observables[key] = obs[key]
        // 处理 ob 不是 observable 的情况
        if (!isObservable(ob)) {
          warn(
            'Invalid Observable found in subscriptions option with key "' + key + '".',
            vm
          )
          return
        }
        // 保存 subscription
        vm._subscription.add(obs[key].subscribe(value => {
          // 在每次流更新时将值赋给 vm[key]
          vm[key] = value
        }, (error) => {
          throw error
        }))
      })
    }
  },

  // 在组件的 beforeDestroy 取消订阅
  beforeDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  }
}
```



## Vue.directive('stream', streamDirective) 

[streamDirective 源码](https://github.com/vuejs/vue-rx/blob/master/src/directives/stream.js)

[v-stream 文档](https://github.com/vuejs/vue-rx/blob/master/README.md#v-stream-streaming-dom-events)

先来看一下用法

```
<button v-stream:click="plus$">+</button>
```

格式：v-stream + 事件名(click) = Subject(plus$)


### 实现

`v-stream` 实现的代码已经在下面了，注释应该也足够完善，如果还有疑问请留言。

笔者将写好的代码放在了代码仓库里，如果小伙伴们自己写的时候发现有问题可以参考这个文件，包含了实现和使用的例子

[第一个版本文件地址](https://github.com/MonchiLin/impl-yourself-vue-rx/blob/master/src/v-stream-1.vue)

[第二个版本文件地址](https://github.com/MonchiLin/impl-yourself-vue-rx/blob/master/src/v-stream-2.vue)

[第三个版本文件地址](https://github.com/MonchiLin/impl-yourself-vue-rx/blob/master/src/v-stream-3.vue)

根据基础用法实现

```javascript
// <button v-stream:click="plus$">+</button>

Vue.directive('stream', {
  bind: function(el, binding, vNode, oldVnode) {
    // 传入的 subject
    const subject = binding.value
    // 事件名称
    const eventName = binding.arg
    // 创建一个 Subscription 
    el._subscription = new Subscription()
    // 保存 subscibe 返回的 subscription 
    el._subscription.add(
      fromEvent(el, eventName)
      .subscribe(e => subject.next(e))
    )
  },
  unbind(el, binding) {
    // 避免内存泄漏，unbind 生命周期取消订阅
    el._subscription.unsubscribe()
  }
})
```



好，现在已经实现了最基础的功能，让我们继续实现第二种用法

```javascript
// <button v-stream:click="{ subject: plus$, data: someData }">+</button>

export default {
  directives: {
    stream: {
      bind: function(el, binding, vNode, oldVnode) {
        // handle = { subject, data }
        let handle = binding.value
        const eventName = binding.arg

        // 放在这里方便读者看，这个函数是以鸭子类型的思想来判断对象是否为 observer
        function isObserver(subject) {
          return subject && (
            typeof subject.next === 'function'
          )
        }

        // 处理通过 v-stream="plus$" 传入进来的 subject
        if (isObserver(handle)) {
          // 包装一层，将 v-stream="plus$" 和 
          // v-stream="{ subject: plus$, data: someData }" 两种数据结构统一处理
          // 此时 handle 数据结构变成了 { subject, data }
          handle = {
            subject: handle
          }
        }

        // 还记得 rxMixin 的功能之一吗？ 没错就是在 vm 上面挂载 _subscription 对象
        // 这里我们单独写主要是为了实现 v-stream
        el._subscription = new Subscription()

        const subject = handle.subject

        // 储存 subscription 对象
        el._subscription.add(
          // 将 event 和 data 都传递给开发者
          fromEvent(el, eventName)
          .subscribe(e => subject.next({
            event: e,
            data: handle.data + new Date().getTime()
          }))
        )
      },
      unbind(el, binding) {
        // 取消订阅
        el._subscription.unsubscribe()
      }
    }
  }
}
```



第三种用法，传入额外的 `option` 给原生的 `addEventListener`

```html
<button v-stream:click="{
  subject: plus$,
  data: someData,
  options: { once: true, passive: true, capture: true }
}">+</button>
```

康过上面代码的小伙伴都知道了，我们使用的是 `rxjs`提供的`fromEvent`函数，这个函数本身就是依赖 `addEventListener` 的，从 [文档](https://rxjs-dev.firebaseapp.com/api/index/function/fromEvent) 的 `Parameters` (参数) 部分就可以看到，如果传入了三个及以上的参数就会把第三个参数直接传递给 `addEventListener`，下面我们做一些小的改造来让 `v-stream` 支持这个特性

```javascript
// 如果 handle 存在 options 则将 options 传给 fromEvent
const fromEventArgs = handle.options ? [el, eventName, handle.options] : [el, eventName]
// 储存 subscription 对象
el._subscription.add(
  fromEvent(...fromEventArgs)
  // 将 event 和 data 都传递给开发者
  .subscribe(e => subject.next({
    event: e,
    data: handle.data + new Date().getTime()
  }))
)
```



好，现在我们已经实现了自己的 `v-stream`，基于上面的核心理念，我们开始看 `vue-rx` 是如何实现 `v-stream` 的 (注意打开源码哦：[streamDirective 源码](https://github.com/vuejs/vue-rx/blob/master/src/directives/stream.js))


### 源码解析

```javascript
import {
  isObserver,
  warn,
  getKey
} from '../util'
import {
  fromEvent
} from 'rxjs'

export default {

  bind(el, binding, vnode) {
    let handle = binding.value
    const event = binding.arg
    const streamName = binding.expression
    // 储存修饰符
    const modifiers = binding.modifiers

    if (isObserver(handle)) {
      handle = {
        subject: handle
      }
    } else if (!handle || !isObserver(handle.subject)) {
      // 处理传入错误的参数
      warn(
        'Invalid Subject found in directive with key "' + streamName + '".' +
        streamName + ' should be an instance of Subject or have the ' +
        'type { subject: Subject, data: any }.',
        vnode.context
      )
      return
    }

    // 定义了一个包含 stop 和 prevent 的处理函数，用于处理 v-stram.stop.prevent="plus$" 的情况
    const modifiersFuncs = {
      stop: e => e.stopPropagation(),
      prevent: e => e.preventDefault()
    }

    // 接上面, 如果定义的对象里正好包含了 通过指令传入的 事件属性, 那么就将这个属性储存到一个新对象
    // 方便之后对使用者传入的事件选项做处理
    var modifiersExists = Object.keys(modifiersFuncs).filter(
      key => modifiers[key]
    )

    const subject = handle.subject

    // 这里首先判断 .next 函数是否存在, 如果存在就用 .next 函数, 如果不存在就用 .onNext 函数
    // 这里是一种兼容性做法, onNext 是 rxjs 很久很久之前的 next 函数, 在 rxjs6 已经被废弃了
    // 所以这里可以无视, 我们继续往下看, 拿到函数后, 使用 bind 将 this 绑定到 subject, 防止之后使用了错误的 this.
    const next = (subject.next || subject.onNext).bind(subject)

    // 如果使用 v-stram.native="plus$" 去监听事件，则会通过 $eventToObservable 
    // 转换成原生事件，参考 $eventToObservable 源码解析部分

    // vnode.componentInstance 是使用了这个指令的组件实例，也可以通过 vnode.context 获取
    if (!modifiers.native && vnode.componentInstance) {
      // 将 subscription 对象储存在 handle 对象上
      // 注意，这里与笔者的实现是有区别的
      handle.subscription = vnode.componentInstance.$eventToObservable(event).subscribe(e => {
        // 处理事件冒泡和默认行为
        modifiersExists.forEach(mod => modifiersFuncs[mod](e))
        next({
          event: e,
          data: handle.data
        })
      })
    } else {
      const fromEventArgs = handle.options ? [el, event, handle.options] : [el, event]
      handle.subscription = fromEvent(...fromEventArgs).subscribe(e => {
        modifiersExists.forEach(mod => modifiersFuncs[mod](e))
        next({
          event: e,
          data: handle.data
        })
      })
    }


    // 源码这里是没有的，单独伶出来给读者看
    function getKey(binding) {
      // 将 事件名称(binding.arg) 和 修饰符（.native .stop）转换成字符串
      // 例如 v-stream:click.native="plus$" 会转换成 "click:native"
      // v-stream:click="plus$" 会转换成 "click"
      return [binding.arg].concat(Object.keys(binding.modifiers)).join(':')
    }


    // 最后将其储存在 _rxHandles 中
    // store handle on element with a unique key for identifying
    // multiple v-stream directives on the same node
    ;
    (el._rxHandles || (el._rxHandles = {}))[getKey(binding)] = handle
  }

  // 触发指令的 update 生命周期  
  update(el, binding) {
    const handle = binding.value
    const _handle = el._rxHandles && el._rxHandles[getKey(binding)]
    if (_handle && handle && isObserver(handle.subject)) {
      // 更新 data，给不记得的小伙伴提个醒，用于更新下面这种方式传进来的 data
      // <button v-stream:click="{ subject: plus$, data: someData }">+</button> 
      _handle.data = handle.data
    }
  },

  // 取消订阅    
  unbind(el, binding) {
    const key = getKey(binding)
    const handle = el._rxHandles && el._rxHandles[key]
    if (handle) {
      if (handle.subscription) {
        handle.subscription.unsubscribe()
      }
      el._rxHandles[key] = null
    }
  }
}
```



## $watchAsObservable

[源码文件](https://github.com/vuejs/vue-rx/blob/master/src/methods/watchAsObservable.js)

源码分析：

```javascript
import { Observable, Subscription } from 'rxjs'

export default function watchAsObservable (expOrFn, options) {
  const vm = this
  // 创建一个新的 Observable
  const obs$ = new Observable(observer => {
    // 声明一个变量用于取消 watch, 这里还未赋值
    let _unwatch

    // 封装原生的 $watch 函数
    const watch = () => {
      // 参考文档用法: https://cn.vuejs.org/v2/api/#vm-watch
      // $watch 函数会返回一个用于取消 watch 的函数
      _unwatch = vm.$watch(expOrFn, (newValue, oldValue) => {
        // watch 方法回调时, 调用 observer.next 
        observer.next({ oldValue: oldValue, newValue: newValue })
      }, options)
    }

    // 这里设计的很巧妙, vm._data 实际上就是 $data, 也就是你声明的 data
    // 我们都知道 Vue 在 beforeCreated 生命周期是无法获取到 data 的
    // 这就会导致 $watch 无法工作, 所以就等到 created 生命周期去执行 watch 函数
    // 于是下面使用了 $once 函数, $once 与 $on 功能很像, 但是 $onec 只会执行一次
    // 并且这里使用了 hook:created, 相信聪明的小伙伴从名字就能看出来, 这里是监听 created 生命周期
    // 这种用法我们一般很少用到, 是一种 vue 内部的用法, 官方文档也有提到
    // https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E7%A8%8B%E5%BA%8F%E5%8C%96%E7%9A%84%E4%BA%8B%E4%BB%B6%E4%BE%A6%E5%90%AC%E5%99%A8

    // if $watchAsObservable is called inside the subscriptions function,
    // because data hasn't been observed yet, the watcher will not work.
    // in that case, wait until created hook to watch.
    if (vm._data) {
      watch()
    } else {
      vm.$once('hook:created', watch)
    }


    // 最后返回一个函数用于取消 watch
    // 注意这里的 _unwatch && _unwatch(), 这意味着如果 _unwatch 为被赋值就不会执行 _unwatch()

    // 这里插播一个 rxjs 小知识点, 下面是 observer 部分的返回类型 TeardownLogic 的签名
    // export type TeardownLogic = Unsubscribable | Function | void;
    // Unsubscribable: 一个带有 unsubscribe 方法的对象
    // Function: 任意函数
    // void: 无返回值
    
    // 如果你在 new Observable 的 observer 参数部分手动返回一个 Subscription 对象, 那么调用
    // 这个 Observable.subscribe 方法返回的 Subscription 对象的 unsubscribe 方法时将会执行你返回执行你传入的函数

    // 如果你在 new Observable 的 observer 参数部分手动返回一个函数, 那么调用
    // 这个 Observable.subscribe 方法返回的 Subscription 对象的 unsubscribe 方法时将会执行你返回的函数

    // Returns function which disconnects the $watch expression
    return new Subscription(() => {
      _unwatch && _unwatch()
    })
  })

  // 然后我们把这个 Observable 返回出去, 就可以实现官方用法中的效果了.
  return obs$
}
```

## $fromDOMEvent

[源码位置](https://github.com/vuejs/vue-rx/blob/master/src/methods/fromDOMEvent.js)

源码解析:
```javascript
import { Observable, Subscription, NEVER } from 'rxjs'

export default function fromDOMEvent (selector, event) {
  // 处理 window 不存在的情况
  if (typeof window === 'undefined') {
    // TODO(benlesh): I'm not sure if this is really what you want here,
    // but it's equivalent to what you were doing. You might want EMPTY
    return NEVER
  }

  const vm = this
  // 获取 dom 的根元素, 也就是我们写下面这段代码中的 <html></html>
  // <html>
  // <body></body>
  // </html>
  // doc 变量的作用, 也就是这个函数的工作原理, 为什么上面介绍说这个函数可以在 DOM 渲染前生效
  // 因为事件监听的 DOM 是 html, 就意味着无论何时只要你触发这个事件都会执行传入的 处理事件(下面的 listener)
  // 可以看出这是一个全局的监听事件, 上面介绍有提到 fromDOMEvent 函数只会影响到当前组件的内部元素, 如何只影响组件内部
  // 就要看下面的 listener 函数了
  const doc = document.documentElement
  // 创建一个 Observable
  const obs$ = new Observable(observer => {
    function listener (e) {
      // 首先判断, 如果 vm.$el 不存在就退出函数执行
      // 因为 vm.$el 不存在就因为这 vm 已经不被挂载在 dom 上了
      if (!vm.$el) return
      // 这里是处理 selector 参数为 null 的情况, 如果 selector 为 null 并且当前事件的 target 是当前组件实例的 dom
      // 就把事件对象传入 next 方法
      if (selector === null && vm.$el === e.target) return observer.next(e)

      // 这里从当前组件实例中去 querySelectorAll, 这意味着 selector 只能从当前组件实例中匹配
      var els = vm.$el.querySelectorAll(selector)
      // 取出事件的 target
      var el = e.target
      // 循环上面 querySelectorAll 匹配到的 dom
      for (var i = 0, len = els.length; i < len; i++) {
        // 如果 dom 匹配则把事件对象传入 next 方法
        if (els[i] === el) return observer.next(e)
      }
    }

    // 将上面的 listener 作为事件处理函数传入 addEventListener
    doc.addEventListener(event, listener)

    // 参考 watchAsObservable 对类似代码的解释
    // Returns function which disconnects the $watch expression
    return new Subscription(() => {
      doc.removeEventListener(event, listener)
    })
  })

  return obs$
}
```




## $subscribeTo

[源码位置](https://github.com/vuejs/vue-rx/blob/master/src/methods/subscribeTo.js)

源码解读:

```JavaScript
import { Subscription } from 'rxjs'
// 还记得 rxMixin 中的 _subscription 吗？没错，又是它，我们使用 vm.$subscribeTo 进行订阅的时候
// 返回的 subscription 对象会被添加到 vm._subscription 从而实现自动取消订阅

export default function subscribeTo (observable, next, error, complete) {
  // 调用传入的 observable, 以及其参数, 得到 subscription
  const subscription = observable.subscribe(next, error, complete)
  // 这里代码避开上去复杂了一点, 其实它的目的就是储存这个 subscription, 然后在某个时机取消订阅
  
  // 这里以 ; 开头其实是因为 js 解析器解析括号时是不会加分号的, 这也就导致出现下面的情况
const subscription = observable.subscribe(next, error, complete)(this._subscription || (this._subscription = new Subscription())).add(subscription)
  // 对, 就像上面这样, 将两段代码连在了一起, 这个 bug 现代解析器已经修复了, 这里特地提一下也是防止小伙伴们踩坑(才不是强行解释)

  // ok, 现在来说代码内容, 首先判断 this._subscription 是否存在, 如果不存在就创建一个 _subscription
  // 然后将上面的 subscription 对象传入
  ;(this._subscription || (this._subscription = new Subscription())).add(subscription)
  return subscription
}
```



## $eventToObservable

[源码位置](https://github.com/vuejs/vue-rx/blob/master/src/methods/eventToObservable.js)

源码解读:
```javascript
import { Observable } from 'rxjs'

export default function eventToObservable (evtName) {
  const vm = this
  // 虽然上面的官方用法中没有提到, 但我们看源码可以发现这个参数也可以接受一个数组, 如果发现
  // 接受的参数不是一个数组, 那么就将其转换成一个数组
  const evtNames = Array.isArray(evtName) ? evtName : [evtName]

  // 创建 Observable 对象
  const obs$ = new Observable(observer => {
    // 储存用于取消监听事件的对象
    const eventPairs = evtNames.map(name => {
      // 生成 callback 
      const callback = msg => observer.next({ name, msg })
      // 作为参数传入 vm.$on, 这样组件就可以自动监听了
      vm.$on(name, callback)
      return { name, callback }
    })

    return () => {
      // 取消监听事件
      eventPairs.forEach(pair => vm.$off(pair.name, pair.callback))
    }
  })

  return obs$
}
```



## $createObservableMethod

功能介绍：

你可以使用 `observableMethods` 选项使代码更加声明式：

```
new Vue({
  observableMethods: {
    submitHandler: 'submitHandler$'
    // 或者使用数组简写: ['submitHandler']
  }
});
```

上面代码会自动在实例上创建两个东西：

1. 一个是可以用 `v-on` 绑定到模板的 `submitHandler` 方法；
2. 一个是可以流式调用 `submitHandler` 的`submitHandler$` observable。

### 实现

笔者将写好的代码放在了代码仓库里，如果小伙伴们自己写的时候发现有问题可以参考这个文件，包含了实现和使用的例子，[文件地址](https://github.com/MonchiLin/impl-yourself-vue-rx/blob/master/src/createObservableMethod.vue)

```javascript
export default {
  mixins: [{
    created() {
      const vm = this
      const $createObservableMethod = (methodName) => {
        // 定义一个 subscriber
        const subscriber = (observer) => {
          // 在 vm 上挂载方法 vm["muchMore"] = xx
          // 调用这个方法时就会触发 observer.next
          vm[methodName] = (val) => {
            observer.next(val)
          }
          return () => {
            delete vm[methodName]
          }
        }

        return new Observable(subscriber).pipe(share())
      }

      // 假设我们传入如下结构
      // observableMethods: {
      //    muchMore: 'muchMore$',
      //    minus: 'minus$'
      // }
      const observableMethods = vm.$options.observableMethods
      Object.keys(observableMethods).forEach(key => {
        // 在 vm 上面挂载 muchMore$，muchMore$ 是一个 Observable
        // vm["muchMore$"] = $createObservableMethod("muchMore")
        vm[observableMethods[key]] = $createObservableMethod(key)
      })


    }
  }],
}
```



### 源码分析

```
export default function createObservableMethod (methodName, passContext) {
  const vm = this

  // 处理错误
  if (vm[methodName] !== undefined) {
    warn(
      'Potential bug: ' +
      `Method ${methodName} already defined on vm and has been overwritten by $createObservableMethod.` +
      String(vm[methodName]),
      vm
    )
  }

  const creator = function (observer) {
    vm[methodName] = function () {
      // arguments 是 function 声明的函数的特有属性，由实参构成的“类数组”
      // Array.from(arguments) 将 arguments 转换成数组
      const args = Array.from(arguments)
      if (passContext) {
        args.push(this)
        observer.next(args)
      } else {
        if (args.length <= 1) {
          observer.next(args[0])
        } else {
          observer.next(args)
        }
      }
    }
    
    // 取消订阅时删除 vm 上的方法
    return function () {
      delete vm[methodName]
    }
  }

  return new Observable(creator).pipe(share())
}
```





## optionMergeStrategies.subscriptions

解析:
```javascript
Vue.config.optionMergeStrategies.subscriptions = Vue.config.optionMergeStrategies.data
```
我们看到 subscriptions 的合并策略被赋值了 data 的合并策略, 这意味着我们只需要搞明白 data 的合并策略就知道 subscriptions 的合并策略了，想了解这部分知识的小伙伴可以可以去读 Vue 源码，如果需要的话笔者也可以单独写一篇文章来讲解。

源码在 vue 仓库的 vue/src/core/util/options.js 110行。












