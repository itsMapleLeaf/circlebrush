import { getStrippedFilename } from "../../../common/lang/string/getStrippedFilename"
import { HD_SUFFIX } from "../constants"

/**
 * Converts an image path to a name without @2x
 */
export const getStrippedImageName = (path: string) =>
  getStrippedFilename(path)
    .replace(HD_SUFFIX, "")
    .toLowerCase()
