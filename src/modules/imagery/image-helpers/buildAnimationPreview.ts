import sharp from "sharp"

export type BuildAnimationPreviewOptions = {
  width: number
  height: number
  paths: string[]
  dest: string
}

/**
 * Builds a sprite sheet from a list of frame paths
 */
export const buildAnimationPreview = async (options: BuildAnimationPreviewOptions) => {
  const { width, height, paths, dest } = options

  const composites = paths.map((path, i) => ({
    input: path,
    top: 0,
    left: i * width,
  }))

  const image = sharp({
    create: {
      width: width * paths.length,
      height: height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  }).composite(composites)

  await image.toFile(dest)
}
