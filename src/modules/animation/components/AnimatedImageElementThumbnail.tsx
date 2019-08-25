import { AnimatedImageElement } from "../classes/AnimatedImageElement"
import { useObserver } from "mobx-react-lite"
import { ImagePreview } from "../../imagery/components/ImagePreview"
import React from "react"

export type AnimatedImageElementThumbnailProps = {
  element: AnimatedImageElement
  className?: string
}

export function AnimatedImageElementThumbnail(props: AnimatedImageElementThumbnailProps) {
  const { element, className } = props

  return useObserver(() => {
    const { frames } = element

    const getAnimation = () => {
      const { preview, frameDimensions } = element

      return {
        sprite: preview,
        count: frames.length,
        frameWidth: frameDimensions.width,
        frameHeight: frameDimensions.height,
      }
    }

    return (
      <ImagePreview
        className={className}
        src={frames[0].path}
        animation={getAnimation()}
      />
    )
  })
}
