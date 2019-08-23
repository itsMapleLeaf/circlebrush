import { StoreManager } from "../classes/StoreManager"
import { Stores } from "../manager"

export type Store<T = any> = {
  init: (manager: StoreManager<Stores>) => Promise<void> | void
  hydrate?: (data: T) => void
  serialize?: () => T
}
