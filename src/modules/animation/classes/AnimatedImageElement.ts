import { SkinElement, SkinElementOptions } from "../../skin/classes/SkinElement"
import { AnimatedImageElementData } from "../types/AnimatedImageElementData"
import { observable } from "mobx"
import { parseFramePaths } from "../helpers/parseFramePaths"
import { remove } from "fs-extra"
import { getPreviewPath } from "../../imagery/helpers/getPreviewPath"
import { createSpriteSheet } from "../helpers/createSpriteSheet"
import { join } from "path"
import { ASSET_FOLDER } from "../../project/constants"
import { FrameData } from "../types/FrameData"
import { copyFrameAssets } from "../helpers/copyFrameAssets"

export class AnimatedImageElement extends SkinElement<
  "animation",
  AnimatedImageElementData
> {
  /** Path to the generated spritesheet */
  @observable public preview: string = ""

  /**
   * Creates AnimatedImageElements from a list of existing skin image element paths
   */
  public static async createFromPathList(paths: string[], options: SkinElementOptions) {
    const { temp } = options

    const imagePaths = paths.filter(p => p.endsWith(".png"))
    const parsed = await parseFramePaths(imagePaths, temp)

    return Promise.all(
      parsed.map(async data => {
        await copyFrameAssets(data.name, data.frames, temp)
        const element = new AnimatedImageElement(data, options)

        // do stuff here
        await element.updatePreview()

        return element
      }),
    )
  }

  /**
   * Creates a sprite sheet preview for the animation
   */
  public async updatePreview() {
    const { options } = this
    const { temp } = options

    if (this.preview) {
      await remove(this.preview)
    }

    const newPath = getPreviewPath(temp, this.name, "png")
    await createSpriteSheet({ dest: newPath, frames: this.frames })

    this.preview = newPath
  }

  public get frames(): FrameData[] {
    const { frames, name } = this.data
    const { temp } = this.options

    return frames.map((frame, i) => {
      const path = join(temp, ASSET_FOLDER, `${name}-${i}.png`)
      return { ...frame, path }
    })
  }

  public async build() {}
}
