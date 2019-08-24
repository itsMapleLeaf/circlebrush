import React from "react"
import { useObservedStore } from "../../../common/state/hooks/useObservedStore"
import { cover } from "polished"
import { styled } from "../../theming/themes"
import { getTransparency } from "../../theming/helpers"
import { ModalItem } from "./ModalItem"

const Container = styled.div`
  ${cover()}
  background: ${getTransparency("negative")};
`

export function ModalOverlay() {
  const modals = useObservedStore(({ modalStore }) => modalStore.modals)

  return (
    <Container>
      {modals.map(modal => (
        <ModalItem modal={modal} />
      ))}
    </Container>
  )
}
