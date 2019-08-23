import { SkinElementData } from "../classes/SkinElement"

export type BuiltInElement = Omit<SkinElementData, "path"> & {
  name: string
  alias?: string
  description?: string
  category?: string
  tags?: string[]
}
