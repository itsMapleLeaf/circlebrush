import { styled } from "../../theming/themes"
import { useStores } from "../../../common/state/hooks/useStores"
import React from "react"
import { useObserver } from "mobx-react-lite"
import { ProjectRenderer } from "../../project/components/ProjectRenderer"
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
      <Main>{project ? <ProjectRenderer /> : null}</Main>
    </Container>
  )
}
