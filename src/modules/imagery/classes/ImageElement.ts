import { join } from "path"
import { copy, remove } from "fs-extra"

import { SkinElement, SkinElementOptions } from "../../skin/classes/SkinElement"
import { ImageElementData } from "../types/ImageElementData"

import { builtInMeta } from "../../skin/builtins"
import { parseImagePaths } from "../helpers/parseImagePaths"
import { ASSET_FOLDER, PREVIEW_FOLDER } from "../../project/constants"
import { getHash } from "../../../common/lang/string/getHash"
import { observable } from "mobx"

export class ImageElement extends SkinElement<ImageElementData> {
  @observable public preview: string = ""

  public static async createFromPathList(paths: string[], options: SkinElementOptions) {
    const { temp } = options
    const result: ImageElement[] = []

    const imagePaths = paths.filter(p => p.endsWith(".png"))
    const parsed = parseImagePaths(imagePaths)

    for (const data of parsed) {
      const { name } = data
      const builtinData = builtInMeta.find(data => data.name === name) || {}

      const finalData = {
        ...data,
        ...builtinData,
      }

      const element = new ImageElement(finalData, options)

      const newPath = join(temp, ASSET_FOLDER, `${element.alias}.png`)
      await copy(element.path, newPath)

      element.data.path = newPath
      await element.updatePreview()

      result.push(element)
    }

    return result
  }

  public async updatePreview() {
    const { temp } = this.options

    if (this.preview) {
      await remove(this.preview)
    }

    const hash = getHash(16)
    const name = `${this.alias}-${hash}.png`
    const newPath = join(temp, PREVIEW_FOLDER, name)

    await copy(this.path, join(temp, PREVIEW_FOLDER, name))

    this.preview = newPath
  }
}
