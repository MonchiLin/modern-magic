import fs from 'fs-extra'
import {remote} from 'electron'
import path from 'path'
import {vueStore} from "src/store";
import {getFileRecord} from "src/common";

const {Tray, Menu, MenuItem, nativeImage, app, getCurrentWindow} = remote

const mainWindow = getCurrentWindow()
const logo = nativeImage.createFromPath(path.resolve(path.join(__dirname, "assets", "state-ok-20.png")))

const tray = new Tray(logo)

const contextMenu = Menu.buildFromTemplate([
  {label: '关于', click: () => console.log("?????")},
  {label: 'Separator', type: 'separator'},
  {label: '退出', role: 'quit', click: () => remote.app.quit()},
]);

class TrayService {
  constructor() {
    const toggleWindow = () => {
      if (mainWindow.isVisible()) {
        mainWindow.hide()
      } else {
        showWindow()
      }
    }

    const showWindow = () => {
      const trayPos = tray.getBounds()
      const windowPos = mainWindow.getBounds()
      let x;
      let y;
      if (process.platform === 'darwin') {
        x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
        y = Math.round(trayPos.y + trayPos.height)
      } else {
        x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
        y = Math.round(trayPos.y + trayPos.height * 10)
      }

      mainWindow.setPosition(x, y, false)
      mainWindow.show()
      mainWindow.focus()
    }

    tray.on('click', function (event) {
      toggleWindow()

      // Show devtools when command clicked
      if (mainWindow.isVisible() && process.defaultApp && event.metaKey) {
        mainWindow.webContents.openDevTools({mode: 'detach'})
      }
    })

    tray.on('drop-files', (event, files: string[]) => {
      files.forEach(async abPath => {
        vueStore.commit('addFile', getFileRecord(abPath))
      })
    })

    mainWindow.on('blur', () => {
      if (!mainWindow.webContents.isDevToolsOpened()) {
        mainWindow.hide()
      }
    })

    tray.on('right-click', (event) => tray.popUpContextMenu(contextMenu));
  }
}

export default TrayService
