import { useObserver } from "mobx-react-lite"
import { Stores } from "../manager"
import { useManager } from "./useManager"

export const useObservedStore = <R>(getStoreValues: (stores: Stores) => R) => {
  const { stores } = useManager()
  return useObserver(() => getStoreValues(stores))
}
