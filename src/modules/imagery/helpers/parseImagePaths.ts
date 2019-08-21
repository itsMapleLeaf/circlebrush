import {
  ANIMATION_NAMING_EDGECASES,
  ANIMATABLE_IMAGE_NAMES,
  HD_SUFFIX,
} from "../constants"
import { extname, basename } from "path"
import { ImageElementData } from "../types/ImageElementData"

export interface ImageParseData {
  name: string
  path: string
  frameFor?: string
}

/**
 * Returns a string of the canonical if the image is a valid frame
 */
export const getFrameFor = (name: string): string | undefined => {
  const isEdgecase = ANIMATION_NAMING_EDGECASES.includes(name)
  const regex = new RegExp(isEdgecase ? `\\d+` : `-\\d+`)

  if (name.match(regex)) {
    const canonical = name.replace(regex, "")
    return canonical
  }
}

/**
 * Parses the path and attempts to guess what the image is for
 */
export const parseImagePath = (path: string) => {
  const ext = extname(path)
  const name = basename(path, ext).replace(HD_SUFFIX, "")

  const frameFor = getFrameFor(name)

  return { name, path, frameFor }
}

/**
 * Creates the final ImageElement data
 */
export const createDataFromParse = (
  data: ImageParseData,
  others: ImageParseData[]
): ImageElementData | undefined => {
  const { name, path, frameFor } = data
  const frames = others.filter(other => other.frameFor === data.name).length

  /** Return undefined for elements we don't want to include */
  if (frameFor) return

  return {
    name,
    path,
    frames,
  }
}

/**
 * Returns true or false depending on if the element is a redundant non @2x
 */
export const filterScaling = (path: string, _: any, others: string[]) => {
  const ext = extname(path)
  const name = basename(path, ext)

  const isDouble = name.includes(HD_SUFFIX)
  if (isDouble) return true

  return !others.find(other => other.includes(`${name}${HD_SUFFIX}`))
}

export const parseImagePaths = (paths: string[]): ImageElementData[] => {
  const filteredPaths = paths.filter(filterScaling)
  const parsed = filteredPaths.map(parseImagePath)

  return parsed.map(p => createDataFromParse(p, parsed)).filter(x => x) as any
}
