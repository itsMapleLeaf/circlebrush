import { SkinElement, SkinElementData } from "../../skin/classes/SkinElement"
import { UPSCALED_TO_DOUBLE_IDENTIFIER } from "../helpers/filterSkinImages"
import { builtInMeta } from "../../skin/builtins"
import { basename, extname } from "path"

export class ImageElement extends SkinElement {
  public static createFromPathList(paths: string[]) {
    const result: ImageElement[] = []

    for (const path of paths) {
      const ext = extname(path)

      const name = basename(path, ext)
      const nameWithoutUpscale = name.replace(UPSCALED_TO_DOUBLE_IDENTIFIER, "")

      const builtinData = builtInMeta.find(data => data.name === nameWithoutUpscale) || {}

      const finalData: SkinElementData = {
        name: nameWithoutUpscale,
        upscaled: name !== nameWithoutUpscale,
        ...builtinData,
      }

      result.push(new ImageElement(path, finalData))
    }

    return result
  }
}
