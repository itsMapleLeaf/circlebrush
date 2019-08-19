import { remote } from "electron"

/** Returns the current BrowserWindow instance */
export const useInstance = () => {
  return remote.getCurrentWindow()
}
