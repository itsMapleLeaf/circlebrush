import React, { useEffect } from "react"

import { ThemeProvider } from "../../theming/components/ThemeProvider"
import { GlobalStyles } from "../../theming/components/GlobalStyles"
import { Titlebar } from "./Titlebar/Titlebar"
import { styled } from "../../theming/themes"
import { getColor } from "../../theming/helpers"
import { Body } from "./Body"
import { useTitle } from "../hooks/useTitle"
import { ModalOverlay } from "../../modal/components/ModalOverlay"

const Container = styled.div`
  background: ${getColor("background")};

  overflow: hidden;
  height: 100vh;

  display: flex;
  flex-direction: column;
`

export function App() {
  const title = useTitle()

  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <ThemeProvider>
      <GlobalStyles />
      <Container>
        <Titlebar />
        <Body />
      </Container>
      <ModalOverlay />
    </ThemeProvider>
  )
}
