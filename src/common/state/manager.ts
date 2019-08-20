import { StoreMapReturn } from "./types/StoreMapReturn"
import { StoreManager } from "./classes/StoreManager"

/** Stores */
import { projectStore } from "../../modules/project/stores/projectStore"

const stores = {
  projectStore
}

export type Stores = StoreMapReturn<typeof stores>
export const createManager = () => new StoreManager<Stores>(stores)
