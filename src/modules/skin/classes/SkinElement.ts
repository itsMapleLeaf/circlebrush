import * as path from "path"

/** Represents an element in a skin */
export abstract class SkinElement {
  constructor(public path: string) {}

  public get name() {
    const ext = path.extname(this.path)
    const name = path.basename(this.path, ext)

    return name
  }
}
