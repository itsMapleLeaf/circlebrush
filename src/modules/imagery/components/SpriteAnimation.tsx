import { useState, useEffect, useRef } from "react"
import { styled } from "../../theming/themes"
import React from "react"
import { useCanvasAnimation } from "../../../common/dom/hooks/useCanvasAnimation"
import { getAspectRatioScale } from "../helpers/getAspectRatioScale"

export type SpriteAnimationProps = {
  sprite: string
  count: number
  frameWidth: number
  frameHeight: number
}

const Container = styled.canvas`
  width: 100%;
  height: 100%;
`

export function SpriteAnimation(props: SpriteAnimationProps) {
  const { sprite, count, frameHeight, frameWidth } = props

  const ref = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)

  const [loaded, setLoaded] = useState(false)
  const [image] = useState(() => new Image())

  useEffect(() => {
    setLoaded(false)

    image.onload = () => setLoaded(true)
    image.src = sprite

    return () => {
      image.onload = null
    }
  }, [sprite])

  const runCanvasFrame = (
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    runningTime: number,
  ) => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const timeBetweenFrames = 1000 * (1 / 30)
    const currentFrame = Math.floor(runningTime / timeBetweenFrames) % count
    const frameOffset = currentFrame * frameWidth

    const scale = getAspectRatioScale({
      width: frameWidth,
      height: frameHeight,
      targetWidth: canvas.width,
      targetHeight: canvas.height,
    })

    context.save()

    context.translate(canvas.width / 2, canvas.height / 2)
    context.scale(scale, scale)
    context.translate(-frameWidth / 2, -frameHeight / 2)

    context.drawImage(
      image,
      frameOffset,
      0,
      frameWidth,
      frameHeight,
      0,
      0,
      frameWidth,
      frameHeight,
    )

    context.restore()
  }

  useCanvasAnimation(ref, runCanvasFrame, loaded)

  return <Container ref={ref} />
}
