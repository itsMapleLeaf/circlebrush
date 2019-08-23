import React from "react"
import { useObservedStore } from "../../../common/state/hooks/useObservedStore"
import { Skin } from "../../skin/classes/Skin"
import { SkinElementSidebar } from "../../skin/components/SkinElementSidebar/SkinElementSidebar"
import { styled } from "../../theming/themes"
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

export interface ProjectRendererProps {
  skin: Skin
}

export function ProjectRenderer({ skin }: ProjectRendererProps) {
  const selected = useObservedStore(({ projectStore }) => projectStore.selectedElement)

  const renderSidebar = () => {
    if (selected) {
      return <SkinElementSidebar element={selected} />
    }
  }

  return (
    <Container>
      <Main>
        <List>
          <ElementListView skin={skin} />
        </List>
      </Main>
      {renderSidebar()}
    </Container>
  )
}
