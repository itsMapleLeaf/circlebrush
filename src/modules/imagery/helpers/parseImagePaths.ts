import {
  ANIMATION_NAMING_EDGECASES,
  ANIMATABLE_IMAGE_NAMES,
  HD_SUFFIX,
} from "../constants"
import { extname, basename } from "path"
import { ImageElementData } from "../types/ImageElementData"
import { getStrippedFilename } from "../../../common/lang/string/getStrippedFilename"

export interface FrameData {
  canonical: string
  index: number
}

export interface ImageParseData {
  name: string
  path: string
  frame?: FrameData
}

/**
 * Returns a frame data if the image is a valid frame
 */
export const getFrameFor = (name: string): FrameData | undefined => {
  /**
   * Check if this frame is one of the edgecases
   * where the frame number is not prefixed with a hyphen,
   * we remove the number from the frame so that
   * it'll match the edgecase list
   */
  const isEdgecase = ANIMATION_NAMING_EDGECASES.includes(name.replace(/\d+/, ""))

  const regex = new RegExp(isEdgecase ? /\d+/ : /-\d+/)
  const match = name.match(regex)

  if (match) {
    const canonical = name.replace(regex, "")

    return {
      canonical,
      index: Number(match[0].replace("-", "")),
    }
  }
}

/**
 * Parses the path and attempts to guess what the image is for
 */
export const parseImagePath = (path: string) => {
  const name = getStrippedFilename(path).replace(HD_SUFFIX, "")
  const frame = getFrameFor(name)

  return { name, path, frame }
}

/**
 * Creates the final ImageElement data
 */
export const createDataFromParse = (
  data: ImageParseData,
  others: ImageParseData[]
): ImageElementData | undefined => {
  const { name, path, frame } = data

  /** Get the amount of frames associated with this element */
  const frameCount = others.filter(
    other => other.frame && other.frame.canonical === data.name
  ).length

  /** Include this if it's the first frame and there is not a static variant */
  if (frame) {
    const { canonical, index } = frame
    const hasStatic = others.find(other => other.name === canonical)

    /** Skip this if there's a static, which will be the parent, or if there's not but this is the first frame, which will be the parent. */
    if (hasStatic || index !== 0) return

    return {
      path,
      name: canonical,
      frames: {
        count: frameCount,
        static: false,
      },
    }
  }

  return {
    name,
    path,
    frames: frameCount
      ? {
          count: frameCount,
          static: true,
        }
      : undefined,
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
