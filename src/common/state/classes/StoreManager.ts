import { Store } from "../types/Store"
import { Stores } from "../manager"

export class StoreManager<T extends Record<string, Store> = Stores> {
  public stores: T = {} as any

  constructor(public instantiators: { [K in keyof T]: () => T[K] }) {
    for (const [name, creator] of Object.entries(instantiators)) {
      this.stores[name as keyof T] = creator()
    }
  }

  public async init() {
    for (const store of Object.values(this.stores)) {
      if (store.init) await store.init(this as any)
    }
  }

  public hydrate(data: any) {
    for (const [name, store] of Object.entries(this.stores)) {
      if (store.hydrate) store.hydrate(data[name])
    }
  }

  public serialize() {
    const result: Record<string, any> = {}

    for (const [name, store] of Object.entries(this.stores)) {
      if (store.serialize) {
        result[name] = store.serialize()
      }
    }

    return result
  }
}
