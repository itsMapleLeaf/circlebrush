import { useObserver } from "mobx-react-lite"
import React from "react"
import { useStores } from "../../../common/state/hooks/useStores"
import { ProjectRenderer } from "../../project/components/ProjectRenderer"
import { styled } from "../../theming/themes"
import { NavigationSidebar } from "./Navigation/NavigationSidebar"

const Container = styled.div`
  display: flex;
  flex: 1;

  overflow-y: auto;
`

const Main = styled.main`
  flex: 1;
`

export function Body() {
  const { projectStore } = useStores()
  const project = useObserver(() => projectStore.project)

  return (
    <Container>
      <NavigationSidebar />
      <Main>{project ? <ProjectRenderer skin={project.skin} /> : null}</Main>
    </Container>
  )
}
