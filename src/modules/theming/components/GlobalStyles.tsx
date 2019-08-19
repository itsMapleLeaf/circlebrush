import React from "react"
import { css, Global } from "@emotion/core"
import { Theme } from "../types/Theme"

const style = (theme: Theme) => css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: inherit;
    font-style: inherit;
    font-size: 100%;
    font-family: inherit;
    vertical-align: baseline;
    line-height: inherit;
    margin: 0;
  }

  html,
  body {
    margin: 0;
    padding: 0;

    font-family: "Open Sans", sans-serif;

    color: ${theme.fontColors.normal};
    background: transparent;
    overflow: hidden;
  }

  button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;

    background: transparent;

    color: inherit;
    font: inherit;

    line-height: normal;

    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;

    -webkit-appearance: none;
  }
`

export function GlobalStyles() {
  return <Global styles={style} />
}
