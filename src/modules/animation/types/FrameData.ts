export type FrameData = {
  path: string
  highDefinition: boolean
  width: number
  height: number
}

export type SerializedFrame = Omit<FrameData, "path">
