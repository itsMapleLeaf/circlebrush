export type FrameData = {
  highDefinition: boolean
  width: number
  height: number
}

export type FrameDataWithPath = FrameData & {
  path: string
}
