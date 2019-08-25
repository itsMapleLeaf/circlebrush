import sharp from "sharp"

import { nameIsFrame } from "./nameIsFrame"
import { nameIsAnimation } from "./nameIsAnimation"
import { addFrameToName } from "./addFrameToName"

import { getCanonicalFromFrame } from "./getCanonicalFromFrame"
import { getStrippedImageName } from "../../imagery/helpers/getStrippedImageName"

import { filterDownscaled } from "../../imagery/helpers/filterDownscaled"
import { isNonNil } from "../../../common/lang/isNonNil"

import { AnimatedImageElementData } from "../types/AnimatedImageElementData"
import { FrameData } from "../types/FrameData"

import { ANIMATABLE_IMAGE_NAMES } from "../constants"
import { HD_SUFFIX } from "../../imagery/constants"

export type FrameParseData = {
  name: string
  path: string
  still: boolean
  frames: string[]
}

export const getFramePaths = (canonical: string, paths: string[]) => {
  return paths.filter(path => {
    const name = getStrippedImageName(path)

    const isFrame = nameIsFrame(name)
    const pathCanonical = getCanonicalFromFrame(name)

    return isFrame && canonical === pathCanonical
  })
}

/**
 * Returns an object describing the animation
 * or nothing if it is not a valid animation
 */
export const mapCanonicals = (
  path: string,
  paths: string[],
): FrameParseData | undefined => {
  const name = getStrippedImageName(path)
  const canonical = getCanonicalFromFrame(name)

  if (!ANIMATABLE_IMAGE_NAMES.includes(canonical)) return

  const isFrame = nameIsFrame(name)
  const isAnimation = nameIsAnimation(canonical, paths.map(getStrippedImageName))

  /**
   * Check if this canonical has a still
   * non animated version
   */
  const still = paths.some(staticName => getStrippedImageName(staticName) === canonical)

  /**
   * True if this is the first frame
   */
  const isFirst = name === addFrameToName(canonical, 0) && !still

  /**
   * We only return if
   * - this is an animation
   * - this is not a frame, or
   * - this is the first frame, and there is no still
   */
  if (isFirst || (isAnimation && !isFrame)) {
    return {
      frames: getFramePaths(canonical, paths),
      name: canonical,
      still,
      path,
    }
  }

  return
}

export const createDataFromParse = async (
  data: FrameParseData,
): Promise<AnimatedImageElementData> => {
  const { name, still, path, frames: parsedFrames } = data

  const frames = await Promise.all(
    parsedFrames.map(
      async (path): Promise<FrameData> => {
        const highDefinition = path.includes(HD_SUFFIX)

        const { width, height } = await sharp(path).metadata()

        return {
          path,
          highDefinition,
          width: width!,
          height: height!,
        }
      },
    ),
  )

  return {
    type: "animation",
    name,
    still,
    frames,
    path,
  }
}

export const parseFramePaths = async (paths: string[], temp: string) => {
  const filteredPaths = paths.filter(filterDownscaled)

  const canonicals = filteredPaths
    .map((name, _, list) => mapCanonicals(name, list))
    .filter(isNonNil)

  return Promise.all(canonicals.map(createDataFromParse))
}
