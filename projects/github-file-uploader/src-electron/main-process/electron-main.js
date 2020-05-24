import {app, BrowserWindow, nativeTheme} from 'electron'

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) {
}

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require('path').join(__dirname, 'statics').replace(/\\/g, '\\\\')
}

let mainWindow

async function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 1000,
    useContentSize: true,
    // frame: false,
    webPreferences: {
      // Change from /quasar.conf.js > electron > nodeIntegration;
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: QUASAR_NODE_INTEGRATION,
      nodeIntegrationInWorker: QUASAR_NODE_INTEGRATION,
      webSecurity: false
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      // preload: path.resolve(__dirname, 'electron-preload.js')
    }
  })


  // 避免访问 github 跨域
  // const filter = {
  //   urls: ['*://*.github.com/*']
  // };
  // const session = mainWindow.webContents.session
  // session.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
  //   details.requestHeaders['Origin'] = null;
  //   // console.log("?????", details.requestHeaders)
  //   callback({ requestHeaders: details.requestHeaders })
  // });
  // session.webRequest.onCompleted(filter, (details, callback) => {
  //   // console.log("?????", details.requestHeaders)
  //   callback({ requestHeaders: details.requestHeaders })
  // });

  mainWindow.loadURL(process.env.APP_URL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// app.commandLine.appendSwitch('proxy-server', '127.0.0.1:1086')

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
