import { SkinElementLike } from "../../types/SkinElementLike"
import { useObserver } from "mobx-react-lite"
import { styled } from "../../../theming/themes"
import React from "react"
import { humanizeFilename } from "../../helpers/humanizeFilename"
import { getFontColor } from "../../../theming/helpers"

export interface PrimaryInfoProps {
  element: SkinElementLike
}

const Container = styled.div``

const Title = styled.h1`
  font-weight: bold;
  font-size: 1.1em;
`

const Subtitle = styled.h2`
  color: ${getFontColor("muted")};
  font-size: 0.9em;
`

const Description = styled.p`
  font-size: 0.9em;
`

export function PrimaryInfo(props: PrimaryInfoProps) {
  const { element } = props

  const { name, alias, description } = useObserver(() => ({
    name: element.metadata.name,
    alias: element.metadata.alias,
    description: element.metadata.description
  }))

  return (
    <Container>
      <Title>{humanizeFilename(alias)}</Title>
      <Subtitle>{name}.png</Subtitle>
      <Description>{description}</Description>
    </Container>
  )
}
