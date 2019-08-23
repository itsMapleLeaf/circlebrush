import { join } from "path"
import { copy, remove } from "fs-extra"

import { SkinElement, SkinElementOptions } from "../../skin/classes/SkinElement"
import { ImageElementData } from "../types/ImageElementData"

import { builtInMeta } from "../../skin/builtins"
import { parseImagePaths } from "../helpers/parseImagePaths"
import { ASSET_FOLDER, PREVIEW_FOLDER, BUILD_FOLDER } from "../../project/constants"
import { getHash } from "../../../common/lang/string/getHash"
import { observable } from "mobx"
import { buildImageElement } from "../image-helpers/buildImageElement"
import { copyImageAsset } from "../helpers/copyImageAsset"

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
        const { name } = data

        const builtinData = builtInMeta.find(data => data.name === name) || {}
        const finalData = {
          ...data,
          ...builtinData,
        }

        await copyImageAsset(finalData, temp)

        const element = new ImageElement(finalData, options)
        await element.updatePreview()

        return element
      })
    )

    return result
  }

  /**
   * Refresh the preview image for the element
   */
  public async updatePreview() {
    const { temp } = this.options

    if (this.preview) {
      await remove(this.preview)
    }

    const hash = getHash(16)
    const name = `${this.alias}-${hash}.png`
    const newPath = join(temp, PREVIEW_FOLDER, name)

    await copy(this.assetPath, join(temp, PREVIEW_FOLDER, name))
    this.preview = newPath
  }

  /**
   * Creates the final files for this element
   */
  public async build() {
    const { temp } = this.options
    const { name } = this.data

    const dest = join(temp, BUILD_FOLDER)
    await buildImageElement({ path: this.assetPath, name, dest })
  }
}
