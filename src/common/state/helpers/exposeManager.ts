import { StoreManager } from "../classes/StoreManager"

const safeWindow = window as any

export const exposeManager = (manager: StoreManager, callback: () => {}) => {
  safeWindow.__MANAGER__ = manager
  callback()
  safeWindow.__MANAGER__ = undefined
}
