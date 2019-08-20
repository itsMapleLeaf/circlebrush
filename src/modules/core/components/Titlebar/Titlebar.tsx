import React from "react"
import { useInstance } from "../../../../common/electron/hooks/useInstance"

import { styled } from "../../../theming/themes"
import { TITLEBAR_HEIGHT } from "./constants"
import { getColor, getFontColor } from "../../../theming/helpers"

import { TitlebarButton } from "./TitlebarButton"
import { MaximizeToggle } from "./MaximizeToggle"

import { MenuBar } from "../MenuBar/MenuBar"
import { MenuButton } from "../MenuBar/MenuButton"

import { getFileMenuItems } from "../../helpers/getFileMenuItems"
import { getHelpMenuItems } from "../../helpers/getHelpMenuItems"
import { exit } from "../../actions/exit"

const Container = styled.header`
  position: relative;
  z-index: 2;

  display: flex;
  align-items: center;
  height: ${TITLEBAR_HEIGHT};

  background: ${getColor("primary")};
`

const Title = styled.span`
  font-size: 0.9em;

  display: flex;
  justify-content: center;

  color: ${getFontColor("muted")};
`

const Grabbable = styled.div`
  -webkit-app-region: drag;
  flex: 1;
`

const Buttons = styled.div`
  flex-shrink: 0;
`

export function Titlebar() {
  const instance = useInstance()

  return (
    <Container>
      <MenuBar>
        <MenuButton name="file" label="File" items={getFileMenuItems()} />
        <MenuButton name="help" label="Help" items={getHelpMenuItems()} />
      </MenuBar>
      <Grabbable>
        <Title>{document.title}</Title>
      </Grabbable>
      <Buttons>
        <TitlebarButton icon="minimize" onClick={() => instance.minimize()} />
        <MaximizeToggle />
        <TitlebarButton icon="close" onClick={() => exit()} />
      </Buttons>
    </Container>
  )
}
