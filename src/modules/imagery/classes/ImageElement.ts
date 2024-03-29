import sharp from "sharp"
import { join } from "path"
import { copy, remove } from "fs-extra"

import { SkinElement, SkinElementOptions } from "../../skin/classes/SkinElement"
import { ImageElementData } from "../types/ImageElementData"

import { parseImagePaths } from "../helpers/parseImagePaths"
import { BUILD_FOLDER, ASSET_FOLDER } from "../../project/constants"
import { observable, computed } from "mobx"
import { buildImageElement } from "../image-helpers/buildImageElement"
import { copyImageAsset } from "../helpers/copyImageAsset"
import { Progress } from "../../../common/state/classes/Progress"
import { getPreviewPath } from "../helpers/getPreviewPath"
import { ImportSkinFolderProgressSections } from "../../project/actions/importSkinFolder"
import { progressArray } from "../../../common/state/helpers/progressArray"

/**
 * Represents a skin image element, such as a .png
 */
export class ImageElement extends SkinElement<"image", ImageElementData> {
  @observable public preview: string = ""

  /**
   * Creates ImageElements from a list of existing skin image element paths
   */
  public static async createFromPathList(
    paths: string[],
    options: SkinElementOptions,
    progress: Progress<ImportSkinFolderProgressSections>,
  ) {
    const { temp } = options
    const imagePaths = paths.filter(p => p.endsWith(".png"))

    progress.setMessage("Parsing images...")
    const parsed = await parseImagePaths(imagePaths)

    return progressArray(
      async data => {
        const finalData = {
          type: "image" as const,
          ...data,
        }

        progress.setMessage(`Copying ${data.name}...`)
        await copyImageAsset(finalData, temp)

        const element = new ImageElement(finalData, options)

        progress.setMessage(`Creating preview for ${data.name}...`)
        await element.updatePreview()

        return element
      },
      {
        progress,
        arr: parsed,
      },
    )
  }

  /**
   * Refresh the preview image for the element
   */
  public async updatePreview() {
    const { options } = this
    const { temp } = options

    if (this.preview) {
      await remove(this.preview)
    }

    const newPath = getPreviewPath(temp, this.name, "png")
    await copy(this.assetPath, newPath)

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

  /**
   * The path to the asset
   */
  @computed
  public get assetPath() {
    const { temp } = this.options
    const { name } = this.data

    return join(temp, ASSET_FOLDER, `${name}.png`).replace(/\\/g, "/")
  }
}
