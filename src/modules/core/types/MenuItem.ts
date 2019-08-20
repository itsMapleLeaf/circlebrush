export interface MenuItem {
  label: string
  name: string
  shortcut?: string
  action?: () => void
  children?: MenuItem[]
}

export type MenuItemList = (MenuItem | null)[]
