# 2019 年初, 初次接触 React Native的我踩一周坑的总结

## 起因

公司没有 app 开发, 但是 app 又是一个非常重要的事情, 本来打算用 wxapp 代替, 但是出于一些特殊情况还是需要 app, 第一次写 react 的我写个 demo 居然就被派去写 app 了....
我一开始尝试了 flutter, flutter 是非常方便的, 用强类型的 dart 写起来和 Typescript 一样舒服, 比 Java 又多了一些语法糖, 唯一不爽的就是写 view 部分代码太过于难受, 看网上大佬说 如果你 view 部分代码嵌套太多层那就是你技术差 我技术是真的很差...还是用喜欢 *ml 来描述页面, 嵌套很多层也能很容易看清楚结构 (= =实际我也也不会嵌套很多层) 不仅是嵌套问题, 目前的 view 层代码很难看懂到 ide 都需要帮用户加注释来提示页面布局.

最终选择 rn 的主要原因当然也不是 view 层的代码结构问题, 而是因为我真的菜... android 除了几年前写的 demo 除此之外就没有任何了解了, flutter 生态太简单了, 嘛也没有, 而 rn 的生态可以让我在一行原生都不写的情况下把整个 app 先构建起来.
公司没有 app 开发, 但是 app 又是一个非常重要的事情, 本来打算用 wxapp 代替, 但是出于一些特殊情况还是需要 app, 第一次写 react 的我写个 demo 居然就被派去写 app 了....
我一开始尝试了 flutter, flutter 是非常方便的, 用强类型的 dart 写起来和 Typescript 一样舒服, 比 Java 又多了一些语法糖, 唯一不爽的就是写 view 部分代码太过于难受, 看网上大佬说 如果你 view 部分代码嵌套太多层那就是你技术差 我技术是真的很差...还是用喜欢 *ml 来描述页面, 嵌套很多层也能很容易看清楚结构 (= =实际我也也不会嵌套很多层) 不仅是嵌套问题, 目前的 view 层代码很难看懂到 ide 都需要帮用户加注释来提示页面布局.

最终选择 rn 的主要原因当然也不是 view 层的代码结构问题, 而是因为我真的菜... android 除了几年前写的 demo 除此之外就没有任何了解了, flutter 生态太简单了, 嘛也没有, 而 rn 的生态可以让我在一行原生都不写的情况下把整个 app 先构建起来.

## 解决方案

导航库: react-native-navigation
UI 组件库: NativeBase
阿里云推送: react-native-aliyun-push
高德地图: react-native-amap3d
高德定位: react-native-amap-geolocation
RN 动画库: react-native-animatable
collapsible / Accordion (手风琴组件): react-native-collapsible
dialog 组件: react-native-modal
notification 消息通知: react-native-push-notification
图标库: react-native-vector-icons
data engine: realm


## 坑与心得

### 我就想导个航
ok. 我们先来看官方 navigation [文档](https://facebook.github.io/react-native/docs/navigation) , 可以看出, 官方是推荐初学者上手使用 [react-navigation](https://reactnavigation.org/) 的, 然后基于做 web (pc 页面) 开发的经验我就屁颠屁颠跑过去看文档了

一看文档 好家伙, 官网首页漂亮大气, 还有中文文档, 太棒了, 然后打开文档就是 qq 群和很多乱码.. 无语 还是转战英文文档吧

跟着 Getting Started 走一遍, 然后走一遍基础教程, 就开始在项目代码中开搞了, 什么? 我要隐藏 Header 要在配置中配置: ` header: null `, 我看的一脸懵逼, 为啥不是: `visible: false`, 去网上查了下, 果然有很多人都在吐槽这个库的 api 设计, 左上角 **React Navigation 3.x** 仿佛充满了对我的鄙视, 于是继续看官方 navigation [文档](https://facebook.github.io/react-native/docs/navigation) 看到推荐的其他两个库: [NavigatorIOS](https://facebook.github.io/react-native/docs/navigatorios) 和 [react-native-navigation](https://github.com/wix/react-native-navigation) 只做 Android 端的我也没得选就决定看看 react-native-navigation 吧, 以下简称 RNN.

### Let's Go
首先就是顺着官方文档 [安装教程](https://wix.github.io/react-native-navigation/#/docs/Installing?id=android) 走一圈呗, 安装到是很顺利, 然后, 然后, 然后, 你就要开始难受, 不对, 不是只有你, 还有兄弟我陪你难受呢, 在 web 端开发我们目录结构下面一般有个文件夹叫 `pages` 用来放页面, 手机端也有个类似的词 `screen`, 是类似的意思, 我们在 web 端一般配置路由像我们主流框架都会很多库支持, 然后我们手动配置路由信息, 而在 RNN 中你需要给每个 screen 手动配置注册一遍, 就像下面这样:
```JavaScript
Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => WelcomeScreen);
```
ok, 了解完注册 screen 之后, 我们来说最可怕的一点了, 那就是路由的结构, 做惯了 web 页面看到[官方文档](https://wix.github.io/react-native-navigation/#/docs/layout-types)里这些简直一脸懵逼, 我是谁, 我在哪, 我在干啥啊?  前方辣眼睛高能!!!!!!!!!!
```javascript
export const mainScreen: LayoutRoot = {
    root: {
        bottomTabs: {
            id: "BottomTabs",
            children: [
                {
                    stack: {
                        children: [
                            {
                                component: {
                                    id: SCREENS.Home,
                                    name: SCREENS.Home,
                                    options: {
                                        bottomTab: {
                                            text: "主页",
                                            icon: require("@/assets/one.png"),
                                            selectedIcon: require("@/assets/one.png"),
                                        }
                                    }
                                }
                            },
                        ]
                    },
                }, {
                    stack: {
                        children: [
                            {
                                component: {
                                    id: SCREENS.Task,
                                    name: SCREENS.Task,
                                    options: {
                                        bottomTab: {
                                            text: "任务",
                                            icon: require("@/assets/two.png"),
                                            selectedIcon: require("@/assets/two.png"),
                                        }
                                    },
                                }
                            }
                        ]
                    },
                },
                {
                    stack: {
                        children: [
                            {
                                component: {
                                    id: SCREENS.User,
                                    name: SCREENS.User,
                                    options: {
                                        bottomTab: {
                                            text: "用户",
                                            icon: require("@/assets/three.png"),
                                            selectedIcon: require("@/assets/three.png"),
                                        }
                                    }
                                }
                            }
                        ]
                    },
                },
            ],
        },
    }
};
```
上面这段代码啥意思呢, 就是说: 
我这个是一个 layoutRoot 对象, 然后我使用 bottomTabs 布局(类似 qq wechat 那种最下面一排 tab 的布局), 然后我这个布局有三个 tab, 然后你要表明你这三个 tab 是 stack(此处同数据结构中 栈 ,先进后出) 结构,为啥要是 stack 等会再说, 然后 children 表示 stack 里面的对象, component 表示这个对象是布局类型(layout type)是组件, id, name, option 就是这个组件的属性.
我不知道你看完什么感觉, 我吐了, 不过在理解导航的设计初衷时我还是选了这个没有选 RN 官方钦定的 [react-navigation](https://reactnavigation.org/), 至于为什么选这个就等我下次更新了..... 
In  :  "当前时间戳 " + new Date().getTime()
out: "当前时间戳 1551884124811"



