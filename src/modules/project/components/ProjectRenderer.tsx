import React from "react"
import { useSkin } from "../../skin/hooks/useSkin"
import { styled } from "../../theming/themes"
import { SkinElementList } from "../../skin/components/SkinElementList"
import { useStores } from "../../../common/state/hooks/useStores"
import { useObserver } from "mobx-react-lite"
import { SkinElementSidebar } from "../../skin/components/SkinElementSidebar/SkinElementSidebar"

const Container = styled.div`
  display: flex;
  height: 100%;
`

const List = styled.div`
  padding: 32px;

  max-height: 100%;
  overflow-y: scroll;
`

export function ProjectRenderer() {
  const skin = useSkin()
  const { projectStore } = useStores()
  const selected = useObserver(() => projectStore.selectedElement)

  const renderSidebar = () => {
    if (selected) {
      return <SkinElementSidebar element={selected} />
    }
  }

  return (
    <Container>
      <List>
        <SkinElementList
          selected={selected ? selected.name : ""}
          onSelect={element => (projectStore.selectedElement = element)}
          elements={skin.elements}
        />
      </List>
      {renderSidebar()}
    </Container>
  )
}
