import { join } from "path"
import sharp, { Sharp } from "sharp"
import { HD_SUFFIX } from "../constants"

export type ExportImageElementOptions = {
  image: Sharp
  dest: string
  name: string
  downscale?: boolean
}

/**
 * Exports the image to the destination and adds the downscaled version if needed
 */
export const buildImageElement = async (options: ExportImageElementOptions) => {
  const { image, dest, name, downscale = true } = options

  const meta = await image.metadata()

  if (downscale) {
    const width = Math.floor(meta.width! / 2) || 1
    const height = Math.floor(meta.height! / 2) || 1

    await image
      .clone()
      .resize(width, height)
      .toFile(join(dest, `${name}.png`))
  }

  await image.toFile(join(dest, `${name}${downscale ? HD_SUFFIX : ""}.png`))
}
