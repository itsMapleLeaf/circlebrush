import { remote } from "electron"
import { StoreManager } from "../../../common/state/classes/StoreManager"
import { Progress } from "../../../common/state/classes/Progress"
import { ProgressModal } from "../../../common/state/components/ProgressModal"
import React from "react"

export type ImportSkinFolderProgressSections =
  | "create-temp-folders"
  | "reading-directory"
  | "parsing-ini"
  | "processing-images"
  | "processing-animations"

export const importSkinFolder = async (manager: StoreManager) => {
  const { dialog } = remote
  const { projectStore } = manager.stores

  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  })

  const { filePaths } = result

  if (filePaths && filePaths.length > 0) {
    const progress = new Progress<ImportSkinFolderProgressSections>({
      message: "Importing skin folder...",
      sections: [
        "create-temp-folders",
        "reading-directory",
        "parsing-ini",
        "processing-images",
        "processing-animations",
      ],
    })

    const close = manager.stores.modalStore.spawn({
      name: "import-skin",
      render: () => <ProgressModal progress={progress} />,
    })

    await projectStore.createFromSkinFolder(filePaths[0], progress)
    close()
  }
}
