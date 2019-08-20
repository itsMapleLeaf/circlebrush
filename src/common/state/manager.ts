import { StoreMapReturn } from "./types/StoreMapReturn"
import { StoreManager } from "./classes/StoreManager"

const stores = {}

export type Stores = StoreMapReturn<typeof stores>
export const createManager = () => new StoreManager<Stores>(stores)
