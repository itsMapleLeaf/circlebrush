import { useContext } from "react"
import { managerContext } from "../contexts/managerContext"

export const useManager = () => {
  const manager = useContext(managerContext)

  if (!manager) {
    throw new Error("No manager in context")
  }

  return manager
}
