import { ImageElementData } from "../types/ImageElementData"
import { ASSET_FOLDER } from "../../project/constants"
import { join, parse } from "path"
import { ANIMATION_NAMING_EDGECASES } from "../constants"
import { copy } from "fs-extra"
import { range } from "../../../common/lang/array/range"

/**
 * Copies an image element correctly to the asset folder
 * accounting for frames.
 */
export const copyImageAsset = async (data: ImageElementData, temp: string) => {
  const { name, path, frames } = data
  const { dir } = parse(path)

  const newPath = join(temp, ASSET_FOLDER, `${name}.png`)
  await copy(path, newPath)

  if (frames) {
    const { count } = frames
    const isEdgecase = ANIMATION_NAMING_EDGECASES.includes(name)

    const promises = range(count).map(frame => {
      /** Where the frame is located */
      const framePath = join(dir, `${name}${isEdgecase ? "" : "-"}${frame}.png`)

      return copy(framePath, join(temp, ASSET_FOLDER, `${name}-${frame}.png`))
    })

    await promises
  }
}
