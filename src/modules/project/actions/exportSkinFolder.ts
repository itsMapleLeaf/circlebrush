import { remote } from "electron"
import { StoreManager } from "../../../common/state/classes/StoreManager"
import { ensureValue } from "../../../common/lang/ensureValue"

export const exportSkinFolder = async (manager: StoreManager) => {
  const { dialog } = remote
  const { projectStore } = manager.stores

  const project = ensureValue(projectStore.project)

  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
    buttonLabel: "Save here",
  })

  const { filePaths } = result

  if (filePaths && filePaths.length > 0) {
    await project.skin.exportToFolder(filePaths[0])
  }
}
