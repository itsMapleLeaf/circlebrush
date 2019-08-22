import { styled } from "../../../theming/themes"
import { getColor } from "../../../theming/helpers"
import React from "react"

const Container = styled.div`
  background: ${getColor("background")};
  padding: 32px;
`

export function FilterOptions() {
  return <Container>nothing here yet</Container>
}
