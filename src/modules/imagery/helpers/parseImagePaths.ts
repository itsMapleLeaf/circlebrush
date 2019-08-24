import { ImageElementData } from "../types/ImageElementData"
import { getStrippedFilename } from "../../../common/lang/string/getStrippedFilename"
import { HD_SUFFIX } from "../constants"
import { filterDownscaled } from "./filterDownscaled"
import { nameIsAnimation } from "../../animation/helpers/nameIsAnimation"
import { getStrippedImageName } from "./getStrippedImageName"
import sharp from "sharp"

export type ImageParseData = {
  name: string
  path: string
  width: number
  height: number
  highDefinition: boolean
}

export type ImageDataFromParse = Omit<ImageElementData, "type">

/**
 * Parses the path and attempts to guess what the image is for
 */
export const parseImagePath = (path: string) => {
  const strippedName = getStrippedFilename(path).toLowerCase()

  const highDefinition = strippedName.includes(HD_SUFFIX)
  const name = strippedName.replace(HD_SUFFIX, "")

  return { name, path, highDefinition }
}

/**
 * Creates the final ImageElement data
 */
export const createDataFromParse = async (
  data: Omit<ImageParseData, "width" | "height">,
): Promise<ImageDataFromParse> => {
  const { name, path, highDefinition } = data

  const { width, height } = await sharp(path).metadata()

  return {
    highDefinition,
    width: width!,
    height: height!,
    name,
    path,
  }
}

export const parseImagePaths = async (paths: string[]): Promise<ImageDataFromParse[]> => {
  const filteredPaths = paths.filter((path, _, others) => {
    const name = getStrippedImageName(path)
    const isAnimation = nameIsAnimation(name, others)

    return filterDownscaled(path, _, others) && !isAnimation
  })

  const parsed = filteredPaths.map(parseImagePath)

  return Promise.all(parsed.map(createDataFromParse))
}
