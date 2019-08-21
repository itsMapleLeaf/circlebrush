import { useStores } from "../../../common/state/hooks/useStores"
import { useObserver } from "mobx-react-lite"

export const useTitle = () => {
  const { projectStore } = useStores()

  return useObserver(() => {
    const { project } = projectStore

    if (project) {
      return `${project.data.name} - Circlebrush`
    }

    return "Circlebrush"
  })
}
