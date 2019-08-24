import { SkinElementData } from "../../skin/classes/SkinElement"
import { FrameData } from "./FrameData"

export type ImageElementData = SkinElementData & {
  highDefinition: boolean
  width: number
  height: number
  sequence?: {
    /** The frames of this element */
    frames: FrameData[]
    /** Determines if the animation has a static image as well */
    static: boolean
  }
}
