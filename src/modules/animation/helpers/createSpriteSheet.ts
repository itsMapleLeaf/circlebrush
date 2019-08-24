import sharp from "sharp"
import { FrameData } from "../types/FrameData"

export type FrameDataWithPath = FrameData & {
  path: string
}

export type BuildAnimationPreviewOptions = {
  frames: FrameDataWithPath[]
  dest: string
}

/**
 * Builds a sprite sheet from a list of frames
 */
export const createSpriteSheet = async (options: BuildAnimationPreviewOptions) => {
  const { frames, dest } = options

  const frameHeight = Math.max(...frames.map(x => x.height))
  const frameWidth = Math.max(...frames.map(x => x.width))

  const composites = frames.map((frame, i) => ({
    input: frame.path,
    top: 0,
    left: i * frameWidth,
  }))

  const image = sharp({
    create: {
      width: frameWidth * frames.length,
      height: frameHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  }).composite(composites)

  try {
    await image.toFile(dest)
  } catch {}
}
