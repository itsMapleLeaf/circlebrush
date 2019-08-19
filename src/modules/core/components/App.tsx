import React from "react"

import { ThemeProvider } from "../../theming/components/ThemeProvider"
import { GlobalStyles } from "../../theming/components/GlobalStyles"

export function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      Hello world!
    </ThemeProvider>
  )
}
