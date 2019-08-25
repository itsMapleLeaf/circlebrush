import { getHash } from "../../../common/lang/string/getHash"
import { join } from "path"
import { PREVIEW_FOLDER } from "../../project/constants"

/**
 * Creates a path to the preview folder
 */
export const getPreviewPath = (temp: string, name: string, ext: string) => {
  const hash = getHash(8)
  const fileName = `${name}-${hash}.${ext}`

  return join(temp, PREVIEW_FOLDER, fileName)
}
