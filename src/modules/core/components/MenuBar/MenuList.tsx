import { MenuItem } from "../../types/MenuItem"
import { styled } from "../../../theming/themes"
import { getColor } from "../../../theming/helpers"
import React from "react"

export interface MenuListProps {
  items: (MenuItem | null)[]
}

const Container = styled.ul`
  background: ${getColor("background")};
`

const Item = styled.li``

const Divider = styled.li``

export function MenuList(props: MenuListProps) {
  const { items } = props

  const renderItem = (item: MenuItem) => {
    const { label, name } = item

    return <Item key={name}>{label}</Item>
  }

  const renderList = () => {
    return items.map((item, i) => {
      if (item !== null) {
        return renderItem(item)
      } else {
        return <Divider key={i} />
      }
    })
  }

  return <Container>{renderList()}</Container>
}
