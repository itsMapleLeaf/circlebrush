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
    const { frames, width, height } = element.data
    if (!frames) return

    return {
      sprite: element.preview,
      count: frames.count,
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
