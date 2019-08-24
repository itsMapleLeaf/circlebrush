import { ANIMATION_NAMING_EDGECASES, ANIMATABLE_IMAGE_NAMES } from "../constants"
import { getCanonicalFromFrame } from "./getCanonicalFromFrame"

/**
 * Returns true if the name passed
 * could be a valid frame.
 * @example
 *
 * "sliderb0" === true
 * "followpoint-1" === true
 * "followpoint" === false
 */
export const nameIsFrame = (name: string) => {
  const canonical = getCanonicalFromFrame(name)

  /**
   * Check if this frame is one of the edgecases
   * where the frame number is not prefixed with a hyphen,
   * we remove the number from the frame so that
   * it'll match the edgecase list
   */
  const isEdgecase = ANIMATION_NAMING_EDGECASES.includes(canonical)
  const isAnimation = ANIMATABLE_IMAGE_NAMES.includes(canonical)

  const regex = isEdgecase ? /(?<=[^-\d])\d+$/ : /-\d+$/
  const match = name.match(regex)

  return !!match && isAnimation
}
