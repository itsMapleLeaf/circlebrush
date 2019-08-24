import { nameIsFrame } from "./nameIsFrame"
import { getCanonicalFromFrame } from "./getCanonicalFromFrame"

/**
 * Returns true or false if the name
 * has frames associated with it or if it is a frame
 */
export const nameIsAnimation = (name: string, others: string[]) => {
  const isFrame = nameIsFrame(name)
  if (isFrame) return true

  return others.some(other => {
    const canonical = getCanonicalFromFrame(other)
    return canonical === name && nameIsFrame(other)
  })
}
