import { SkinElementData } from "../classes/SkinElement"

export interface BuiltInElement extends Omit<SkinElementData, "path"> {
  name: string
  alias?: string
  description?: string
  category?: string
  tags?: string[]
}
