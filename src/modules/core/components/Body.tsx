import { styled } from "../../theming/themes"
import { useStores } from "../../../common/state/hooks/useStores"
import React from "react"
import { useObserver } from "mobx-react-lite"
import { SkinElementList } from "../../skin/components/SkinElementList"

const Container = styled.main`
  flex: 1;

  overflow-y: auto;
`

export function Body() {
  const { projectStore } = useStores()
  const project = useObserver(() => projectStore.project)

  return <Container>{project ? <SkinElementList /> : null}</Container>
}
