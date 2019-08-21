import { join } from "path"
import { ASSET_FOLDER } from "../../project/constants"
import chokidar from "chokidar"

export const createSkinWatcher = (temp: string) => {
  const assetsPath = join(temp, ASSET_FOLDER)
  const watcher = chokidar.watch(assetsPath)

  console.info(`Watching assets at: ${assetsPath}`)
  return watcher
}
