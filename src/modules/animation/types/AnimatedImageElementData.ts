import { SkinElementData } from "../../skin/classes/SkinElement"
import { FrameData } from "./FrameData"

export type AnimatedImageElementData = SkinElementData<"animation"> & {
  /** True if the animation has a still counterpart */
  still: boolean
  /** Information about each frame */
  frames: FrameData[]
}
