# VUE-RX 做了什么

## 从 Vue.use 开始

从 repo 的 Readme 我们可以看到, vue-rx 在现代 JS 模块系统中用法为
```javascript
import Vue from 'vue'
import VueRx from 'vue-rx'

Vue.use(VueRx)
```
然后, 我们进一步分析得知 `Vue.use` 函数有两种用法: 
1. 传入一个函数, 把 Vue 作为参数传入这个函数, 并且调用它.
2. 传入一个对象, 会调用传入对象的 install 函数
果然, 这时我们打开 [index.js](https://github.com/vuejs/vue-rx/blob/master/src/index.js)

```javascript
import { install } from './util'
import rxMixin from './mixin'
import streamDirective from './directives/stream'
import watchAsObservable from './methods/watchAsObservable'
import fromDOMEvent from './methods/fromDOMEvent'
import subscribeTo from './methods/subscribeTo'
import eventToObservable from './methods/eventToObservable'
import createObservableMethod from './methods/createObservableMethod'

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
首先, 先忽略掉 import 的调用, 我们往下看, 可以看到这个文件默认导出一个函数, 而这个函数接受一个 Vue , 这正是我们上面提到的 use 第一种函数.

然后我们看最后三行, 这里判断如果 Vue 是全局变量, 那么调用全局变量的 Vue.use, 并且传入 VueRx, 这也就是上面的默认导出函数为什么要起名的原因. (如果执行到这段代码的 if 语句里面, 则表示这里的 Vue 是通过传统的 script 标签引入的, 这样 vue-rx 就可以兼容 模块方式 || 通过 script 标签引入)

接下来我们先讲几个原型链函数以及合并策略(mergaStrategies), 最后在讲 Vue.mixin 和 Vue.directive

## 原型链函数
### $watchAsObservable
[源码文件](https://github.com/vuejs/vue-rx/blob/master/src/methods/watchAsObservable.js)

这个 api 是一个用来代替 Vue 原生 $watch 的函数, 使用 rxjs 包装.
官方介绍: 这是一个添加到实例的原型函数。你可以根据一个值的侦听器创建 observable。值会以 { newValue, oldValue } 的格式触发
``` javascript
import { pluck, map } from 'rxjs/operators';

const vm = new Vue({
  data: {
    a: 1
  },
  subscriptions() {
    // 用 Rx 操作符声明式地映射成另一个属性
    return {
      aPlusOne: this.$watchAsObservable('a').pipe(
        pluck('newValue'),
        map(a => a + 1)
      )
    };
  }
});

// 或者产生副作用...
vm.$watchAsObservable('a').subscribe(
  ({ newValue, oldValue }) => console.log('stream value', newValue, oldValue),
  err => console.error(err),
  () => console.log('complete')
);
```

```javascript
import { Observable, Subscription } from 'rxjs'

export default function watchAsObservable (expOrFn, options) {
  // 储存 this
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
    // 注意这里的 _unwatch && _unwatch(), 这意味着如果 _unwatch 可以被强转为 false
    // 那么就表示 _unwatch 是没有被赋值的, 也就是 watch 未执行, 或执行过程中出现问题, 这时候就不会去执行 _unwatch()

    // 这里插播一个小知识点, 下面是 observer 部分的返回类型 TeardownLogic 的签名
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

### $fromDOMEvent
[源码位置](https://github.com/vuejs/vue-rx/blob/master/src/methods/fromDOMEvent.js)

用法:
```javascript
$fromDOMEvent(selector, event)
这是一个添加到实例的原型方法。可以用它根据实例内部元素的 DOM 事件创建 observable。与 Rx.Observable.fromEvent 类似，甚至在 DOM 渲染前，在 subscriptions 函数中使用都是有用的。

selector 用来查找组件根元素的后代节点，如果你想监听根元素，传入 null 作为第一个参数。

import { pluck } from 'rxjs/operators';

const vm = new Vue({
  subscriptions() {
    return {
      inputValue: this.$fromDOMEvent('input', 'keyup').pipe(
        pluck('target', 'value')
      )
    };
  }
});
```

解析:
```javascript
import { Observable, Subscription, NEVER } from 'rxjs'

export default function fromDOMEvent (selector, event) {
  // 处理 window 不存在的情况
  if (typeof window === 'undefined') {
    // TODO(benlesh): I'm not sure if this is really what you want here,
    // but it's equivalent to what you were doing. You might want EMPTY
    return NEVER
  }

  // 储存 this
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
总结: 
从源码可以看出, 其实这个函数会有很大的性能问题, 如果可以建议不要使用, 因为监听了 html 对象, 也就会导致每次有对应事件触发都会去执行 listener, 而 listener 本身又要做很多处理.


### $subscribeTo
[源码位置](https://github.com/vuejs/vue-rx/blob/master/src/methods/subscribeTo.js)

用法:
``` javascript
// $subscribeTo(observable, next, error, complete)
// 这是一个添加到实例的原型方法。你可以用它订阅一个 observable，但是得让 VueRx 管理它的 dispose unsubscribe。

import { interval } from 'rxjs';

const vm = new Vue({
  mounted() {
    this.$subscribeTo(interval(1000), function(count) {
      console.log(count);
    });
  }
});
```
解析: 从用法我们就能看出这个函数的作用就是可以自动帮你 unsubscribe, 下面我们来看看源码

```JavaScript
import { Subscription } from 'rxjs'

export default function subscribeTo (observable, next, error, complete) {
  // 调用传入的 observable, 以及其参数, 得到 subscription
  const subscription = observable.subscribe(next, error, complete)
  // 这里代码避开上去复杂了一点, 其实它的目的就是储存这个 subscription, 然后在某个时机取消订阅
  // 这里以 ; 开头其实是因为 js 解析器解析括号时是不会加分号的, 这也就导致出现下面的情况
  // const subscription = observable.subscribe(next, error, complete)(this._subscription || (this._subscription = new Subscription())).add(subscription)
  // 对, 就像上面这样, 将两段代码连在了一起, 这个 bug 现代解析器已经修复了, 这里特地提一下也是防止小伙伴们踩坑(才不是强行解释)
  // ok, 现在来说代码内容, 首先判断 this._subscription 是否存在, 如果不存在就
  // 给 this._subscription  赋值为 new Subscription(), 然后将上面的 subscription 对象传入
  // this._subscription.add 方法里, 这段代码在 mixin 部分还会讲, 不要忘记, 这里只要理解这个函数可以帮你自动取消订阅就好了
  ;(this._subscription || (this._subscription = new Subscription())).add(subscription)
  return subscription
}
```

### $eventToObservable
[源码位置](https://github.com/vuejs/vue-rx/blob/master/src/methods/eventToObservable.js)

用法: 
```JavaScript
// 转化 vue.$on (包括生命周期事件) 到 Observables。值会以 { name, msg } 的格式触发：

import { interval } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

const vm = new Vue({
  created() {
    this.$eventToObservable('customEvent').subscribe(event =>
      console.log(event.name, event.msg)
    );
  }
});

// `vm.$once` 的 `vue-rx` 版本
this.$eventToObservable('customEvent').pipe(take(1));

// 另一种取消订阅的方法：
let beforeDestroy$ = this.$eventToObservable('hook:beforeDestroy').pipe(
  take(1)
);

interval(500).pipe(takeUntil(beforeDestroy$));
```
源码解读:
```javascript
import { Observable } from 'rxjs'

/**
 * @see {@link https://vuejs.org/v2/api/#vm-on}
 * @param {String||Array} evtName Event name
 * @return {Observable} Event stream
 */
export default function eventToObservable (evtName) {
  // 储存 this
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
      // 传入 $on, 这样组件就可以自动监听了
      vm.$on(name, callback)
      return { name, callback }
    })

    return () => {
      // 取消监听事件
      // Only remove the specific callback
      eventPairs.forEach(pair => vm.$off(pair.name, pair.callback))
    }
  })

  return obs$
}
```


### optionMergeStrategies.subscriptions

解析:
```javascript
Vue.config.optionMergeStrategies.subscriptions = Vue.config.optionMergeStrategies.data
```
我们看到 subscriptions 的合并策略被赋值了 data 的合并策略, 这意味着我们只需要搞明白 data 的合并策略就知道 subscriptions 的合并策略了, 这段讲起来会跑题, 建议想了解的同学先简单了解一下什么是[合并策略](https://cn.vuejs.org/v2/api/index.html#optionMergeStrategies), 如果还想继续深入可以读 Vue 源码, 这段有时间我也会写解析.



## install(Vue) 做了什么

源码: 
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

先说这段代码的作用, 这段代码使这个文件导出的 Vue 和 warn 对象有了意义, 因为最顶部只做了声明, 在这个函数里面做了赋值操作, 并且在给 warn 赋值的时候判断 Vue.util.warn 是否存在, 不存在就用一个空函数代替.

说完代码意思来说注释, 作者提到这种赋值行为似乎是 Vue 的一种约定, 但是却不一定好, 这个待考察.

## Vue.mixin(rxMixin) 之前

[Vue.mixin](https://cn.vuejs.org/v2/api/#Vue-mixin), Vue.mixin 是 Vue 自身的 api 之一, 它会向每个被创建的 Vue 实例混入函数传入的对象.

[Vue.\$options](https://cn.vuejs.org/v2/api/#vm-options) 是你这个实例中声明的属性, 例如 \$options.components 拿到所有在这个实例中注册的组件, \$options.computed 拿到这个实例中声明的 计算属性.

defineReactive 函数可以将一个对象变为响应式, 考虑到讲这个会导致跑题, 我们下次再讲.
``` javascript
function defineReactive (vm, key, val) {
  if (key in vm) {
    vm[key] = val
  } else {
    Vue.util.defineReactive(vm, key, val)
  }
}
```


## Vue.mixin(rxMixin) 做了什么

让我们看看 rxMixin 的[源码](https://github.com/vuejs/vue-rx/blob/master/src/mixin.js), 太长我就不在文章里面贴了.

我们看到, 这个文件 **默认导出** 了一个对象, 而这个对象拥有两个 vue 的生命周期函数, 这两个函数最终都会被混入到所有 vue 的实例中.

### created
```javascript
// 储存 this 到 vm 变量
const vm = this


