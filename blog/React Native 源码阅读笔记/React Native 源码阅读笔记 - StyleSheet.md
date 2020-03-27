# React Native 源码阅读笔记 - StyleSheet



StyleSheet 的源码位置在: Libraries\StyleSheet\StyleSheet.js

https://github.com/facebook/react-native/blob/master/Libraries/StyleSheet/StyleSheet.js

[官方文档](https://reactnative.dev/docs/stylesheet)



## 功能介绍

StyleSheet 是用 RN 开发中提供样式相关功能的工具集。

它提供了下面几个静态方法和静态属性

静态方法：  `compose()` `create()` `flatten()` `setStyleAttributePreprocessor()` 

静态属性： `absoluteFill` `absoluteFillObject` `hairlineWidth`



## compose()

```flow js
compose<T: DangerouslyImpreciseStyleProp>(
    style1: ?T,
    style2: ?T,
  ): ?T | $ReadOnlyArray<T> {
    // 判断 style1 和 style2 是否都不是 null，如果都不是返回 [style1, style2] 这样的数组
    if (style1 != null && style2 != null) {
      return ([style1, style2]: $ReadOnlyArray<T>);
    } else {
      // 如果有一个是 null 则判断下 style1 是不是 null，如果不是则返回 style1, 否则返回 style2, 所以实际这里如果 style2 是 null 这个函数还是有可能返回 null 的
      return style1 != null ? style1 : style2;
    }
  },
```



## create()

用于创建 react native jsx 对象的 style 属性

StyleSheetValidation 源码位置： https://github.com/facebook/react-native/blob/master/Libraries/StyleSheet/StyleSheetValidation.js



```flow js
// 假设我们传入 obj = { test: { color: "white" } }

create<+S: ____Styles_Internal>(obj: S): $ObjMap<S, (Object) => any> {  
    
        // 如果在开发环境下则验证是否传入了非法的属性
    if (__DEV__) {
      for (const key in obj) {
        // StyleSheetValidation.validateStyle 见下  
        // 这里 key = "test", obj = { test: { color: "white" } }
        StyleSheetValidation.validateStyle(key, obj);
        if (obj[key]) {
          // Object.freeze 文档： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
          // 简单来说就是不允许传入的对象发生改变, 例如 a.a = 1 不会改变 a.a 的值  
          Object.freeze(obj[key]);
        }
      }
    }
    return obj;
    
    
static validateStyle(name: string, styles: Object) {
    // 如果不是开发环境则不验证
    if (!__DEV__ || global.__RCTProfileIsProfiling) {
      return;
    }
    
    for (const prop in styles[name]) {
      // prop = "color" 
      // styles = { test: { color: "white" } }
      // name = "test"  
      // styles[name] = { color: "white" }
      
      // StyleSheetValidation.validateStyleProp 源码见下
      StyleSheetValidation.validateStyleProp(
        prop,
        styles[name],
        'StyleSheet ' + name,
      );
    }
  }

  static validateStyleProp(prop: string, style: Object, caller: string) {
    // 简单来说就是 RN 内部维护一个叫做 allStylePropTypes 的 Map 对象，map 的 key 为所有被允许的 style 名称，例如 “color” "fontSize"，而 validateStyleProp 方法会去 allStylePropTypes 对象里面查找传入的 prop 是否存在，如果不存在则会报错
      
    if (!__DEV__ || global.__RCTProfileIsProfiling) {
      return;
    }
    // 如果 prop 不存在 allStylePropTypes 中，也就是传入了错误的 prop， 例如传入 prop = "test"
    if (allStylePropTypes[prop] === undefined) {
      const message1 = '"' + prop + '" is not a valid style property.';
      const message2 =
        '\nValid style props: ' +
        JSON.stringify(Object.keys(allStylePropTypes).sort(), null, '  ');
      // 上面构建报错信息，这里抛出 error
      styleError(message1, style, caller, message2);
    }
      
    // allStylePropTypes[prop] 有可能是一个函数，参考 StyleSheetValidation.js addValidStylePropTypes() 方法
    // 这里尝试调用这个函数，如果这个函数返回了 error 则会将 error 抛出
    const error = allStylePropTypes[prop](
      style,
      prop,
      caller,
      'prop',
      null,
      ReactPropTypesSecret,
    );
    if (error) {
      styleError(error.message, style, caller);
    }
  }
```



## flatten()

flatten（打平） 的源码在这个文件 https://github.com/facebook/react-native/blob/master/Libraries/StyleSheet/flattenStyle.js

他的效果为将 [{color:"white"}, {fontSize: 11}] 这种结构的对象变成深递归转换成 {color: "white", fontSize: 11}, 注意这里是深递归，也就是说 `[ {corlor: "white", test: { fontSize: 10 }} ]` 这种结构也可以处理，不过 jsx 在 transform 的过程中会验证 style ，所以 `test` 会被报错

```javascript
function flattenStyle(
  style: ?DangerouslyImpreciseStyleProp,
): ?DangerouslyImpreciseStyle {
  // 处理边界情况    
  if (style === null || typeof style !== 'object') {
    return undefined;
  }

  // 如果不是数组自然无法 flatten ，所以直接返回    
  if (!Array.isArray(style)) {
    return style;
  }

  const result = {};
  for (let i = 0, styleLength = style.length; i < styleLength; ++i) {
    // 打平传入的 style 对象，按照第一个例子这里就可能为 flattenStyle({color:"white"}), 最后得到 {color:"white"} 这种结构
    const computedStyle = flattenStyle(style[i]);
    if (computedStyle) {
      for (const key in computedStyle) {
        // 将值存在 result 中  
        result[key] = computedStyle[key];
      }
    }
  }
  return result;
}
```



## setStyleAttributePreprocessor()

`setStyleAttributePreprocessor()` 会改变 RN 内部用于处理 `color(颜色)`，`transform` ，`shadowOffset`的预处理器( preprocessor ) 

上面提到的几个东西怎么理解呢？

首先要明确一件事情，那就是开发者传入的 style 的 `color` `transform` `shadowOffset` 属性 RN 是不会直接使用的，而是先做处理，用于处理的函数就是预处理器

我们来看看 `color` 的默认预处理器，这部分代码过于底层，笔者的水平还不足以讲解具体意思，大概意思是会将你传入的 `white, #FFFFFF hsla(0, 0%, 100%, 1) `  等颜色格式转换为 32 位的整数。

```javascript
function processColor(color?: ?(string | number)): ?number {
  if (color === undefined || color === null) {
    return color;
  }

  let int32Color = normalizeColor(color);
  if (int32Color === null || int32Color === undefined) {
    return undefined;
  }

  // Converts 0xrrggbbaa into 0xaarrggbb
  int32Color = ((int32Color << 24) | (int32Color >>> 8)) >>> 0;

  if (Platform.OS === 'android') {
    // Android use 32 bit *signed* integer to represent the color
    // We utilize the fact that bitwise operations in JS also operates on
    // signed 32 bit integers, so that we can use those to convert from
    // *unsigned* to *signed* 32bit int that way.
    int32Color = int32Color | 0x0;
  }
  return int32Color;
}
```

这个就是预处理器的意思，`transfrom` 和 `shadowOffset` 也是同理。



## absoluteFill

等价于下方代码

```javascript
const absoluteFill = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
}
```



## hairlineWidth

一个当前设备上能显示的最细数值的常量。TODO PixelRatio 部分会在接下来的章节讲解，之后会在链接放讲解的超链接

源码如下：

```javascript
let hairlineWidth: number = PixelRatio.roundToNearestPixel(0.4);
if (hairlineWidth === 0) {
  hairlineWidth = 1 / PixelRatio.get();
}
```

















