import { useObserver } from "mobx-react-lite"
import React from "react"
import { ImageElement } from "../classes/ImageElement"
import { ImagePreview } from "./ImagePreview"

export type ImageElementThumbnailProps = {
  element: ImageElement
  className?: string
}

export function ImageElementThumbnail(props: ImageElementThumbnailProps) {
  const { element, className } = props

  return useObserver(() => <ImagePreview className={className} src={element.preview} />)
}
