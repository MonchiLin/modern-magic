# React Native 源码阅读笔记 - EventEmitter

* \[时间\]: 2020/3/31
* \[keyword\]: React Native，JavaScript，React.js，源码阅读

EventEmitter 的源码位置在: Libraries\vendor\emitter\EventEmitter.js

https://github.com/facebook/react-native/blob/master/Libraries/vendor/emitter/EventEmitter.js



## 功能介绍与用法

EventEmitter 是作为 RN 的基础设施存在的（类似与我们的工具库），所以并未暴露给开发者。

如果有小伙伴写过原生代码应该会觉得眼熟，没错 `NativeEventEmitter`的父类就是 `EventEmitter `，下面是官方的注释：

```javascript
/**
 * @class EventEmitter
 * @description
 * An EventEmitter is responsible for managing a set of listeners and publishing
 * events to them when it is told that such events happened. In addition to the
 * data for the given event it also sends a event control object which allows
 * the listeners/handlers to prevent the default behavior of the given event.
 *
 * The emitter is designed to be generic enough to support all the different
 * contexts in which one might want to emit events. It is a simple multicast
 * mechanism on top of which extra functionality can be composed. For example, a
 * more advanced emitter may use an EventHolder and EventFactory.
 */
```

笔者用自己的塑料英语翻译一下，如果有问题请在评论区打醒笔者

```javascript
EventEmitter 负责管理一组监听器(listeners)，并在发生事件后告知（told that）监听器。除了给定事件的数据外，它还发送一个事件控制对象(Event Control Object)，允许监听器/处理器(handles) 阻止给定事件的默认行为。

EventEmitter 被设计的足够通用，以支持所有可能要发射（Emit）事件的不同上下文(All differnent context)，这是一种简单的多播（multicast）机制，可以在其上集成其他功能，在它之上可以组成额外的功能。例如，更高级的发射器可以使用 EventHolder 和 EventFactory。
```

上面的描述提到了几个点：

`EventEmiiter`

`listeners`

`Event Control Object`

`multicast`

`EventHolder`

`EventFactory`

这篇涉及的比较多，先暂时停更一段时间



_subscriber

_currentSubscription

addListener()

once()

removeAllListeners()

removeCurrentListener()

removeSubscription()

listeners()

emit()

removeListener()







## constructor()

