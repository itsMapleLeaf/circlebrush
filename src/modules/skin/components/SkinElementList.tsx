import React from "react"
import { SkinElementItem } from "./SkinElementItem"
import { styled } from "../../theming/themes"
import { SkinElementLike } from "../types/SkinElementLike"
import { categorize } from "../../../common/lang/array/categorize"
import { getColor } from "../../theming/helpers"
import { useStores } from "../../../common/state/hooks/useStores"
import { useObserver } from "mobx-react-lite"

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
}

export function SkinElementList(props: SkinElementListProps) {
  const { elements } = props
  const { projectStore } = useStores()

  const selected = useObserver(() => projectStore.selectedElement)
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
                onClick={() => (projectStore.selectedElement = element)}
                active={selected === element}
                key={element.assetPath}
                element={element}
              />
            ))}
          </Grid>
        </Category>
      ))}
    </>
  )
}
