import { SkinElement, SkinElementOptions } from "../../skin/classes/SkinElement"
import { AnimatedImageElementData } from "../types/AnimatedImageElementData"
import { observable } from "mobx"
import { parseFramePaths } from "../helpers/parseFramePaths"

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
    const parsed = await parseFramePaths(imagePaths)

    return [] as AnimatedImageElement[]
  }

  public async build() {}
}
