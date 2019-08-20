import { remote } from "electron"

export const exit = () => {
  remote.getCurrentWindow().close()
}
