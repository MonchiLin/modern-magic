# wsl 下配置 lerna+yarn-workspace+electron+react+ts

> 本文仅适合想在 wsl 下配置 lerna+electron 或者 lerna+yarn-workspace+electron 
的同学阅读, 如果您不满足上面三项中的一项或者您对上面任何一点都不了解因为并不会教授如何一步一步从头配置, 那么本文对您可能意义不大, 
如果有兴趣学习 lerna 的最佳实践请移步至 [lerna 的最佳实践]() 篇.

## electron 系列与 yarn-workspace 兼容性问题

[yarn-workspace](https://yarnpkg.com/lang/en/docs/workspaces/) 是一个相当优雅的
 monorepo 的前端解决方案, 如下图, project1, project2, project3 
 的 node_modules 都会被提升(hoiste)至根项目.
```
.
├── package.json
├── node_modules  # 看这里
├── projects
│   ├── project1
│   │   ├── file1
│   │   └── file2
│   │   └── package.json
│   ├── project2
│   │   ├── file1
│   │   └── file2
│   │   └── package.json
│   ├── project3
│   │   ├── file1
│   │   └── file2
│   │   └── package.json
├── yarn.lock

```
 
 此时就遇到了第一个坑, electron 的模块解析不是根据 node 的标准来的, 而是只解析当前目录(行为如此, 待验证), 
 细心的小伙伴可能就发现了, 使用 yarn-workspace 之后,module 全都在根目录, electron 就会报错, 这时候如果不想丢掉 yarn-workspace 带来的好处, 又想解决问题,
 就要用到 [nohoist](https://yarnpkg.com/blog/2018/02/15/nohoist/), `nohoist` 是 yarn 官方预料到现在这种情况后给出的应对措施, 我们
 需要在根目录的 package.json 的重新配置 `workspaces`, 增加 `nohoist` 对象, 
 这个对象用于匹配不提升的 node_modules, 笔者的配置如下

``` json
  "workspaces": {
    "packages": [     
      "projects/*"
    ],
    "nohoist": [  # 这里告诉 yarn 不会被提升的库
      "**/electron",
      "**/electron/**",
      "**/electron-*",
      "**/electron-*/**",
      "**/@electron",
      "**/@electron/**",
      "**/@electron-*",
      "**/@electron-*/**"
    ]
  }
```

`**/electron` 表示仅匹配到 electron 这个库, 所以 electron 不会被提升至根目录.

`**/electron/**` 表示仅匹配到 electron 这个库和 electron 所以来的所有库, 所以 electron 和 electron 所以来的所有库都不会被提升至根目录.

## wsl 与 electron 的问题

[问题的主要原因](https://stackoverflow.com/questions/49936910/unable-to-run-electron-quick-start-in-wsl) electron 启动时需要运行一个 chrome 窗口,
 不过 wsl 并不能直接运行图形化程序 :sad, 所以需要安装图形化服务, 请注意, 这里有很大的坑, 
 笔者大概折腾了一下午才折腾好而其中的主要原因就是在研究这个问题, 看了很多帖子例如 [这个](https://www.kame-tech.com/blog/2018-10-23-windows-subsystem-for-linux-wsl-%E3%81%A7-electron/), 
 网上有些帖子说可以直接跑起来, 但是笔者并没有成功, 只好用了这个 [方案](https://github.com/electron-userland/electron-prebuilt/issues/260#issuecomment-335159024), 这个方案会安装 windows 版本的 electron,
 为什么用 "只好" 两个字来形容, 因为有点不爽吧, 折腾了好久 wsl 最后又要用 windows 版的解决方案, 不过这个确实是最佳实践咯.
 
 进入 electron 目录, 然后手动 
 ```
 npm install && npm uninstall electron && export npm_config_platform=win32 && npm install electron --save-dev && unset npm_config_platform
 ```
 
 嫌麻烦可以在 package.json 加个命令, 例如:
 ``` json
 "install-wsl": "npm install && npm uninstall electron && export npm_config_platform=win32 && npm install electron --save-dev && unset npm_config_platform"
 ```
 
## TS + React + HotReload

这个没什么坑, 直接粘贴我的配置就好了, 无非就是安装依赖配置 webpack, google 或者粘贴我的配置都可以(我的基于 electron-forge).

项目结构
```
.
├── package-lock.json
├── package.json
├── public
│   └── index.html
├── src
│   ├── app.tsx
│   ├── css
│   │   └── app.css
│   ├── layout
│   │   └── index
│   ├── main.ts
│   ├── renderer.tsx
│   └── views
├── tsconfig.json
├── webpack.main.config.js
├── webpack.renderer.config.js
├── webpack.rules.js
└── yarn.lock
```


package.json
```json
    "config": {
    "forge": {
      "packagerConfig": {},
      "makers": [
        {
          "name": "@electron-forge/maker-squirrel",
          "config": {
            "name": "sewage_calculation"
          }
        },
        {
          "name": "@electron-forge/maker-zip",
          "platforms": [
            "darwin"
          ]
        },
        {
          "name": "@electron-forge/maker-deb",
          "config": {}
        },
        {
          "name": "@electron-forge/maker-rpm",
          "config": {}
        }
      ],
      "plugins": [
        [
          "@electron-forge/plugin-webpack",
          {
            "mainConfig": "./webpack.main.config.js",
            "renderer": {
              "config": "./webpack.renderer.config.js",
              "entryPoints": [
                {
                  "html": "./public/index.html",
                  "js": "./src/renderer.tsx",
                  "name": "main_window"
                }
              ]
            }
          }
        ]
      ]
    }
  },
  "dependencies": {
    "electron-squirrel-startup": "^1.0.0",
    "react": "^16.10.2",
    "react-dom": "^16.10.2"
  },
  "devDependencies": {
    "@babel/core": "^7.6.2",
    "@babel/plugin-proposal-class-properties": "^7.5.5",
    "@babel/plugin-proposal-decorators": "^7.6.0",
    "@babel/plugin-proposal-object-rest-spread": "^7.6.2",
    "@babel/preset-env": "^7.4.5",
    "@babel/preset-react": "^7.0.0",
    "@babel/preset-typescript": "^7.3.3",
    "@electron-forge/cli": "6.0.0-beta.45",
    "@electron-forge/maker-deb": "6.0.0-beta.45",
    "@electron-forge/maker-rpm": "6.0.0-beta.45",
    "@electron-forge/maker-squirrel": "6.0.0-beta.45",
    "@electron-forge/maker-zip": "6.0.0-beta.45",
    "@electron-forge/plugin-webpack": "6.0.0-beta.45",
    "@types/electron-devtools-installer": "^2.2.0",
    "@types/node": "^12.0.8",
    "@types/react": "^16.9.5",
    "@types/react-dom": "^16.9.1",
    "@types/webpack-env": "^1.14.0",
    "babel-loader": "8.0.6",
    "css-loader": "^3.0.0",
    "electron": "^6.0.11",
    "electron-devtools-installer": "^2.2.4",
    "file-loader": "^4.2.0",
    "fork-ts-checker-webpack-plugin": "^1.5.0",
    "node-loader": "^0.6.0",
    "react": "^16.9.0",
    "react-dom": "^16.9.0",
    "regenerator-runtime": "^0.13.3",
    "style-loader": "^0.23.1",
    "typescript": "^3.6.3",
    "webpack": "^4.41.0"
  }
```

webpack.main.config.js
```js
module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.ts',
  // Put your normal webpack config below here
  node: {
    __dirname: true,
  },
  module: {
    rules: require('./webpack.rules'),
  }
};
```

webpack.renderer.config.js
```js
const rules = require('./webpack.rules')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // Put your normal webpack config below here
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: ['node_modules'],
  },
  module: {
    rules: rules,
  },
  plugins: [new ForkTsCheckerWebpackPlugin(), new webpack.NamedModulesPlugin()],
  devtool: 'eval-source-map',
}
```

webpack.rules.js
```js
module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.([jt])s(x)?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        babelrc: false,
        presets: [
          ['@babel/preset-env', { targets: { browsers: 'last 1 version' } }],
          '@babel/preset-typescript',
          '@babel/preset-react',
        ],
        plugins: [
          // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['@babel/plugin-proposal-class-properties', { loose: true }]
        ],
      },
    },
  },
  {
    test: /\.(scss|css)$/,
    use: ["style-loader", "css-loader"],
  },
  {
    test: /\.(jpg|png|svg|ico|icns)$/,
    loader: "file-loader",
    options: {
      name: "[path][name].[ext]",
    },
  },
];
```

main.ts
```typescript
import { app, BrowserWindow } from "electron";
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: null | BrowserWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  // @ts-ignore
  // eslint-disable-next-line no-undef
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

function devToolsInstaller() {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name: any) => console.log(`Added Extension:  ${name}`))
    .catch((err: any) => console.log("An error occurred: ", err));
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();
  devToolsInstaller();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

```

app.tsx
```typescript
import * as React from "react";

import "./css/app.css";

function App() {
    return <div>good job!</div>;
}

export default App;

```

renderer.tsx
```typescript
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./app";

function render() {
    ReactDOM.render(<App/>, document.getElementById("app"));
}

render()


if (module.hot) {
    module.hot.accept(
        [
            './app.tsx',
        ],
        () => {
            render()
        });
}
```

index.html
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>你的名字</title>
</head>

<body>
<div id="app"></div>
</body>
</html>
```
