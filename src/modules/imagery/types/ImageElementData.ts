import { SkinElementData } from "../../skin/classes/SkinElement"

export type ImageElementData = SkinElementData & {
  width: number
  height: number
  frames?: {
    /** The amount of frames */
    count: number
    /** Determines if the animation has a static image as well */
    static: boolean
  }
}
