import { StoreManager } from "../classes/StoreManager"

export const getManager = () => {
  const manager = (window as any).__MANAGER__

  if (!manager) {
    throw new Error("Cannot find manager. Did you forget to call exposeManager()?")
  }

  return manager as StoreManager
}
