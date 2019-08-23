import { SkinElementData } from "../../skin/classes/SkinElement"

export type ImageElementData = SkinElementData & {
  frames?: {
    /** The amount of frames */
    count: number
    /** Determines if the animation has a static image as well */
    static: boolean
  }
}
