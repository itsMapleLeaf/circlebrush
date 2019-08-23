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
  const { width, paths, dest } = options

  const items = await Promise.all(
    paths.map(async path => {
      const { width, height } = await sharp(path).metadata()

      return {
        width: width!,
        height: height!,
        path,
      }
    }),
  )

  const maxHeight = Math.max(...items.map(x => x.height))
  const maxWidth = Math.max(...items.map(x => x.width))

  const composites = paths.map((path, i) => ({
    input: path,
    top: 0,
    left: i * maxWidth,
  }))

  const image = sharp({
    create: {
      width: maxWidth * paths.length,
      height: maxHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  }).composite(composites)

  try {
    await image.toFile(dest)
  } catch {}
}
