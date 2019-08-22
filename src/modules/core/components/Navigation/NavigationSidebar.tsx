import { styled } from "../../../theming/themes"
import { getColor } from "../../../theming/helpers"
import React from "react"
import { NavigationButton } from "./NavigationButton"

const Container = styled.div`
  background: ${getColor("primary")};

  display: flex;
  flex-direction: column;
`

export function NavigationSidebar() {
  return (
    <Container>
      <NavigationButton active icon="elements" onClick={() => {}} />
      <NavigationButton icon="wrench" onClick={() => {}} />
      <NavigationButton icon="eye" onClick={() => {}} />
    </Container>
  )
}
