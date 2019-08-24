import { nameIsFrame } from "./nameIsFrame"
import { getCanonicalFromFrame } from "./getCanonicalFromFrame"

/**
 * Get the amount of frames from an animation
 */
export const getFrameCount = (name: string, others: string[]) => {
  return others.filter(other => {
    const isFrame = nameIsFrame(other)
    const canonical = getCanonicalFromFrame(other)

    return isFrame && canonical
  }).length
}
