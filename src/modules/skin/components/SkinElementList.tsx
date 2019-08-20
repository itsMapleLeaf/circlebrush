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
}

export function SkinElementList(props: SkinElementListProps) {
  const { elements } = props

  return (
    <Container>
      {elements.map(element => (
        <SkinElementItem key={element.path} element={element} />
      ))}
    </Container>
  )
}
