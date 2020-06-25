# 使用 Bob 创建 React Native 模块，并且发布至 NPM

* \[时间\]: 2020/06/25
* \[keyword\]: React Native, Guide, 前端, Typescript

> 文章名可能会被误认为是如何开发 RN 的原生模块，这里提醒一下本文主要分享是 [bob](https://github.com/react-native-community/bob) 的使用过程以及笔者遇到的坑记录

## 前言

相比很多小伙伴都和笔者遇到过同样的问题，**开发RN模块的流程应该是什么样？**

在很久之前 RN CLI 提供了 `new-library` 的命令，笔者基于这种形式开发了 [react-native-uhf-helper](https://github.com/MonchiLin/react-native-uhf-helper) [react-native-amap-search](https://github.com/MonchiLin/react-native-amap-search) 两个模块，当时笔者开发前端模块的经验也不充足，稀里糊涂的开发完就没在深入研究了，恰好前不久笔者对一个年久失修的模块进行了重写，也算是有机会再次发布一个 RN 模块，RN 的社区资源还是很完善的，[社区组织](https://github.com/react-native-community)也是发布了很多高质量的 RN 模块，于是笔者就虽然打开了一个项目([react-native-tab-view](https://github.com/react-native-community/react-native-tab-view))研究其开发方式，经过调查，发现社区的大多数模块都是使用 [bob](https://github.com/react-native-community/bob) 作为 `cli` 开发的，于是笔者也正式开始了开发工作。



## bob 简介

https://github.com/react-native-community/bob

bob 集成了 expo、eslint、ESLint、prettier、Typescript 等优秀的 JS 生态来帮助开发者简单的进行 RN 模块的开发。



## 使用

创建模块

```
npx @react-native-community/bob create react-native-awesome-module
```

添加到已存在的项目，更多请参考 https://github.com/react-native-community/bob#configuring-an-existing-project

```
yarn add --dev @react-native-community/bob
cd yourProject && bob init
```

是的，到此为止你就已经创建了一个用于开发 RN 模块的项目，这个项目已经集成了 ESLint、Typescript ...，通过 `yarn prepare` 就可以生成用于发布的 .js .d.ts 文件。

## 发布至 npm

发布至 npm 是使用的 [release-it](https://github.com/release-it/release-it), [release-it](https://github.com/release-it/release-it) 提供了简单方式来帮助你发布至 npm，管理 change log ...，bob 已经帮我们配置好了，我们只需要执行

```
yarn release
```

嗯？似乎哪里不对劲，报错了（如果不是下面这个错就无视下面这段）

```
ERROR Not authenticated with npm. Please `npm login` and try again.
```

这表示我们还没有登录 npm 账户（如果你还没有，可以在这里注册：https://www.npmjs.com/signup），现在执行

```
npm login // 进入命令行交互模式
Username: your username // 输入你的 npm 用户名，按回车
Password:               // 输入你的密码，这里你输入是不会显示的，输入完后按回车即可
Email:                  // 输入邮箱
// 提示 "Logged in as 用户名 on https://registry.npmjs.org/." 即表示成功
// 这时输入 npm whoami 即可看到登录的账户
```

好的，我们再次执行

```
yarn release
```

嗯哼？又报错，有完没完了！！！！（如果不是下面这个错就无视下面这段）

```
ERROR Environment variable "GITHUB_TOKEN" is required for GitHub releases.
Documentation: https://github.com/release-it/release-it#github-releases
```

这里报错的同时也贴出了解决办法，我们点进去看看，笔者发现 [release-it](https://github.com/release-it/release-it) 为了能帮我们自动打 tag，自动发布 release，需要有仓库的访问权限，github 提供了基于 token 的方式使三方应用不需要登录密码也可以访问仓库的功能。

#### 生成 token

首先打开：https://github.com/settings/tokens

选择左侧 [Personal access tokens](https://github.com/settings/tokens) -> Generate new token

![1593074335253.jpg](https://raw.githubusercontent.com/MonchiLin/arsenal/master/1593074335253.jpg1593074352386.jpg)

然后点击最下方的 Generate token，即可生成

![QQ20200625-164116.png](https://raw.githubusercontent.com/MonchiLin/arsenal/master/QQ20200625-164116.png1593074488118.png)

保存你的 token，然后在项目根目录（package.json）的目录下创建一个 .env 文件，将其加在 .gitignore 里面（即最后加一行 .env，因为这是你的 github token 不要上传到互联网，否则有安全问题）

内容为：

```
GITHUB_TOKEN="你刚刚复制的 token"
```

然后安装 dotenv-cli

```
yarn add dotenv-cli --dev
```

 将 package.json script 的 release 修改为: `dotenv release-it`（原始应为 `release-it`）

原理是因为 release-it 在运行的时候会在环境变量里读取一个名字叫做 `GITHUB_TOKEN` 的环境变量，我们使用 `dotenv-cli`所做的事就是帮我们把 .env 文件内容添加到环境变量，所以`dotenv release-it` 其实等价于 `export GITHUB_TOKEN="f941e0..." && release-it`，不过 `Windows` 不支持 `export`，并且如果我们每次发布一个包都要手动 `export GITHUB_TOKEN=xx && release-it` 也太过于麻烦，所以建议使用 `dotenv-cli`。

#### 再次执行 release

```
yarn release
```

好的，如果成功了的话，效果如小图。

![1593075438546.jpg](https://raw.githubusercontent.com/MonchiLin/arsenal/master/1593075438546.jpg1593075446208.jpg)



## 尾声

好了，本文到此就结束了，下面给自己打一个小广告，前段时间写了一个 RN 的模块，fork 自开源库，并且进行了完全(99%) 的重写，笔者也经过了调查，可能是最好的（违反广告法警告⚠️）RN Dropdown 库，如果有需求可以试试：

https://github.com/MonchiLin/react-native-dropdown

接下来的时间笔者会增加更多的案例以及完善文档，目前虽然版本只有 0.2.2，但是笔者自己也在项目中使用多次，质量方面可以放心，并且 api 已经确定下来了。

