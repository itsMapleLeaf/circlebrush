import { ImageElement } from "../classes/ImageElement"
import { useObserver } from "mobx-react-lite"
import { ImagePreview } from "./ImagePreview"
import React from "react"

export interface ImageElementThumbnailProps {
  element: ImageElement
  className?: string
}

export function ImageElementThumbnail(props: ImageElementThumbnailProps) {
  const { element, className } = props

  return useObserver(() => <ImagePreview className={className} src={element.preview} />)
}
