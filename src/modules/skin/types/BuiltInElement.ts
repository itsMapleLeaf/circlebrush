import { SkinElementData } from "../classes/SkinElement"

export interface BuiltInElement extends SkinElementData {
  name: string
  alias?: string
  description?: string
  category?: string
  tags?: string[]
}
