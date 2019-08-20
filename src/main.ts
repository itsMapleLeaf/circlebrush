import { app, BrowserWindow, nativeImage } from "electron"

const production = process.env.NODE_ENV === "production"

const logo = nativeImage.createFromPath("./public/logo/icon.ico")
let instance: BrowserWindow | null

function createWindow() {
  instance = new BrowserWindow({
    title: "Circlebrush",
    icon: logo,
    show: false,
    frame: false,
    minWidth: 500,
    minHeight: 400,
    backgroundColor: "#000",
    webPreferences: {
      webSecurity: production,
      nodeIntegration: true
    }
  })

  instance.on("closed", () => {
    instance = null
  })

  if (production) {
    instance.loadFile("./build/index.html")
  } else {
    instance.loadURL(`http://localhost:9000/`)
  }
}

app.on("window-all-closed", () => {
  if (process.env.NODE_ENV !== "production") {
    return createWindow()
  }

  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (instance === null) {
    createWindow()
  }
})

app.on("ready", () => {
  createWindow()
})
