import { StoreManager } from "../classes/StoreManager"

const safeWindow = window as any

/** Exposes the manager to the global object during the callback's execution */
export const exposeManager = (manager: StoreManager, callback: () => void) => {
  safeWindow.__MANAGER__ = manager
  callback()
  safeWindow.__MANAGER__ = undefined
}
