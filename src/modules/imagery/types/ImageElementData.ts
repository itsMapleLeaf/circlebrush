import { SkinElementData } from "../../skin/classes/SkinElement"
import { ImageFrameData } from "./ImageFrameData"

export type ImageElementData = SkinElementData & {
  highDefinition: boolean
  width: number
  height: number
  sequence?: {
    /** The frames of this element */
    frames: ImageFrameData[]
    /** Determines if the animation has a static image as well */
    static: boolean
  }
}
