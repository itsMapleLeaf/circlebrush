import React from "react"
import { MenuItem } from "../../types/MenuItem"
import { styled } from "../../../theming/themes"
import {
  getFontColor,
  getTransparency,
  getColor
} from "../../../theming/helpers"

const Container = styled.li`
  display: flex;

  white-space: nowrap;
  padding: 8px 16px;
  font-size: 0.8em;

  &:hover {
    cursor: pointer;
    background: ${getTransparency("negative")};
    color: ${getColor("accent")};
  }
`

const Label = styled.span``

const Spacing = styled.div`
  flex: 1;
  width: 64px;
`

const Shortcut = styled.span`
  color: ${getFontColor("muted")};
`

export interface MenuItemProps {
  item: MenuItem
}

export function MenuItemRenderer(props: MenuItemProps) {
  const { label, shortcut, name } = props.item

  return (
    <Container key={name}>
      <Label>{label}</Label>
      <Spacing />
      <Shortcut>{shortcut}</Shortcut>
    </Container>
  )
}
