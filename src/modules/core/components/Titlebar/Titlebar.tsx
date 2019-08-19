import { styled } from "../../../theming/themes"
import React from "react"
import { getColor } from "../../../theming/helpers"
import { TITLEBAR_HEIGHT } from "./constants"
import { useWindow } from "../../../../common/electron/hooks/useWindow"
import { TitlebarButton } from "./TitlebarButton"

const Container = styled.header`
  display: flex;
  align-items: center;
  height: ${TITLEBAR_HEIGHT};

  font-size: 0.8em;
  background: ${getColor("primary")};
`

const Title = styled.span`
  margin-left: 16px;
`

const Grabbable = styled.div`
  -webkit-app-region: drag;
  flex: 1;
`

const Buttons = styled.div``

export function Titlebar() {
  const instance = useWindow()

  return (
    <Container>
      <Grabbable>
        <Title>{document.title}</Title>
      </Grabbable>
      <Buttons>
        <TitlebarButton icon="close" onClick={() => instance.hide()} />
      </Buttons>
    </Container>
  )
}
