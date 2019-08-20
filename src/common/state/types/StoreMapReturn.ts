import { Store } from "./Store"

export type StoreMapReturn<T extends Record<string, () => Store>> = {
  [K in keyof T]: ReturnType<T[K]>
}
