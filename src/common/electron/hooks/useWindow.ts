import { remote } from "electron"

export const useWindow = () => {
  return remote.getCurrentWindow()
}
