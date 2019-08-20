import { useStores } from "../../../common/state/hooks/useStores"
import { useObserver } from "mobx-react-lite"

export const useProject = () => {
  const { projectStore } = useStores()
  const project = useObserver(() => projectStore.project)

  if (!project) {
    throw new Error("Project is undefined")
  }

  return project
}
