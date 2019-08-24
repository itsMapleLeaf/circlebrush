import sharp from "sharp"
import { basename, extname } from "path"
import { isNonNil } from "../../../common/lang/isNonNil"
import { ImageElementData } from "../types/ImageElementData"
import { getStrippedFilename } from "../../../common/lang/string/getStrippedFilename"
import {
  ANIMATION_NAMING_EDGECASES,
  HD_SUFFIX,
  ANIMATABLE_IMAGE_NAMES,
} from "../constants"

export type FrameData = {
  width: number
  height: number
  canonical: string
  index: number
}

export type ImageParseData = {
  name: string
  path: string
  highDefinition: boolean
  frame?: FrameData
}

export type ImageDataFromParse = Omit<ImageElementData, "width" | "height">

/**
 * Get the canonical element name from a frame name
 */
export const getCanonicalName = (name: string) => name.replace(/\-?\d*$/, "")

/**
 * Returns frame data if the image is a valid frame
 */
export const getFrameFor = async (
  name: string,
  path: string,
): Promise<Omit<FrameData, "highDefinition"> | undefined> => {
  const safeName = getCanonicalName(name)

  /**
   * Check if this frame is one of the edgecases
   * where the frame number is not prefixed with a hyphen,
   * we remove the number from the frame so that
   * it'll match the edgecase list
   */
  const isEdgecase = ANIMATION_NAMING_EDGECASES.includes(safeName)
  const isAnimation = ANIMATABLE_IMAGE_NAMES.includes(safeName)

  const regex = isEdgecase ? /(?<=[^-\d])\d*$/ : /-\d+$/
  const match = name.match(regex)

  if (match && isAnimation) {
    const canonical = name.replace(regex, "")

    /**
     * Get the width and height so we can
     * calculate the frame dimensions later
     */
    const { width, height } = await sharp(path).metadata()

    return {
      canonical,
      width: width!,
      height: height!,
      index: Number(match[0].replace("-", "")),
    }
  }
}

/**
 * Get the frame elements for an element
 */
export const getFrames = (element: ImageParseData, items: ImageParseData[]) => {
  return items
    .filter(item => {
      /** Remove the number, so this can match */
      return item.frame && item.frame.canonical === getCanonicalName(element.name)
    })
    .map(item => {
      const { frame, highDefinition } = item
      const { width, height } = frame!

      return { width, height, highDefinition }
    })
}

/**
 * Parses the path and attempts to guess what the image is for
 */
export const parseImagePath = async (path: string) => {
  const strippedName = getStrippedFilename(path).toLowerCase()

  const highDefinition = strippedName.includes(HD_SUFFIX)
  const name = strippedName.replace(HD_SUFFIX, "")

  const frame = await getFrameFor(name, path)
  return { name, path, frame, highDefinition }
}

/**
 * Creates the final ImageElement data
 */
export const createDataFromParse = (
  data: ImageParseData,
  others: ImageParseData[],
): ImageDataFromParse | undefined => {
  const { name, path, frame, highDefinition } = data

  /** Get the amount of frames associated with this element */
  const frames = getFrames(data, others)

  /** Include this if it's the first frame and there is not a static variant */
  if (frame) {
    const { canonical, index } = frame
    const hasStatic = others.find(other => other.name === canonical)

    /** Skip this if there's a static, which will be the parent, or if there's not but this is the first frame, which will be the parent. */
    if (hasStatic || index !== 0) return

    return {
      path,
      name: canonical,
      highDefinition,
      sequence: {
        frames,
        static: false,
      },
    }
  }

  const sequence = frames.length > 0 ? { frames, static: true } : undefined

  return {
    highDefinition,
    name,
    path,
    sequence,
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

export const parseImagePaths = async (paths: string[]): Promise<ImageDataFromParse[]> => {
  const filteredPaths = paths.filter(filterScaling)
  const parsed = await Promise.all(filteredPaths.map(parseImagePath))

  return parsed.map(p => createDataFromParse(p, parsed)).filter(isNonNil)
}
