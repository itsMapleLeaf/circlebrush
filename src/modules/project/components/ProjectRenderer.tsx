import React from "react"
import { useSkin } from "../../skin/hooks/useSkin"
import { styled } from "../../theming/themes"
import { SkinElementList } from "../../skin/components/SkinElementList"
import { useStores } from "../../../common/state/hooks/useStores"
import { useObserver } from "mobx-react-lite"
import { SkinElementSidebar } from "../../skin/components/SkinElementSidebar/SkinElementSidebar"
import { FilterOptions } from "./ElementListView/FilterOptions"
import { ElementListView } from "./ElementListView/ElementListView"

const Container = styled.div`
  display: flex;
  height: 100%;
`

const Main = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
`

const List = styled.div`
  padding: 32px;
  flex: 1;

  max-height: 100%;
  overflow-y: scroll;
`

export function ProjectRenderer() {
  const { projectStore } = useStores()
  const selected = useObserver(() => projectStore.selectedElement)

  const renderSidebar = () => {
    if (selected) {
      return <SkinElementSidebar element={selected} />
    }
  }

  return (
    <Container>
      <Main>
        <List>
          <ElementListView skin={projectStore.project!.skin} />
        </List>
      </Main>
      {renderSidebar()}
    </Container>
  )
}
