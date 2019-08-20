import { useStores } from "../../../common/state/hooks/useStores"
import { useObserver } from "mobx-react-lite"

export const useTitle = () => {
  const { projectStore } = useStores()
  const project = useObserver(() => projectStore.project)

  if (project) {
    return `${project.name} - Circlebrush`
  }

  return "Circlebrush"
}
