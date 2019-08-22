import { PropsWithChildren, useState, useRef } from "react"
import React from "react"
import { styled } from "../../../theming/themes"
import { useWindowEvent } from "../../../../common/dom/hooks/useWindowEvent"

export interface MenuBarContext {
  toggle: () => void
  setSelected: (name: string) => void
  selected: string
  active: boolean
}

const Container = styled.div`
  display: flex;

  position: relative;
  z-index: 2;
`

export function MenuBar(props: PropsWithChildren<{}>) {
  const containerRef = useRef<HTMLDivElement>(null)

  const [active, setActive] = useState(false)
  const [selected, setSelected] = useState("")

  const context = {
    toggle: () => setActive(!active),
    setSelected: (name: string) => setSelected(name),
    selected,
    active,
  }

  useWindowEvent("click", event => {
    const { current: element } = containerRef

    if (element && !element.contains(event.target as Node)) {
      setActive(false)
    }
  })

  useWindowEvent("blur", () => {
    setActive(false)
  })

  return (
    <Provider value={context}>
      <Container ref={containerRef}>{props.children}</Container>
    </Provider>
  )
}

const { Provider } = (MenuBar.context = React.createContext<MenuBarContext | undefined>(
  undefined
))
