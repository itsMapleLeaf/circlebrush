import { SkinElement } from "../../skin/classes/SkinElement"
import { UPSCALED_TO_DOUBLE_IDENTIFIER } from "../../skin/helpers/filterSkinImages"

export class ImageElement extends SkinElement {
  public get name() {
    return super.name.replace(UPSCALED_TO_DOUBLE_IDENTIFIER, "")
  }
}
