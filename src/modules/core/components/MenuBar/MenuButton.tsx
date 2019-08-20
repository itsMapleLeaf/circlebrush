import { styled } from "../../../theming/themes"
import { Button } from "../../../../common/button/components/Button"
import React, { useContext } from "react"
import { TITLEBAR_HEIGHT } from "../Titlebar/constants"
import { MenuBar } from "./MenuBar"
import { getColor } from "../../../theming/helpers"
import { MenuItem, MenuItemList } from "../../types/MenuItem"
import { MenuList } from "./MenuList"

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
`

export interface MenuButtonProps {
  name: string
  label: string
  items: MenuItemList
}

export function MenuButton(props: MenuButtonProps) {
  const { label, name, items } = props

  const context = useContext(MenuBar.context)
  if (!context) throw new Error("Cannot use MenuButton outside MenuBar")

  const { toggle, setSelected, selected, active } = context
  const isActive = selected === name && active

  const renderPopover = () => {
    if (!isActive) return

    return (
      <PopoverContainer>
        <MenuList items={items} />
      </PopoverContainer>
    )
  }

  return (
    <Container onMouseEnter={() => setSelected(name)}>
      <ButtonContainer active={isActive} label={label} onClick={toggle} />
      {renderPopover()}
    </Container>
  )
}
