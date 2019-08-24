import React from "react"
import { useObservedStore } from "../../../common/state/hooks/useObservedStore"
import { cover } from "polished"
import { styled } from "../../theming/themes"
import { getTransparency } from "../../theming/helpers"
import { ModalItem } from "./ModalItem"

const Container = styled.div<{ active?: boolean }>`
  ${cover()}
  background: ${getTransparency("negative")};

  pointer-events: none;
  opacity: 0;

  ${props =>
    props.active &&
    `
    opacity: 1;
    pointer-events: all;
  `}
`

export function ModalOverlay() {
  const { modals, active } = useObservedStore(({ modalStore }) => ({
    modals: modalStore.modals,
    active: modalStore.modals.length > 0,
  }))

  return (
    <Container active={active}>
      {modals.map(modal => (
        <ModalItem modal={modal} />
      ))}
    </Container>
  )
}
