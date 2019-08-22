import { StoreManager } from "../../../common/state/classes/StoreManager"

export interface MenuItem {
  label: string
  name: string
  shortcut?: string
  action?: (manager: StoreManager) => void
  children?: MenuItem[]
}

export type MenuItemList = (MenuItem | null)[]
