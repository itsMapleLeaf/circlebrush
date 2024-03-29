import React from "react"
import { useManager } from "../../../../common/state/hooks/useManager"
import { getColor, getFontColor, getTransparency } from "../../../theming/helpers"
import { styled } from "../../../theming/themes"
import { MenuItem } from "../../types/MenuItem"

const Container = styled.li<{ disabled: boolean }>`
  display: flex;

  white-space: nowrap;
  padding: 8px 16px;
  font-size: 0.8em;

  &:hover {
    cursor: pointer;
    background: ${getTransparency("negative")};
    color: ${getColor("accent")};
  }

  ${props =>
    props.disabled &&
    `
    opacity: 0.2;
    pointer-events: none;
  `}
`

const Label = styled.span``

const Spacing = styled.div`
  flex: 1;
  width: 64px;
`

const Shortcut = styled.span`
  color: ${getFontColor("muted")};
`

export type MenuItemProps = {
  item: MenuItem
}

export function MenuItemRenderer(props: MenuItemProps) {
  const { label, shortcut, name, action, children } = props.item

  const disabled = !action && !children
  const manager = useManager()

  const handleClick = () => {
    if (action) {
      action(manager)
    }
  }

  return (
    <Container onClick={handleClick} disabled={disabled} key={name}>
      <Label>{label}</Label>
      <Spacing />
      <Shortcut>{shortcut}</Shortcut>
    </Container>
  )
}
