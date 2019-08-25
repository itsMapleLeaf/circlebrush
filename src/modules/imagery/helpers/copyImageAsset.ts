import { ImageElementData } from "../types/ImageElementData"
import { ASSET_FOLDER } from "../../project/constants"

import { join } from "path"
import { copy } from "fs-extra"

/**
 * Copies an image element correctly to the asset folder
 */
export const copyImageAsset = async (data: ImageElementData, temp: string) => {
  const { name, path } = data

  const newPath = join(temp, ASSET_FOLDER, `${name}.png`)
  await copy(path, newPath)
}
