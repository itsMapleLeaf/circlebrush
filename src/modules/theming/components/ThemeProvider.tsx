import React from "react"
import { ThemeProvider as Provider } from "emotion-theming"
import { darkTheme, lightTheme } from "../themes"

export function ThemeProvider(props: { children: any }) {
  const dark = true // Remove comment when this is fixed: remote.systemPreferences.isDarkMode()

  return <Provider theme={dark ? darkTheme : lightTheme}>{props.children}</Provider>
}
