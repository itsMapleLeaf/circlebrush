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
import { useStores } from "../../../../common/state/hooks/useStores"
import { useObserver } from "mobx-react-lite"
import { useTitle } from "../../hooks/useTitle"

const Container = styled.header`
  position: relative;
  z-index: 1;

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

const CloseButton = styled(TitlebarButton)`
  &:hover {
    background: rgba(190, 0, 0, 1);
  }
`

export function Titlebar() {
  const instance = useInstance()
  const title = useTitle()

  return useObserver(() => (
    <Container>
      <MenuBar>
        <MenuButton name="file" label="File" items={getFileMenuItems()} />
        <MenuButton name="help" label="Help" items={getHelpMenuItems()} />
      </MenuBar>
      <Grabbable>
        <Title>{title}</Title>
      </Grabbable>
      <Buttons>
        <TitlebarButton icon="minimize" onClick={() => instance.minimize()} />
        <MaximizeToggle />
        <CloseButton icon="close" onClick={() => exit()} />
      </Buttons>
    </Container>
  ))
}
