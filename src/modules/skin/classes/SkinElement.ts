import * as path from "path"
import { BuiltInElement } from "../types/BuiltInElement"
import { builtInMeta } from "../builtins"
import { observable, computed } from "mobx"

export interface SkinElementData {
  path: string
  name: string
  alias?: string
  description?: string
  category?: string
  tags?: string[]
  upscaled?: boolean
}

/** Represents an element in a skin */
export abstract class SkinElement<T extends SkinElementData = SkinElementData> {
  @observable public data: T

  constructor(data: T) {
    this.data = data
  }

  @computed
  public get path() {
    return this.data.path
  }

  @computed
  public get name() {
    return this.data.name
  }

  public get displayName() {
    const { alias, name } = this.data
    return alias ? alias : name
  }
}
