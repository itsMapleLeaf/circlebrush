import React from "react"
import { SkinElementItem } from "./SkinElementItem"
import { styled } from "../../theming/themes"
import { SkinElementLike } from "../types/SkinElementLike"

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 32px;
`

export interface SkinElementListProps {
  elements: SkinElementLike[]
  onSelect: (element: SkinElementLike) => void
  selected: string
}

export function SkinElementList(props: SkinElementListProps) {
  const { elements, onSelect, selected } = props

  return (
    <Container>
      {elements.map(element => (
        <SkinElementItem
          onClick={() => onSelect(element)}
          active={selected === element.name}
          key={element.path}
          element={element}
        />
      ))}
    </Container>
  )
}
