import { app, BrowserWindow, ipcMain } from "electron"
import { createBrowserWindow } from "./modules/core/helpers/createBrowserWindow"

let instance: BrowserWindow | null

app.on("window-all-closed", () => {
  if (process.env.NODE_ENV !== "production") {
    instance = createBrowserWindow()
  }

  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (instance === null) {
    createBrowserWindow()
  }
})

app.on("ready", () => {
  createBrowserWindow()
})

ipcMain.on("stores", (_, data) => {
  ;(global as any).__SERIALIZED_STORES__ = data
})