// 获取声明的 domStrams 对象, 从官方教程: https://github.com/vuejs/vue-rx#v-stream-streaming-dom-events
// 中我们可以看到如果我们在 domStreams 中声明对某个属性 那么就不需要显式的在 subscriptions 函数里面对这个属性进行 new Subject()
const domStreams = vm.$options.domStreams
// 这段代码意图就很明显了, 如果 domStreams 存在, 那么手动将每个声明的属性挂在 this 上, 并且为其赋值 new Subject()
if (domStreams) {
  domStreams.forEach(key => {
    vm[key] = new Subject()
  })
}


// 首先复制一份 observableMethods 的引用
const observableMethods = vm.$options.observableMethods
// observableMethods 支持两种用法
// 1.
//  observableMethods: {
//    submitHandler: 'submitHandler$'
//  }
// 2.
// observableMethods: ["submitHandler"]
if (observableMethods) {
    // 根据传入的数据类型不同, 做不同的处理, 代码很简单, 就是通过函数名创建一个新的函数挂载在当前实例上
    // $createObservableMethod 函数接下来再说
  if (Array.isArray(observableMethods)) {
    observableMethods.forEach(methodName => {
      vm[ methodName + '$' ] = vm.$createObservableMethod(methodName)
    })
  } else {
    Object.keys(observableMethods).forEach(methodName => {
      vm[observableMethods[methodName]] = vm.$createObservableMethod(methodName)
    })
  }
}


