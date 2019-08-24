export type GetAspectRatioScaleOptions = {
  width: number
  height: number
  targetWidth: number
  targetHeight: number
}

export const getAspectRatioScale = (options: GetAspectRatioScaleOptions) => {
  const { width, height, targetWidth, targetHeight } = options

  const scaleX = targetWidth / width
  const scaleY = targetHeight / height

  return Math.min(scaleX, scaleY)
}
