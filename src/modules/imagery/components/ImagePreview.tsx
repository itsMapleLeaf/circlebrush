import { styled } from "../../theming/themes"
import React from "react"

export interface ImagePreviewProps {
  src: string
  className?: string
}

const Container = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  background-image: url("/img/checkers.png");
  background-attachment: fixed;
`

const Image = styled.img``

export function ImagePreview(props: ImagePreviewProps) {
  const { src, className } = props

  return (
    <Container className={className}>
      <Image src={src} />
    </Container>
  )
}