// 复制一份 subscriptions 的引用
let obs = vm.$options.subscriptions
// subscriptions 支持两种用法
// 1.把 subscriptions 声明成一个对象
// subscriptions: {
//   msg: messageObservable
// }
// 2. 把 subscriptions 声明成一个函数
//  subscriptions: function () {
//    return {
//      msg: new Observable(...)
//    }
//  }
// 这就就是判断 subscriptions 是否是一个函数
// 如果是一个函数就把当前实例作为 this 去执行这个函数,
// 然后 obs 变量就会被赋值成直接第一种 subscriptions 使用形式结果
if (typeof obs === 'function') {
  obs = obs.call(vm)
}
if (obs) {
  // 声明 $observables 属性
  vm.$observables = {}
  // 声明 _subscription 属性
  vm._subscription = new Subscription()
  // 遍历 obs 的 key
  Object.keys(obs).forEach(key => {
    // 将这个 key 变为响应式
    defineReactive(vm, key, undefined)
    // 这里首先把 obs[key] 赋值给 vm.$observables[key]
    // 然后把 vm.$observables[key] 赋值给 ob 对象
    const ob = vm.$observables[key] = obs[key]
    // 判断 ob 是否是 Observable, 如果不是则跳过本次循环, 并在控制台输出警告
    if (!isObservable(ob)) {
      warn(
        'Invalid Observable found in subscriptions option with key "' + key + '".',
        vm
      )
      return
    }

    // 这里其实是两步:
    // 1. 调用本次循环 对象 的 subscribe 函数
    // 在每次触发 subscribe 函数时, 为 vm[key] 
    // (注意, 这里不是声明在 subscriptions 对象上的, 而是实例上的 key) 对象赋值
    // 2. subscribe 函数会返回一个 subscription 对象
    // 然后将这个对象传入 vm._subscription.add 函数里面, 这么做是因为
    // Subscription 对象有一个特性, 就是可以通过 add 添加 **子 Subscription**
    // 当 父 Subscription调用 unsubscibe 时, 子 Subscription 也会被 unsubscibe.
    vm._subscription.add(obs[key].subscribe(value => {
      vm[key] = value
    }, (error) => { throw error }))
  })
}

