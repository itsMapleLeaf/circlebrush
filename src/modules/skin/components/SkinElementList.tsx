import React from "react"
import { SkinElementItem } from "./SkinElementItem"
import { styled } from "../../theming/themes"
import { SkinElementLike } from "../types/SkinElementLike"
import { categorize } from "../../../common/lang/array/categorize"
import { getColor } from "../../theming/helpers"

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 32px;
`

const Category = styled.div`
  & + & {
    margin-top: 64px;
  }
`

const Title = styled.h1`
  font-weight: 600;
  font-size: 0.9em;

  text-transform: uppercase;
  margin-bottom: 32px;

  display: flex;
  align-items: center;

  &::after {
    display: block;
    content: "";

    margin-left: 16px;
    height: 1px;
    flex: 1;

    background: ${getColor("divider")};
  }
`

export interface SkinElementListProps {
  elements: SkinElementLike[]
  onSelect: (element: SkinElementLike) => void
  selected: string
}

export function SkinElementList(props: SkinElementListProps) {
  const { elements, onSelect, selected } = props

  const categories = categorize(
    elements,
    element => element.data.category || "Uncategorized"
  )

  return (
    <>
      {Object.entries(categories).map(([category, elements]) => (
        <Category key={category}>
          <Title>{category}</Title>
          <Grid>
            {elements.map(element => (
              <SkinElementItem
                onClick={() => onSelect(element)}
                active={selected === element.name}
                key={element.path}
                element={element}
              />
            ))}
          </Grid>
        </Category>
      ))}
    </>
  )
}
