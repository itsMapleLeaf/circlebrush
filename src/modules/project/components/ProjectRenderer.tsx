import { useSkin } from "../../skin/hooks/useSkin"
import { styled } from "../../theming/themes"
import React from "react"
import { SkinElementList } from "../../skin/components/SkinElementList"

const Container = styled.div`
  padding: 16px;
`

export function ProjectRenderer() {
  const skin = useSkin()

  return (
    <Container>
      <SkinElementList elements={skin.elements} />
    </Container>
  )
}
