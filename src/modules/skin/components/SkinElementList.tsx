import { useObserver } from "mobx-react-lite"
import React, { useMemo } from "react"
import { categorize } from "../../../common/lang/array/categorize"
import { useStores } from "../../../common/state/hooks/useStores"
import { getColor } from "../../theming/helpers"
import { styled } from "../../theming/themes"
import { SkinElementLike } from "../types/SkinElementLike"
import { SkinElementItem } from "./SkinElementItem"

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

export type SkinElementListProps = {
  elements: SkinElementLike[]
}

export function SkinElementList(props: SkinElementListProps) {
  const { elements } = props
  const { projectStore } = useStores()

  const selected = useObserver(() => projectStore.selectedElement)

  const categories = useMemo(() => {
    return categorize(
      elements,
      element => element.withBuiltin.category || "Uncategorized",
    )
  }, [elements])

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
                key={element.name}
                element={element}
              />
            ))}
          </Grid>
        </Category>
      ))}
    </>
  )
}
