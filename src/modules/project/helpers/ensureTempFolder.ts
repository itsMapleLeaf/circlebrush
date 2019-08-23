import { remote } from "electron"
import { join, basename } from "path"
import { remove, mkdirp } from "fs-extra"

import sanitizeFileName from "sanitize-filename"
import { TEMP_ROOT, ASSET_FOLDER, BUILD_FOLDER, PREVIEW_FOLDER } from "../constants"

/**
 * Ensures an empty temp folder exists, and returns the directory name and path
 */
export const ensureTempFolder = async (folder: string) => {
  const name = basename(folder)
  const sanitized = sanitizeFileName(name)

  const temp = join(remote.app.getPath("temp"), TEMP_ROOT)
  const fullPath = join(temp, sanitized).replace(/\\/g, "/")

  await remove(fullPath)
  await mkdirp(fullPath)

  /** Create project folders */
  await mkdirp(join(fullPath, ASSET_FOLDER))
  await mkdirp(join(fullPath, BUILD_FOLDER))
  await mkdirp(join(fullPath, PREVIEW_FOLDER))

  return [sanitized, fullPath] as const
}
