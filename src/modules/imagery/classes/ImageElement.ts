import { join } from "path"
import { copy, remove } from "fs-extra"

import { SkinElement, SkinElementOptions } from "../../skin/classes/SkinElement"
import { ImageElementData } from "../types/ImageElementData"
import sharp from "sharp"

import { builtInMeta } from "../../skin/builtins"
import { parseImagePaths } from "../helpers/parseImagePaths"
import { PREVIEW_FOLDER, BUILD_FOLDER, ASSET_FOLDER } from "../../project/constants"
import { getHash } from "../../../common/lang/string/getHash"
import { observable } from "mobx"
import { buildImageElement } from "../image-helpers/buildImageElement"
import { copyImageAsset } from "../helpers/copyImageAsset"
import { range } from "../../../common/lang/array/range"
import { buildAnimationPreview } from "../image-helpers/buildAnimationPreview"

/**
 * Represents a skin image element, such as a .png
 */
export class ImageElement extends SkinElement<ImageElementData> {
  @observable public preview: string = ""

  /**
   * Creates ImageElements from a list of existing skin image element paths
   */
  public static async createFromPathList(paths: string[], options: SkinElementOptions) {
    const { temp } = options

    const imagePaths = paths.filter(p => p.endsWith(".png"))
    const parsed = parseImagePaths(imagePaths)

    const result = await Promise.all(
      parsed.map(async data => {
        const { name, path } = data
        const { width, height } = await sharp(path).metadata()

        const builtinData = builtInMeta.find(data => data.name === name) || {}

        const finalData = {
          width: width!,
          height: height!,
          ...data,
          ...builtinData,
        }

        await copyImageAsset(finalData, temp)

        const element = new ImageElement(finalData, options)
        await element.updatePreview()

        return element
      }),
    )

    return result
  }

  /**
   * Refresh the preview image for the element
   */
  public async updatePreview() {
    const { framePaths, options, data } = this
    const { width, height } = data
    const { temp } = options

    if (this.preview) {
      await remove(this.preview)
    }

    const hash = getHash(16)
    const name = `${this.alias}-${hash}.png`
    const newPath = join(temp, PREVIEW_FOLDER, name)

    const build = async () => {
      if (framePaths.length > 0) {
        await buildAnimationPreview({
          paths: framePaths,
          dest: newPath,
          height,
          width,
        })

        return
      }

      await copy(this.assetPath, newPath)
    }

    await build()
    this.preview = newPath
  }

  /**
   * Creates the final files for this element
   */
  public async build() {
    const { temp } = this.options
    const { name } = this.data

    const dest = join(temp, BUILD_FOLDER)
    const image = sharp(this.assetPath)

    await buildImageElement({ image, name, dest })
  }

  public get framePaths() {
    const { temp } = this.options
    const { name, frames } = this.data

    if (!frames || frames.count === 1) return []

    return range(frames.count).map(i => join(temp, ASSET_FOLDER, `${name}-${i}.png`))
  }
}
