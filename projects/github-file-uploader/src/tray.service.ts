import {remote} from 'electron'
import path from 'path'
import {vueStore} from 'src/store';
import {getFileRecord} from 'src/common';
import anime from 'animejs';

const {Tray, Menu, nativeImage} = remote

let isProcessing = false
const mainWindow = remote.getCurrentWindow()
const logo = nativeImage.createFromPath(path.resolve(path.join(__dirname, 'assets', 'state-ok-20.png')))

const tray = new Tray(logo)

const contextMenu = Menu.buildFromTemplate([
  {label: '关于', click: () => console.log('?????')},
  {label: 'Separator', type: 'separator'},
  {label: '退出', role: 'quit', click: () => remote.app.quit()},
]);

class TrayService {
  constructor() {
    const toggleWindow = () => {
      if (isProcessing) {
        return
      }
      isProcessing = true
      if (mainWindow.isVisible()) {
        anime({
          opacity: 0,
          duration: 500,
          update: (anim) => {
            mainWindow.setOpacity((1 - Math.round(anim.progress) / 100))
          },
          complete: anim => {
            mainWindow.hide()
            isProcessing = false
          }
        })
      } else {
        const trayPos = tray.getBounds()
        const windowPos = mainWindow.getBounds()
        const x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
        const y = Math.round(trayPos.y + trayPos.height)
        mainWindow.show()
        mainWindow.setPosition(x, y, true)
        anime({
          opacity: 1,
          duration: 500,
          update: anim => {
            mainWindow.setOpacity(Math.round(anim.progress) / 100)
          },
          complete: anim => {
            mainWindow.focus()
            isProcessing = false
          }
        })
      }
    }

    tray.on('click', function (event) {
      toggleWindow()

      // Show devtools when command clicked
      if (mainWindow.isVisible() && process.defaultApp && event.metaKey) {
        mainWindow.webContents.openDevTools({mode: 'detach'})
      }
    })

    tray.on('drop-files', (event, files: string[]) => {
      files.forEach(abPath => {
       vueStore.commit('addFile', getFileRecord(abPath))
      })
    })

    tray.on('right-click', (event) => tray.popUpContextMenu(contextMenu));
  }
}

export default TrayService
