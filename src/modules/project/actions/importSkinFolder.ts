import { remote } from "electron"
import { StoreManager } from "../../../common/state/classes/StoreManager"

export const importSkinFolder = async (manager: StoreManager) => {
  const { dialog } = remote
  const { projectStore } = manager.stores

  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  })

  const { filePaths } = result

  if (filePaths && filePaths.length > 0) {
    await projectStore.createFromSkinFolder(filePaths[0])
  }
}
