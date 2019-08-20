import * as path from "path"
import { BuiltInElement } from "../types/BuiltInElement"
import { builtInMeta } from "../builtins"
import { observable, computed } from "mobx"

export interface SkinElementData {
  name: string
  alias?: string
  description?: string
  category?: string
  tags?: string[]
  upscaled?: boolean
}

/** Represents an element in a skin */
export abstract class SkinElement {
  @observable public data: SkinElementData

  constructor(public path: string, data: SkinElementData) {
    this.data = data
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
