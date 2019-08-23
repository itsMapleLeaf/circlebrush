import { SkinElementData } from "../../skin/classes/SkinElement"

export interface ImageElementData extends SkinElementData {
  frames?: {
    /** The amount of frames */
    count: number
    /** Determines if the animation has a static image as well */
    static: boolean
  }
}
