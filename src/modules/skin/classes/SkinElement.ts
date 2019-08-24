import { computed, observable } from "mobx"
import { builtInMeta } from "../builtins"

export type SkinElementData<T extends string = "element"> = {
  type: T
  path: string
  name: string
  alias?: string
  description?: string
  category?: string
  tags?: string[]
}

export type SkinElementOptions = {
  /** The temp folder path for the loaded project */
  temp: string
}

/** Represents an element in a skin */
export abstract class SkinElement<
  T extends string,
  D extends SkinElementData<T> = SkinElementData<T>
> {
  @observable public data: D

  constructor(data: D, protected options: SkinElementOptions) {
    this.data = data
  }

  @computed
  public get name() {
    return this.withBuiltin.name
  }

  @computed
  public get alias() {
    const { alias, name } = this.withBuiltin
    return alias || name
  }

  @computed
  public get withBuiltin() {
    const { name } = this.data

    const builtin = builtInMeta.find(meta => meta.name === name)

    return {
      ...this.data,
      ...builtin,
    }
  }

  public get displayName() {
    const { alias, name } = this.withBuiltin
    return alias ? alias : name
  }

  public abstract async build(): Promise<void>
}
