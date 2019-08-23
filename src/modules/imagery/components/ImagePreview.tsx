import React from "react"
import { styled } from "../../theming/themes"

export type ImagePreviewProps = {
  src: string
  className?: string
}

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

const Image = styled.div`
  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  image-rendering: auto;
`

export function ImagePreview(props: ImagePreviewProps) {
  const { src, className } = props

  return (
    <Container className={className}>
      <Image style={{ backgroundImage: `url("${CSS.escape(src)}")` }} />
    </Container>
  )
}
