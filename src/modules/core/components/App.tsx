import React from "react"

import { ThemeProvider } from "../../theming/components/ThemeProvider"
import { GlobalStyles } from "../../theming/components/GlobalStyles"
import { Titlebar } from "./Titlebar/Titlebar"
import { styled } from "../../theming/themes"
import { getColor } from "../../theming/helpers"

const Container = styled.div`
  background: ${getColor("background")};

  overflow: hidden;
  height: 100vh;
`

export function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Container>
        <Titlebar />
      </Container>
    </ThemeProvider>
  )
}
