import { computed, observable } from "mobx"
import { join } from "path"
import { ASSET_FOLDER } from "../../project/constants"

export type SkinElementData = {
  path: string
  name: string
  alias?: string
  description?: string
  category?: string
  tags?: string[]
  upscaled?: boolean
}

export type SkinElementOptions = {
  /** The temp folder path for the loaded project */
  temp: string
}

/** Represents an element in a skin */
export abstract class SkinElement<T extends SkinElementData = SkinElementData> {
  @observable public data: T

  constructor(data: T, protected options: SkinElementOptions) {
    this.data = data
  }

  @computed
  public get assetPath() {
    const { temp } = this.options
    const { name } = this.data

    return join(temp, ASSET_FOLDER, `${name}.png`).replace(/\\/g, "/")
  }

  @computed
  public get name() {
    return this.data.name
  }

  @computed
  public get alias() {
    const { alias, name } = this.data
    return alias || name
  }

  public get displayName() {
    const { alias, name } = this.data
    return alias ? alias : name
  }
}
