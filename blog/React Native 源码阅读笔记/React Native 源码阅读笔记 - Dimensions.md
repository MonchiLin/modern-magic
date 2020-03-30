# React Native 源码阅读笔记 - Dimensions

* \[时间\]: 2020/3/30
* \[keyword\]: React Native，Typescript，源码阅读

StyleSheet 的源码位置在: Libraries\Utilities\Dimensions.js

https://github.com/facebook/react-native/blob/master/Libraries/Utilities/Dimensions.js

[官方文档](https://reactnative.dev/docs/dimensions)

下文中文文档取自 reactnative.cn

## 功能介绍

Dimensions 直译有：“尺寸”，“尺寸图”，“规模” 的意思，只从名字不是很容易看出作用，但是看完本文相信读者一定会对 Dimensions 的作用与原理的认知更上一层楼。



它提供了下面几个静态方法和静态属性

静态方法：  `get()` `addEventListener()` `removeEventListener()` `set()` 



最常用的就是获取屏幕的宽和高

```typescript
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
```





## get()/set()

### 功能介绍

初始的尺寸信息应该在`runApplication`之后被执行，这样才可以在任何其他的 require 被执行之前使用。不过在稍后可能还会更新。

> 注意：尽管尺寸信息立即就可用，但它可能会在将来被修改（譬如设备的方向改变），所以基于这些常量的渲染逻辑和样式应当每次 render 之后都调用此函数，而不是将对应的值保存下来。（举例来说，你可能需要使用内联的样式而不是在`StyleSheet`中保存相应的尺寸）。
>
> 如果是 `android` 尺寸信息将会排除状态栏( status bar )除非状态栏是半透明的和 底部导航栏( 三大金刚 )

示例： `const {height, width} = Dimensions.get('window');`或者`const {height, width} = Dimensions.get('screen');`



### screen 和 window 的区别

screen   ： 手机的屏幕尺寸

window ： App 的可用尺寸（如果是 `android` 尺寸信息将会排除状态栏( status bar )除非状态栏是半透明的和 底部导航栏( 三大金刚 )）



看完上面这部分，小伙伴们脑袋中最起码会有一个问号，什么是 `runApplication` ，这个我们下面源码解析部分就会略微提到，不过这部分内容主要在 `AppRegistry` 部分（此处应有超链接），笔者正在补充，如果小伙伴看到这篇文章的时候 `AppRegistry` 源码解析还没完成，请在评论区催更。



接下来源码解析部分会讲解 RN 具体是如何计算屏幕尺寸，以及如何更新屏幕尺寸（例如手机旋转出发的屏幕尺寸更新）



### 源码解析

```flow js
get(dim: string): Object {
    // 这里我们忽略 invariant， 他的作用是做运行时检查
    invariant(dimensions[dim], 'No dimension set for key ' + dim);
    // 结果很直白，从一个叫做 dimensions 的变量返回对应的值
    return dimensions[dim];
}
```

从上面的代码是看不出什么名堂的，我们继续翻翻 `dimensions` 的定义，很快就找到了这几行代码

```
type DisplayMetrics = $ReadOnly<{|
  width: number,
  height: number,
  scale: number,
  fontScale: number,
|}>;

type DimensionsValue = {window?: DisplayMetrics, screen?: DisplayMetrics};
let dimensions: DimensionsValue;
```

注：type 名称 = { xx } 是 `flow` 的语法，对 `flow` 或者 `Typescript` 的熟悉的小伙伴应该已经猜到意思了，如果对两者都不熟也没关系，不影响看下去，笔者贴出代码主要是为了方便读者自己翻阅源码时对照。

上面可以看出，这段代码仅仅声明了 `dimensions`这个变量并没有为其赋值，那么`dimensions` 是如何赋值的呢？我们继续找一找，就可以在 set() 方法中为 `dimensions` 赋值，下面是 set() 的源码

```typescript
// 接受一个参数 dims, dims 的数据类型为一个对象  
static set(dims: $ReadOnly<{[key: string]: any}>): void {
    // 下面注释为 尺寸为整数，可能会丢失精度
    // We calculate the window dimensions in JS so that we don't encounter loss of
    // precision in transferring the dimensions (which could be non-integers) over
    // the bridge.
    
    // TODO 这里 screen, window 似乎永远是 undefind 除非 开发者 手动传入了的 dims 对象，不清楚
    // 别的地方会不会处理，如果有小伙伴知道麻烦告诉笔者。
    let {screen, window} = dims;

    // 下面代码中从 dim 中取出了 windowPhysicalPixels screenPhysicalPixels 两个对象
    // 以在笔者的手机 荣耀10x 为例：分辨率为 2340*1080
    // windowPhysicalPixels 是 App 可以使用的尺寸数据，笔者手机获取到的数据为
    // {
    //    height: 2259
    //    fontScale: 1
    //    scale: 3
    //    width: 1080
    //    densityDpi: 480
    //  }

    // screenPhysicalPixels 是 手机的尺寸数据，笔者手机获取到的数据为
    // {
    //    height: 2340
    //    fontScale: 1
    //    scale: 3
    //    width: 1080
    //    densityDpi: 480
    //  }

    // 接下来的代码就是为 dimensions 对象赋值，让 get 方法可以获得数据

    const {windowPhysicalPixels} = dims;
    if (windowPhysicalPixels) {
      window = {
        width: windowPhysicalPixels.width / windowPhysicalPixels.scale,
        height: windowPhysicalPixels.height / windowPhysicalPixels.scale,
        scale: windowPhysicalPixels.scale,
        fontScale: windowPhysicalPixels.fontScale,
      };
    }
    const {screenPhysicalPixels} = dims;
    if (screenPhysicalPixels) {
      screen = {
        width: screenPhysicalPixels.width / screenPhysicalPixels.scale,
        height: screenPhysicalPixels.height / screenPhysicalPixels.scale,
        scale: screenPhysicalPixels.scale,
        fontScale: screenPhysicalPixels.fontScale,
      };
    } else if (screen == null) {
      screen = window;
    }

    dimensions = {window, screen};
    if (dimensionsInitialized) {
      // 触发 eventEmitter 的 change 事件  
      // Don't fire 'change' the first time the dimensions are set.
      eventEmitter.emit('change', dimensions);
    } else {
      dimensionsInitialized = true;
    }
  }
 
```

看到这里的小伙伴还记得我们最初的问题吗？`dimensions` 对象是如何初始化的，那么我们看到 `set()` 对 `dimensions` 进行了初始化，那么哪里调用了 `set()` 呢？ 我们看到这个文件的末尾：

```typescript
// 首先尝试从 global.nativeExtensions.DeviceInfo.Dimensions 对象获取值
// global.nativeExtensions.DeviceInfo.Dimensions 的实际值就是就是 Dimensions
// 按笔者的理解这里 initialDims 第一次调用的时候应该永远为 null
let initialDims: ?$ReadOnly<{[key: string]: any}> =
  global.nativeExtensions &&
  global.nativeExtensions.DeviceInfo &&
  global.nativeExtensions.DeviceInfo.Dimensions;

// 根据上方推测，笔者判断第一次肯定会进入这里
if (!initialDims) {
  // Subscribe before calling getConstants to make sure we don't miss any updates in between.
  RCTDeviceEventEmitter.addListener( // 监听 didUpdateDimensions 事件，更新 Dimensions
    'didUpdateDimensions',
    (update: DimensionsPayload) => {
      Dimensions.set(update);
    },
  );
  // 从 NativeDeviceInfo.getConstants().Dimensions 中获取 Dimensions   
  // TODO ComponentScript 笔者也不清楚是什么，正在了解中。
  // Can't use NativeDeviceInfo in ComponentScript because it does not support NativeModules,
  // but has nativeExtensions instead.
  initialDims = NativeDeviceInfo.getConstants().Dimensions;
}

Dimensions.set(initialDims);

module.exports = Dimensions;
```

好，到目前为止，我们已经看到了为 `dimensions` 赋值(调用 set()) 的几个地方

1. initialDims 本身有值
2. initialDims 本身为 null，从 NativeDeviceInfo.getConstants().Dimensions 获取，然后复制给 initialDims 
3. 监听 `didUpdateDimensions` 事件

首先说第一种，代码中笔者已经提到了，initialDims 第一次必定不会有值（大概，如果之后发现问题笔者会继续更新），所以就到了第二种情况，从 `NativeDeviceInfo.getConstants().Dimensions` 获取值，那么就引申出来一个新问题 `NativeDeviceInfo` 是什么？如果要说这个就要跑题了，之后笔者写道 `NativeDeviceInfo` 章节的时候会讲，我们来看最重要的一点，也就是第三点。

### RCTDeviceEventEmitter（现在已被 NativeEventEmitter 代替）

 这个东西笔者也会单独写一个章节（读者：“你写一篇文章就欠了三篇文章了，能不能说明白了”），现在只要知道它是一个他跟 Node 里面的 EventEmitter 是差不多的东西，用于和原生(Native)通信，如果有小伙伴实在不清楚可以去查查 “事件驱动 设计模式”，或者看这篇[教程](https://www.runoob.com/nodejs/nodejs-event.html) 笔者就不赘述了。

好了，终于到最重要的一点了，`didUpdateDimensions` 是如何触发了

找到： ReactAndroid\src\main\java\com\facebook\react\modules\deviceinfo\DeviceInfoModule.java#emitUpdateDimensionsEvent

`emitUpdateDimensionsEvent` 用于触发 `didUpdateDimensions` 事件

我们最终可以看到，`emitUpdateDimensionsEvent` 在 Android `onResume`生命周期和 `onGloballayout` 事件调用。



### 总结：

get() 部分看起来很多，但是这部分代码和其他两个方法  `addEventListener()` `removeEventListener()` 比起来说就像九阳真经，了解了 get() 其他几个方法瞄几眼就会了。



## addEventListener() /removeEventListener

还记得我们 set() 方法里执行了 `eventEmitter.emit('change', dimensions)` 吗？

`eventEmitter` 也是一个类似 node 中的 EventEmitter 的东西，add 则添加一个监听器，remove 则删除一个监听器。



