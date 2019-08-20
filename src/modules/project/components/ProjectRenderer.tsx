import React from "react"
import { useSkin } from "../../skin/hooks/useSkin"
import { styled } from "../../theming/themes"
import { SkinElementList } from "../../skin/components/SkinElementList"
import { useStores } from "../../../common/state/hooks/useStores"
import { useObserver } from "mobx-react-lite"

const Container = styled.div`
  padding: 16px;
`

export function ProjectRenderer() {
  const skin = useSkin()
  const { projectStore } = useStores()
  const selected = useObserver(() => projectStore.selectedElement)

  console.log(selected)

  return (
    <Container>
      <SkinElementList
        selected={selected ? selected.name : ""}
        onSelect={element => (projectStore.selectedElement = element)}
        elements={skin.elements}
      />
    </Container>
  )
}