```

### beforeDestroy
```javascript
// 在 beforeDestroy 声明周期将 _subscription 取消订阅, 对应上面 _subscription.add 部分
if (this._subscription) {
  this._subscription.unsubscribe()
}
```

### 起来活动十分钟喝杯水, 回想下上面提到的, 在继续往下看

## Vue.directive('stream', streamDirective) 做了什么

v-stream 的用法: 

1. 直接接受一个 Subject 
```html
<button v-stream:click="plus$">+</button>
```
2. 传入一个对象, subject 是 Subject, data 是额外的数据
```html
<button v-stream:click="{ subject: plus$, data: someData }">+</button>
```
3. 第二种用法的扩展, options 接受一些事件相关的参数, 并将其传给原生的 `addEventListener`, 有的小伙伴可能忘记了, 我这里贴一下 MDN 的[文档](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)
```html
<button v-stream:click="{
  subject: plus$,
  data: someData,
  options: { once: true, passive: true, capture: true }
}">+</button>
```

> note: 看这个之前如果忘记了 Vue 的指令部分请先去查一查, 下方链接直达, 不然直接看是看不懂的.

[Vue.directive](https://cn.vuejs.org/v2/api/#Vue-directive) 文档介绍.

[指令的钩子参数](https://cn.vuejs.org/v2/guide/custom-directive.html#%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0)

[streamDirective 源码](https://github.com/vuejs/vue-rx/blob/master/src/directives/stream.js)

### bind

```javascript
bind (el, binding, vnode) {
  // 这里声明一个变量储存传入指令的 value
  let handle = binding.value
  // 储存事件名
  const event = binding.arg
  // 储存表达式
  const streamName = binding.expression
  // 储存修饰符
  const modifiers = binding.modifiers

  // 这里判断 handle 是不是 Observer, isObserver 函数会判断下是否存在 .next 函数,
  // 存在就认为这个对象是 Observer, 如果这里为真, 就表示使用者通过第 1 种方式使用了指令.
  if (isObserver(handle)) {
    // 将 handle 重新赋值成对象的方式
    handle = { subject: handle }
  } else if (!handle || !isObserver(handle.subject)) {
    // 上面判断的是判断对象是否是 Observer, 也就是判断是否是以
    // 第一种方式使用的, 这里判断是够是第二种方式使用的, 如果不是就直接退出整段代码,因为传入的参数是无效的
    warn(
      'Invalid Subject found in directive with key "' + streamName + '".' +
      streamName + ' should be an instance of Subject or have the ' +
      'type { subject: Subject, data: any }.',
      vnode.context
    )
    return
  }

  // 这段代码定义了一个包含 stop 和 prevent 的处理函数
  const modifiersFuncs = {
    stop: e => e.stopPropagation(),
    prevent: e => e.preventDefault()
  }
  // 接上面, 如果定义的对象里正好包含了 通过指令传入的 事件属性, 那么就将这个属性储存到一个新对象
  // 方便之后对使用者传入的事件选项做处理
  var modifiersExists = Object.keys(modifiersFuncs).filter(
    key => modifiers[key]
  )

  // 拿到用户传入的 Subject
  // 这里直接取 .subject 是因为上面已经处理过了, 如果是以第一种方式传入的 Subject 就将其保存在
  // 一个对象的 subject 属性上
  const subject = handle.subject

  // 这里首先判断 .next 函数是否存在, 如果存在就用 .next 函数, 如果不存在就用 .onNext 函数
  // 这里是一种兼容性做法, onNext 是 rxjs 很久很久之前的 next 函数, 在 rxjs6 已经被废弃了
  // 所以这里可以无视, 我们继续往下看, 拿到函数后, 使用 bind 将 this 绑定到 subject, 防止之后使用了错误的 this.
  const next = (subject.next || subject.onNext).bind(subject)

  // 这里先判断
  // vnode.componentInstance 是使用了这个指令的组件实例
  if (!modifiers.native && vnode.componentInstance) {
    handle.subscription = vnode.componentInstance.$eventToObservable(event).subscribe(e => {
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

  // store handle on element with a unique key for identifying
  // multiple v-stream directives on the same node
  ;(el._rxHandles || (el._rxHandles = {}))[getKey(binding)] = handle
}
```








