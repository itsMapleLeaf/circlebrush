import { join } from "path"
import { ASSET_FOLDER } from "../../project/constants"
import { copy } from "fs-extra"
import { FrameData } from "../types/FrameData"

/**
 * Copies all the frames of an element
 * to the asset folder
 */
export const copyFrameAssets = (name: string, frames: FrameData[], temp: string) => {
  return Promise.all(
    frames.map(async (frame, i) => {
      const newPath = join(temp, ASSET_FOLDER, `${name}-${i}.png`)
      await copy(frame.path, newPath)
    }),
  )
}
