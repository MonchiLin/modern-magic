# 使用 WebStorm 调试现代前端应用

* \[时间\]: 2019/10/30
* \[keyword\]: 前端, WebStorm



> 尽管现在 Chrome DevTools 调试已经足够好用了, 但是还是有几点让笔者感觉不爽:
>
> 1. 需要手动写 `debugger` 不能直接打断点 (如果你开了 eslint, 那就是车祸现场, 很难受)
> 2. 调试时看其他文件的源码不方便
> 3. 最重要的当然是统一快捷键（误）
>
> 本文适用与  **jetbrains** 家的其他 IDE, 大部分内容来源均为 WebStorm 的 [这一篇博文]( https://blog.jetbrains.com/webstorm/2018/01/how-to-debug-with-webstorm/ )



## 准备工作

1. 安装 JavaScript Debugger 插件, 找到 plugins 然后搜索 JavaScript 即可搜索到.
2. 为 Chrome 安装 [JetBrains IDE Support]( https://chrome.google.com/webstore/detail/jetbrains-ide-support/hmhgeddbohgjknpmjagkdomcpobmllji ) 扩展.
3. 点击右上角的 `Add Configuration` , 然后会弹出 `Run/Debug Configurations` 对话框, 这时候点击 `+` 号, 在列表中选择 `JavaScript Debug`.



> 上面的步骤在文章结尾处都有图片示例, 文字没看懂的可以跳到结尾看图片哦.



## 例: React

创建一个 app, 并且启动

```
npx create-react-app my-app
cd my-app
npm start
```

注: 默认情况下该 app 会运行在 3000 端口, 如果手动设置了运行端口那么下面的网址也需要改变.

重新打开 `准备工作` 的第三步, 在 `URL` 一栏中输入  http://localhost:3000 并且保存该配置, 最后点击像小虫子一样的图标就可以开始调试了.

在进入调试模式后在 ide 中的打断点下次程序执行到断点处 app 就会自动进入调试模式.


*React 成功调试截图*

![示例](https://raw.githubusercontent.com/MonchiLin/modern-magic/master/blog/assets/auto-debugger-1.png)



*Vue 成功调试截图*

![示例](https://raw.githubusercontent.com/MonchiLin/modern-magic/f9f87cc1b231d646c4eaf19f6057fb88fb68f539/blog/assets/auto-debugger-vue.png)


除了 React, Vue, Angular, Electron 都是可以调试的, 步骤也都相同.



## 可能出现的问题以及解决方法

1. 点击调试后没反应.

   * 请确定填写的调试 URL 是正确的.

2. 调试时打开的 chrome 不是正常使用的 chrome, 没有数据.(下面两个路径, 都已通过用 chrome 打开 ` chrome://version/`找到, 参考附录 `设置 chrome path 和 user_data` 部分)

   * 可能原因1:  未设置 chrome 的正确执行路径.
   * 解决方法: 打开 IDE 的设置页面, 找到 `Tools\Web Browsers`, 找到 chrome, 编辑 path 部分, 设置为正确的路径.
   * 可能原因2: 是未设置 user_data, chrome 有一个 user_data 数据, IDE 启动 chrome 的默认情况下会使用 IDE 内部的 user_data, 这就会运行一个什么数据都没有的 chrome.
   * 解决方法: 打开 IDE 的设置页面, 找到 `Tools\Web Browsers`, 找到 chrome, 点击右边的编辑图片, 勾选` Use custom user data directory`, 然后填入正确的路径即可.

3. 调试时每次都打开一个新的窗口.

   * 这个问题的原因是因为 IDE 启动 chrome 的时候会为 chrome 添加 ` --remote-debugging-port `  启动参数, 如果此时具有相同 user_data 的 chrome 启动则会新启动一个 chrome 窗口.

   * 解决方法: 先关闭 chrome, 然后通过 IDE 启动后, 使用被 IDE 启动的 chrome 即可.



### 在 vue-cli3+ 创建的项目中使用

在 `vue-cli3+` 下创建的项目开发环境下 webpack devtool 是 `cheap-module-eval-source-map`，会导致 IDE 无法定位到文件位置，从而导致调试失效，在`vue.config.js`中修改为 `source-map`即可.

1. 在项目根目录创建 `vue.config.js` 文件，如果已有则无需创建

2. 修改 `webpack devtool` 为如下代码 (如果读者使用的是 `chainWebpack` 来配置 `webpack`, 请自行搜索如果修改 `webpack 配置`。)

   ```javascript
   module.exports = {
       configureWebpack: config => {
           if (process.env.NODE_ENV === 'development') {
               config.devtool = 'source-map';
           }
       }
   };
   ```

   






## 附录

### 安装插件

![step-1]( https://raw.githubusercontent.com/MonchiLin/modern-magic/master/blog/assets/install-ide-plugins-step-1.png )

![step-2](https://raw.githubusercontent.com/MonchiLin/modern-magic/master/blog/assets/install-ide-plugins-step-2.png)



### 新增调试配置

![step-1]( https://raw.githubusercontent.com/MonchiLin/modern-magic/master/blog/assets/create-ide-configuration-1.png )

![step-2]( https://raw.githubusercontent.com/MonchiLin/modern-magic/master/blog/assets/create-ide-configuration-2.png )

![step-3]( https://raw.githubusercontent.com/MonchiLin/modern-magic/master/blog/assets/create-ide-configuration-3.png )



### 设置 chrome path 和 user_data

![如何设置 path]( https://raw.githubusercontent.com/MonchiLin/modern-magic/master/blog/assets/set-chrome-user_data_and_path-1.png )

![如何设置 path]( https://raw.githubusercontent.com/MonchiLin/modern-magic/master/blog/assets/set-chrome-user_data_and_path-2.png )

![如何设置 path]( https://raw.githubusercontent.com/MonchiLin/modern-magic/master/blog/assets/set-chrome-user_data_and_path-3.png )