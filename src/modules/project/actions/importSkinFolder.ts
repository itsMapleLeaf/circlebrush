import { remote, OpenDialogReturnValue } from "electron"
import { getManager } from "../../../common/state/helpers/getManager"

export const importSkinFolder = async () => {
  const { dialog } = remote
  const { projectStore } = getManager().stores

  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"]
  })

  const { filePaths } = result

  if (filePaths && filePaths.length > 0) {
    await projectStore.createFromSkinFolder(filePaths[0])
  }
}
