import { SkinElementData } from "../../skin/classes/SkinElement"
import { FrameData } from "./FrameData"

export type AnimatedImageElementData = SkinElementData<"animation"> & {
  frames: FrameData[]
}
