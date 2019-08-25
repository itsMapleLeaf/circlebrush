import React, { useState } from "react"
import { styled } from "../../theming/themes"
import {
  SpriteAnimationProps,
  SpriteAnimation,
} from "../../animation/components/SpriteAnimation"

export type ImagePreviewProps = {
  src: string
  className?: string
  animation?: SpriteAnimationProps & {
    playOnHover?: boolean
  }
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
  const { src, className, animation } = props

  const [hovering, setHovering] = useState(false)

  const renderImage = () => {
    if (animation) {
      const { playOnHover = false } = animation

      return <SpriteAnimation enabled={!playOnHover || hovering} {...animation} />
    }

    return <Image style={{ backgroundImage: `url("${CSS.escape(src)}")` }} />
  }

  return (
    <Container
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={className}
    >
      {renderImage()}
    </Container>
  )
}
