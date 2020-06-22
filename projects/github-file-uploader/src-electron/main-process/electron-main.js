import {app, BrowserWindow, ipcMain, nativeTheme} from 'electron'
import HttpsProxyAgent from "https-proxy-agent";
import fetch from 'node-fetch'

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

let proxies = ""
let mainWindow

async function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 500,
    height: 700,
    useContentSize: true,
    // frame: false,
    enableRemoteModule: true,
    webPreferences: {
      // Change from /quasar.conf.js > electron > nodeIntegration;
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,
      nodeIntegrationInWorker: true
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      // preload: path.resolve(__dirname, 'electron-preload.js')
    }
  })

  ipcMain.on("set-proxies", (event, newProxies) => {
    proxies = newProxies
    mainWindow.webContents.session.setProxy({proxyRules: proxies})
  })

  ipcMain.on("close-proxies", (event,) => {
    proxies = ""
    mainWindow.webContents.session.setProxy({})
  })

  ipcMain.on("ping-github", ({sender}) => {
    fetch("https://github.com/git-guides", {
      agent: proxies && new HttpsProxyAgent(proxies),
      timeout: 3000
    })
      .then(res => {
        sender.send("pong-github", {isSuccess: true, res: res})
      })
      .catch(err => {
        sender.send("pong-github", {isSuccess: false, res: err})
      })
  })

  ipcMain.on("ping-ip", ({sender}) => {
    fetch("http://myip.ipip.net", {
      agent: proxies && new HttpsProxyAgent(proxies),
    })
      .then(res => {
        return res.text()
      })
      .then(res => {
        sender.send("pong-ip", {isSuccess: true, res: res})
      })
      .catch(err => {
        sender.send("pong-ip", {isSuccess: false, res: err})
      })
  })

  mainWindow.loadURL(process.env.APP_URL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady()
  .then(() => createWindow())

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
    return
  }
  if (!mainWindow.isVisible()) {
    mainWindow.show()
  }
})
