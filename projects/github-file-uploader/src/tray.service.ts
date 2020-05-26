import fs from 'fs-extra'

const {remote, nativeImage} = require('electron')
const {Tray, Menu, MenuItem, app, getCurrentWindow} = remote
const {join} = require("path")


class TrayService {
  win = getCurrentWindow()
  tray = new Tray(join(__dirname, "assets", "state-ok-20.png"))

  constructor() {
    const {win, tray} = this

    const toggleWindow = () => {
      if (win.isVisible()) {
        win.hide()
      } else {
        showWindow()
      }
    }

    const showWindow = () => {
      const trayPos = tray.getBounds()
      const windowPos = win.getBounds()
      let x;
      let y = 0
      if (process.platform === 'darwin') {
        x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
        y = Math.round(trayPos.y + trayPos.height)
      } else {
        x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
        y = Math.round(trayPos.y + trayPos.height * 10)
      }

      win.setPosition(x, y, false)
      win.show()
      win.focus()
    }

    tray.on('click', function (event) {
      toggleWindow()

      // Show devtools when command clicked
      if (win.isVisible() && process.defaultApp && event.metaKey) {
        win.webContents.openDevTools({mode: 'detach'})
      }
    })

    tray.on('drop-files', (event, files: string[]) => {
      files.map(async abPath => {
        const file = await fs.readFileSync(abPath)
console.log(file)
        return 0
      })
    })

    win.on('blur', () => {
      if (!win.webContents.isDevToolsOpened()) {
        win.hide()
      }
    })
  }
}

export default TrayService