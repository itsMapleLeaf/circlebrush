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
import { Progress } from "../../../common/state/classes/Progress"
import { ImportSkinFolderProgressSections } from "../../project/actions/importSkinFolder"
import { progressArray } from "../../../common/state/helpers/progressArray"

export class AnimatedImageElement extends SkinElement<
  "animation",
  AnimatedImageElementData
> {
  /** Path to the generated spritesheet */
  @observable public preview: string = ""

  /**
   * Creates AnimatedImageElements from a list of existing skin image element paths
   */
  public static async createFromPathList(
    paths: string[],
    options: SkinElementOptions,
    progress: Progress<ImportSkinFolderProgressSections>,
  ) {
    const { temp } = options
    const imagePaths = paths.filter(p => p.endsWith(".png"))

    progress.setMessage("Parsing animations...")
    const parsed = await parseFramePaths(imagePaths, temp)

    return progressArray(
      async data => {
        progress.setMessage(`Copying frame assets for ${data.name}...`)
        await copyFrameAssets(data.name, data.frames, temp)

        const element = new AnimatedImageElement(data, options)

        progress.setMessage(`Creating animation sprite sheet for ${data.name}...`)
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

  public get frameDimensions() {
    const { frames } = this

    const frameWidth = Math.max(...frames.map(x => x.width))
    const frameHeight = Math.max(...frames.map(x => x.height))

    return {
      width: frameWidth,
      height: frameHeight,
    }
  }

  public async build() {}
}
