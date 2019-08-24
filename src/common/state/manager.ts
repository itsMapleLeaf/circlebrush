import { StoreMapReturn } from "./types/StoreMapReturn"
import { StoreManager } from "./classes/StoreManager"

/** Stores */
import { projectStore } from "../../modules/project/stores/projectStore"
import { modalStore } from "../../modules/modal/stores/stores/modalStore"

const stores = {
  projectStore,
  modalStore,
}

export type Stores = StoreMapReturn<typeof stores>
export const createManager = () => new StoreManager<Stores>(stores)
