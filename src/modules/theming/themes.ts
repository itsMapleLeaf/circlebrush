import { Theme } from "./types/Theme"
import * as Styled from "@emotion/styled"

export const darkTheme: Theme = {
  colors: {
    primary: "#0d0d0d",
    accent: "#ff006b",
    background: "#1a1a1a"
  },
  fontColors: {
    normal: "rgba(255, 255, 255, 0.8)",
    muted: "rgba(255, 255, 255, 0.6)"
  },
  transparencies: {
    positive: "rgba(255, 255, 255, 0.05)",
    negative: "rgba(0, 0, 0, 0.6)"
  }
}

export const styled = Styled.default as Styled.CreateStyled<Theme>
