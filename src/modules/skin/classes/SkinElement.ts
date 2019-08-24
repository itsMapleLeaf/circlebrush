import { computed, observable } from "mobx"

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

  public abstract async build(): Promise<void>
}
