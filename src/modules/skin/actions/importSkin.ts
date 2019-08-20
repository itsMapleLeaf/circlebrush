import { remote } from "electron"
import { Skin } from "../classes/Skin"

export const importSkin = async () => {
  const { dialog } = remote

  try {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"]
    })

    const { filePaths } = result

    if (filePaths) {
      const skin = await Skin.createFromPath(filePaths[0])

      console.log({ skin })
    }
  } catch {
    return
  }
}
