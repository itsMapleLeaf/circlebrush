import { useObserver } from "mobx-react-lite"
import React from "react"
import { ImageElement } from "../classes/ImageElement"
import { ImagePreview } from "./ImagePreview"

export type ImageElementThumbnailProps = {
  element: ImageElement
  className?: string
  playOnHover?: boolean
}

export function ImageElementThumbnail(props: ImageElementThumbnailProps) {
  const { element, className, playOnHover = false } = props

  const getAnimation = () => {
    const { sequence, width, height } = element.data
    if (!sequence) return

    return {
      sprite: element.preview,
      count: sequence.frames.length,
      frameHeight: height,
      frameWidth: width,
      playOnHover,
    }
  }

  return useObserver(() => (
    <ImagePreview
      className={className}
      src={element.preview}
      animation={getAnimation()}
    />
  ))
}
