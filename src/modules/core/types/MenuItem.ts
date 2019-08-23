import { StoreManager } from "../../../common/state/classes/StoreManager"

export type MenuItem = {
  label: string
  name: string
  shortcut?: string
  action?: (manager: StoreManager) => void
  children?: MenuItem[]
}

export type MenuItemList = (MenuItem | null)[]
