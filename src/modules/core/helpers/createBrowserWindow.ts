import { BrowserWindow, nativeImage } from "electron"
import { IN_PRODUCTION, LOGO_PATH } from "../constants"

const logo = nativeImage.createFromPath(LOGO_PATH)

export function createBrowserWindow() {
  const instance = new BrowserWindow({
    title: "Circlebrush",
    icon: logo,
    show: true,
    frame: false,
    minWidth: 500,
    minHeight: 400,
    backgroundColor: "#000",
    webPreferences: {
      webSecurity: IN_PRODUCTION,
      nodeIntegration: true,
    },
  })

  if (IN_PRODUCTION) {
    instance.loadFile("./build/index.html")
  } else {
    instance.loadURL(`http://localhost:9000/`)
  }

  return instance
}
