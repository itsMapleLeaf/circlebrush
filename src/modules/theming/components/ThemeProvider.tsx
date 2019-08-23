import { ThemeProvider as Provider } from "emotion-theming"
import React from "react"
import { darkTheme, lightTheme } from "../themes"

export function ThemeProvider(props: { children: React.ReactNode }) {
  const dark = true // Remove comment when this is fixed: remote.systemPreferences.isDarkMode()

  return <Provider theme={dark ? darkTheme : lightTheme}>{props.children}</Provider>
}
