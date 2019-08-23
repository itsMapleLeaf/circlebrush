import React from "react"
import { styled } from "../../theming/themes"
import { keyframes, css } from "@emotion/core"

export type SpriteAnimation = {
  width: number
  count: number
}

export type ImagePreviewProps = {
  src: string
  className?: string
  animation?: SpriteAnimation
}

const createKeyFrames = (width: number) => keyframes`
  100% {
    background-position: -${width}px;
  }
`

const Container = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  background-image: url("/img/checkers.png");
  background-attachment: fixed;
  background-size: 10%;

  image-rendering: -webkit-optimize-contrast;
  padding: 32px;
`

const Image = styled.div<{ animation?: SpriteAnimation }>`
  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  image-rendering: auto;

  ${props => {
    const { animation } = props
    if (!animation) return ""

    const { width, count } = animation

    return css`
      animation-name: ${createKeyFrames(width)};
      animation-timing-function: steps(${count});
      animation-iteration-count: infinite;
      animation-duration: ${count * 60}ms;

      background-position: left center;
      background-size: auto;

      width: ${width / count}px;
    `
  }}
`

export function ImagePreview(props: ImagePreviewProps) {
  const { src, className, animation } = props

  return (
    <Container className={className}>
      <Image
        animation={animation}
        style={{ backgroundImage: `url("${CSS.escape(src)}")` }}
      />
    </Container>
  )
}
