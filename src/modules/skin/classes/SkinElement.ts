import * as path from "path"
import { SkinElementMeta } from "../types/SkinElementMeta"
import { builtInMeta } from "../meta"

/** Represents an element in a skin */
export abstract class SkinElement {
  public metadata: SkinElementMeta

  constructor(public path: string) {
    const meta = builtInMeta.find(meta => meta.name === this.name)

    if (meta) {
      this.metadata = meta
    } else {
      this.metadata = {
        description: "No description available",
        name: this.name,
        alias: this.name
      }
    }
  }

  public get name() {
    const ext = path.extname(this.path)
    const name = path.basename(this.path, ext)

    return name
  }

  public get displayName() {
    const { alias } = this.metadata
    return alias
  }
}
