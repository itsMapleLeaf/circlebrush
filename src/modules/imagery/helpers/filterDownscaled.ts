import { extname, basename } from "path"
import { HD_SUFFIX } from "../constants"

/**
 * Returns true or false depending on if the element is a redundant non @2x
 */
export const filterDownscaled = (path: string, _: any, others: string[]) => {
  const ext = extname(path)
  const name = basename(path, ext)

  const isDouble = name.includes(HD_SUFFIX)
  if (isDouble) return true

  return !others.find(other => other.includes(`${name}${HD_SUFFIX}`))
}
