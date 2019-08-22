import { styled } from "../../../theming/themes"
import { getColor, getTransparency } from "../../../theming/helpers"
import React from "react"

const Container = styled.div`
  background: ${getTransparency("negative")};
  padding: 16px;
`

export function FilterOptions() {
  return <Container>nothing here yet</Container>
}
