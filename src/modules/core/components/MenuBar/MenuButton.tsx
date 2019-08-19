import { styled } from "../../../theming/themes"
import { Button } from "../../../../common/button/components/Button"
import React, { useContext } from "react"
import { TITLEBAR_HEIGHT } from "../Titlebar/constants"
import { MenuBar } from "./MenuBar"
import { getColor } from "../../../theming/helpers"

const Container = styled.div`
  position: relative;
`

const ButtonContainer = styled(Button)<{ active: boolean }>`
  height: ${TITLEBAR_HEIGHT};
  padding: 0px 16px;

  font-size: 0.8em;

  display: inline-flex;
  align-items: center;

  > .label {
    opacity: 0.5;
    font-weight: 600;
  }

  &:hover {
    > .label {
      opacity: 1;
    }
  }

  ${props =>
    props.active &&
    `
    background: ${props.theme.transparencies.negative};
    color: ${props.theme.colors.accent};

    > .label {
      opacity 1;
    }
  `}
`

const PopoverContainer = styled.div`
  position: absolute;

  top: ${TITLEBAR_HEIGHT};
  left: 0px;

  background: ${getColor("primary")};
`

export interface MenuButtonProps {
  name: string
  label: string
}

export function MenuButton(props: MenuButtonProps) {
  const { label, name } = props

  const context = useContext(MenuBar.context)
  if (!context) throw new Error("Cannot use MenuButton outside MenuBar")

  const { toggle, setSelected, selected, active } = context
  const isActive = selected === name && active

  const renderPopover = () => {
    if (!isActive) return

    return <PopoverContainer>Hi!</PopoverContainer>
  }

  return (
    <Container onMouseEnter={() => setSelected(name)}>
      <ButtonContainer active={isActive} label={label} onClick={toggle} />
      {renderPopover()}
    </Container>
  )
}
