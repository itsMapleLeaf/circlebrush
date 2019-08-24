import { ImageElementData } from "../types/ImageElementData"
import { ASSET_FOLDER } from "../../project/constants"
import { join, parse } from "path"
import { ANIMATION_NAMING_EDGECASES, HD_SUFFIX } from "../constants"
import { copy, pathExists } from "fs-extra"
import { range } from "../../../common/lang/array/range"

/**
 * Copies an image element correctly to the asset folder
 * accounting for frames.
 */
export const copyImageAsset = async (data: ImageElementData, temp: string) => {
  const { name, path, sequence, highDefinition } = data
  const { dir } = parse(path)

  const newPath = join(temp, ASSET_FOLDER, `${name}.png`)
  await copy(path, newPath)

  if (sequence) {
    const { frames } = sequence

    const isEdgecase = ANIMATION_NAMING_EDGECASES.includes(name)

    const promises = range(frames.length).map(async frame => {
      /** Part of the path without suffix */
      const pathFragment = join(dir, `${name}${isEdgecase ? "" : "-"}${frame}`)

      /** Only copy the HD frame if the static image is HD and the frame exists */
      const hasHD = await pathExists(`${pathFragment}${HD_SUFFIX}.png`)
      const conditionalHdSuffix = highDefinition && hasHD ? HD_SUFFIX : ""

      /** Where the frame is located */
      const framePath = `${pathFragment}${conditionalHdSuffix}.png`

      return copy(framePath, join(temp, ASSET_FOLDER, `${name}-${frame}.png`))
    })

    await Promise.all(promises)
  }
}
