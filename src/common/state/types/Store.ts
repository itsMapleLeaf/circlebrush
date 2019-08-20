import { StoreManager } from "../classes/StoreManager"
import { Stores } from "../manager"

export interface Store {
  init: (manager: StoreManager<Stores>) => Promise<void> | void
}
