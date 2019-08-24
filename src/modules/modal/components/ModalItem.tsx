import { Modal } from "../types/Modal"
import { styled } from "../../theming/themes"
import React from "react"
import { useStores } from "../../../common/state/hooks/useStores"

export type ModalItemProps = {
  modal: Modal
}

export type ModalContext = {
  dismiss: () => void
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`

export function ModalItem(props: ModalItemProps) {
  const { modal } = props
  const { modalStore } = useStores()

  const context: ModalContext = {
    dismiss: () => modalStore.dismiss(modal.name),
  }

  return (
    <Container>
      <Provider value={context}>{modal.render()}</Provider>
    </Container>
  )
}

const { Provider } = (ModalItem.context = React.createContext<ModalContext | undefined>(
  undefined,
))
