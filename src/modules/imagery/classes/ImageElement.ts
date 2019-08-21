import { SkinElement } from "../../skin/classes/SkinElement"
import { builtInMeta } from "../../skin/builtins"
import { parseImagePaths } from "../helpers/parseImagePaths"

export class ImageElement extends SkinElement {
  public static createFromPathList(paths: string[]) {
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

      result.push(new ImageElement(finalData))
    }

    return result
  }
}
