import { SkinElementData } from "../../skin/classes/SkinElement"

export type ImageElementData = SkinElementData<"image"> & {
  highDefinition: boolean
  width: number
  height: number
}
