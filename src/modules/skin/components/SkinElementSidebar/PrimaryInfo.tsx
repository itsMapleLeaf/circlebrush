import { useObserver } from "mobx-react-lite"
import React from "react"
import { getFontColor } from "../../../theming/helpers"
import { styled } from "../../../theming/themes"
import { humanizeFilename } from "../../helpers/humanizeFilename"
import { SkinElementLike } from "../../types/SkinElementLike"

export type PrimaryInfoProps = {
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
  margin-bottom: 0px;
`

export function PrimaryInfo(props: PrimaryInfoProps) {
  const { element } = props

  const { name, description } = useObserver(() => ({
    name: element.withBuiltin.name,
    description: element.withBuiltin.description,
  }))

  const renderDescription = () => {
    if (!description) return

    return <Description>{description}</Description>
  }

  return (
    <Container>
      <Title>{humanizeFilename(element.displayName)}</Title>
      <Subtitle>{name}.png</Subtitle>
      {renderDescription()}
    </Container>
  )
}
