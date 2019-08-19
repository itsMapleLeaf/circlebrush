import { styled } from "../../theming/themes"
import React from "react"
import { getColor } from "../../theming/helpers"

const Container = styled.header`
  -webkit-app-region: drag;
  padding: 8px;

  background: ${getColor("primary")};

  font-size: 0.8em;
`

export function Titlebar() {
  return <Container>{document.title}</Container>
}
