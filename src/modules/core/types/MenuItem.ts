export interface MenuItem {
  label: string
  name: string
  action?: () => void
  children?: MenuItem[]
}
