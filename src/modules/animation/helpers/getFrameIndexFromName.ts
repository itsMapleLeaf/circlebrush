import { ANIMATION_NAMING_EDGECASES } from "../constants"
import { getCanonicalFromFrame } from "./getCanonicalFromFrame"

export const getFrameIndexFromName = (name: string) => {
  const canonical = getCanonicalFromFrame(name)
  const isEdgecase = ANIMATION_NAMING_EDGECASES.includes(canonical)

  const regex = isEdgecase ? /(?<=[^-\d])\d+$/ : /-\d+$/
  const match = name.match(regex)

  if (!match) throw new Error("Name is not a valid frame")

  const [result] = match

  return Number(isEdgecase ? result : result.slice(1))
}
