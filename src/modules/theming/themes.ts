import { Theme } from "./types/Theme"
import * as Styled from "@emotion/styled"
import { transparentize } from "polished"

export const darkTheme: Theme = {
  colors: {
    primary: "#0d0d0d",
    accent: "#ff006b",
    background: "#1a1a1a",
    divider: "rgba(255, 255, 255, 0.05)",
  },
  fontColors: {
    normal: "rgba(255, 255, 255, 0.8)",
    muted: "rgba(255, 255, 255, 0.5)",
  },
  transparencies: {
    positive: "rgba(255, 255, 255, 0.05)",
    negative: "rgba(0, 0, 0, 0.6)",
  },
}

export const lightTheme: Theme = {
  colors: {
    primary: "white",
    accent: "#ff006b",
    background: "whitesmoke",
    divider: "rgba(0, 0, 0, 0.05)",
  },
  fontColors: {
    normal: darkTheme.colors.background,
    muted: transparentize(0.6, darkTheme.colors.background),
  },
  transparencies: {
    positive: "rgba(0, 0, 0, 0.05)",
    negative: "rgba(0, 0, 0, 0.05)",
  },
}

export const styled = Styled.default as Styled.CreateStyled<Theme>
