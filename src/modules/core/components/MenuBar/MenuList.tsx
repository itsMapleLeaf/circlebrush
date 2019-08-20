import React from "react"

import { MenuItemList } from "../../types/MenuItem"
import { MenuItemRenderer } from "./MenuItemRenderer"

import { styled } from "../../../theming/themes"
import { getColor } from "../../../theming/helpers"

export interface MenuListProps {
  items: MenuItemList
}

const Container = styled.ul`
  background: ${getColor("primary")};
  padding 8px 0px;
`

const Divider = styled.li`
  background: ${getColor("divider")};
  height: 1px;

  margin: 8px 16px;
  display: block;
`

export function MenuList(props: MenuListProps) {
  const { items } = props

  const renderList = () => {
    return items.map((item, i) => {
      if (item !== null) {
        return <MenuItemRenderer key={item.name} item={item} />
      } else {
        return <Divider key={i} />
      }
    })
  }

  return <Container>{renderList()}</Container>
}
