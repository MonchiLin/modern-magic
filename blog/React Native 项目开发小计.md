# React Native 项目开发小计

## 前言

时隔一年再次上手 RN 开发, 除了期待已久的 [Hermes 引擎](https://github.com/facebook/hermes), 但是 RN 给我的开发体验并没有明显的提升,而且整个生态似乎也陷入了停滞, 许多流行的库都已许久未曾更新, 在这种环境下最值得唏嘘的恐怕就是 RN 宣传语 `Learn once, write anywhere`, 对笔者来说前端调试最好的环境还是 Chrome, 借着 RN for web, 可以将 RN 运行在浏览器上, 从而方便调试像素, 网络请求, debugger 代码, 本地存储.... 但是正如前面所说, 陷入停滞的 RN 生态却难以满足它的野心, 作为开发者, 想要在浏览器调试, IOS/Android 中运行是一件很不容易的事情, 随着运行环境的增加, 技术选型也必须非常谨慎, 下面是笔者最终的技术选型, 以及一些兼容性问题的解决.

## 依赖列表

- 消息提醒组件 [react-native-toast-notifications](https://github.com/arnnis/react-native-toast-notifications)
- 滑动组件 [react-native-swiper](https://github.com/leecade/react-native-swiper) 注: (这个组件需要特殊处理)
- 底部弹出组件 [react-native-gesture-bottom-sheet](https://github.com/kcotias/react-native-gesture-bottom-sheet)
- 基础组件库 [reactnativeelements](https://reactnativeelements.com/)
- I18N [localization](https://docs.expo.dev/versions/latest/sdk/localization/)
- 样式库 [react-native-tailwindcss](https://tvke.github.io/react-native-tailwindcss/index.html)
- 函数库 [lodash](https://www.lodashjs.com/docs/)
- 扫描二维码 [expo-barcode-scanner](https://docs.expo.dev/versions/latest/sdk/bar-code-scanner/)
- 生成二维码 [react-native-qrcode-svg](https://github.com/awesomejerry/react-native-qrcode-svg)
- 剪切板 [expo-clipboard](https://docs.expo.dev/versions/latest/sdk/clipboard/)
- 底部弹出框 [react-native-action-sheet](https://github.com/expo/react-native-action-sheet)
- 本地存储 [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/docs/usage/)
- Icon [Feather](https://feathericons.com/)

## 兼容性问题

### [Can't resolve 'react-native-web/dist/exports/ViewPropTypes'](https://github.com/necolas/react-native-web/issues/1537#)

解决办法: https://github.com/necolas/react-native-web/issues/1537#issuecomment-896490630

这个方法在每次安装依赖后都去修改 node_modes/react-native-web/dist/index.js 的源码从而导出一个 `ViewPropTypes` 对象, 因为 `ViewPropTypes` 是仅用于定义 props 类型校验的对象, 所以为空即可.

### react-native-reanimated 没有 global.performance.now 方法

同样使用 `patch-package` 进行修改.

https://stackoverflow.com/questions/70564386/typeerror-global-performance-now-is-not-a-function-in-react-native/70588695

### 加密货币库使用的相关依赖

加密货币库使用了大量的 nodejs 函数, 这些函数在新的 js 打包方案中已经被移除了, 所以开发者必须去提供其所需的运行环境, 笔者所做的处理如下:

```
yarn add node-libs-expo -D
yarn add react-native-get-random-values -D
yarn add react-native-crypto -D
```



metro.config.js

```
const { getDefaultConfig } = require('@expo/metro-config');
// 先获取 expo 的默认配置项, 否则会报错
const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.extraNodeModules = require("node-libs-expo")

module.exports = defaultConfig;

```



shim.js (在 app.js 入口处第一个导入进来)

```
import 'react-native-get-random-values'

const isWeb = typeof window != 'undefined'
if (!isWeb) {
  require('node-libs-expo/globals')
  const { encode, decode } = require('base-64')
  global.atob = decode
  global.btoa = encode

// Needed so that 'stream-http' chooses the right default protocol.
  global.location = {
    protocol: 'file:',
  }
  require("react-native-crypto")

  global.navigator.userAgent = 'React Native'
}

global.process = require('process')
global.process.slice = (start, end) => Array.prototype.slice(start, end)
global.Buffer = require('buffer').Buffer
```

### 弹窗内第一次点击事件无效

这个问题笔者一度认为是手滑没有点到, 直到一次偶然才发现第一次点击必定失效, 于是笔者开始寻求最小复现方式, 最后终于发现仅在弹窗(Modal)中是可以触发的, 但是一旦放在页面中就无法打开, 于是继续删除页面的多余内容, 最后只剩最外层的 Scrollview 后终于发现了稳定的复现方式, 即将 `Modal` 包裹与 `Scrollview` 中, 于是顺腾摸瓜, 找到了这个 [issue](https://github.com/react-native-modal/react-native-modal/issues/416), 文中提到 `Scrollview` 和 `Flatlist` 提供了 `keyboardshouldpersisttaps` 属性, 这个属性可以控制在弹出软键盘时点击屏幕时的处理方式, 中文文档如下

### [keyboardShouldPersistTaps](https://reactnative.cn/docs/scrollview#keyboardshouldpersisttaps)

如果当前界面有软键盘，那么点击 scrollview 后是否收起键盘，取决于本属性的设置。（译注：很多人反应 TextInput 无法自动失去焦点/需要点击多次切换到其他组件等等问题，其关键都是需要将 TextInput 放到 ScrollView 中再设置本属性）

- `'never'` （默认值），点击 TextInput 以外的子组件会使当前的软键盘收起。此时子元素不会收到点击事件。
- `'always'`，键盘不会自动收起，ScrollView 也不会捕捉点击事件，但子组件可以捕获。
- `'handled'`，当点击事件被子组件捕获时，键盘不会自动收起。这样切换 TextInput 时键盘可以保持状态。多数带有 TextInput 的情况下你应该选择此项。
- `false`，已过时，请使用'never'代替。
- `true`，已过时，请使用'always'代替。

虽然将 `keyboardshouldpersisttaps` 设置为 `handled`解决了笔者的实际问题, 但是此时还有一个问号放在笔者心中, 可以看到 `keyboardshouldpersisttaps 默认值为 `never`, 实际开发的页面也没有显示软键盘, 为什么还要设置这个属性才能让点击事件生效?

### Expo 的扫码闪退

最开始我是使用 [expo-barcode-scanner](https://docs.expo.dev/versions/latest/sdk/bar-code-scanner/) 处理扫码功能, 后来发现 [expo-barcode-scanner](https://docs.expo.dev/versions/latest/sdk/bar-code-scanner/) 这个 Modal 切换之后打次打开会黑屏, 随换成 [expo-camera]https://docs.expo.dev/versions/latest/sdk/camera/ , 但是 expo-canera 在 expo 43 之后需要安装 `expo-face-detector` 和 expo-barcode-scanner 才能正常工作, 否则会直接 clash, 于是笔者又换回 `expo-barcode-scanner`, 并且在探索中发现只要将 Modal 的 visible 等待 100ms 后在修改才可以避免二次打开黑屏, 除了这种 hack 方式只能等待 expo 更新才能解决了.

相关 issue https://github.com/expo/expo/issues/15706

### 字体缩放

在项目接近尾声时, 突然接了一个离谱的需求, 要让字体在所有手机上都尽可能的保持一致





















































