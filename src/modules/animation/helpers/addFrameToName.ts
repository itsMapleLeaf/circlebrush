import { ANIMATION_NAMING_EDGECASES } from "../constants"

/**
 * Adds a frame to a canonical to make it a frame name
 * @example
 * addFrameToName("followpoint", 0) // followpoint-0
 * addFrameToName("sliderb", 0) // sliderb0
 */
export const addFrameToName = (name: string, index: number) => {
  const isEdgecase = ANIMATION_NAMING_EDGECASES.includes(name)
  return isEdgecase ? `${name}${index}` : `${name}-${index}`
}
