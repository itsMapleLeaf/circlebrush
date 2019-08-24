import { remote } from "electron"
import { StoreManager } from "../../../common/state/classes/StoreManager"
import { Progress } from "../../../common/state/classes/Progress"
import { ProgressModal } from "../../../common/state/components/ProgressModal"
import React from "react"

export const importSkinFolder = async (manager: StoreManager) => {
  const { dialog } = remote
  const { projectStore } = manager.stores

  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  })

  const { filePaths } = result

  if (filePaths && filePaths.length > 0) {
    const progress = new Progress({
      message: "Importing skin folder...",
      total: 0,
    })

    const close = manager.stores.modalStore.spawn({
      name: "import-skin",
      render: () => <ProgressModal progress={progress} />,
    })

    await projectStore.createFromSkinFolder(filePaths[0], progress)
    close()
  }
}
