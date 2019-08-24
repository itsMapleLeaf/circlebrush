import { styled } from "../../../modules/theming/themes"
import { getColor, getTransparency } from "../../../modules/theming/helpers"
import React from "react"

export type ProgressBarProps = {
  value: number
}

const Container = styled.div`
  height: 2px;
  width: 100%;

  background: ${getTransparency("positive")};
`

const Fill = styled.div`
  width: 100%;
  height: 2px;

  background: ${getColor("accent")};
  transform-origin: 0;
`

export function ProgressBar(props: ProgressBarProps) {
  const { value } = props

  return (
    <Container>
      <Fill
        style={{
          transform: `scaleX(${value})`,
        }}
      />
    </Container>
  )
}
