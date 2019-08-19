import { styled } from "../../../theming/themes"
import React from "react"
import { getColor, getFontColor } from "../../../theming/helpers"
import { TITLEBAR_HEIGHT } from "./constants"
import { useInstance } from "../../../../common/electron/hooks/useInstance"
import { TitlebarButton } from "./TitlebarButton"
import { MaximizeToggle } from "./MaximizeToggle"

const Container = styled.header`
  display: flex;
  align-items: center;
  height: ${TITLEBAR_HEIGHT};

  background: ${getColor("primary")};
`

const Title = styled.span`
  margin-left: 16px;
  font-size: 0.9em;

  color: ${getFontColor("muted")};
`

const Grabbable = styled.div`
  -webkit-app-region: drag;
  flex: 1;
`

const Buttons = styled.div``

export function Titlebar() {
  const instance = useInstance()

  return (
    <Container>
      <Grabbable>
        <Title>{document.title}</Title>
      </Grabbable>
      <Buttons>
        <TitlebarButton icon="minimize" onClick={() => instance.minimize()} />
        <MaximizeToggle />
        <TitlebarButton icon="close" onClick={() => instance.hide()} />
      </Buttons>
    </Container>
  )
}
