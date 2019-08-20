import { remote } from "electron"
import { getManager } from "../../../common/state/helpers/getManager"

export const importSkinFolder = async () => {
  const { dialog } = remote
  const { projectStore } = getManager().stores

  try {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"]
    })

    const { filePaths } = result

    if (filePaths) {
      await projectStore.createFromSkinFolder(filePaths[0])
    }
  } catch {
    return
  }
}
