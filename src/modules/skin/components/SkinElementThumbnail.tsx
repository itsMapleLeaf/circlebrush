import React from "react"

import { SkinElementLike } from "../types/SkinElementLike"
import { AnimatedImageElementThumbnail } from "../../animation/components/AnimatedImageElementThumbnail"
import { AnimatedImageElement } from "../../animation/classes/AnimatedImageElement"
import { ImageElementThumbnail } from "../../imagery/components/ImageElementThumbnail"
import { ImageElement } from "../../imagery/classes/ImageElement"

export type SkinElementThumbnailProps = {
  element: SkinElementLike
  className?: string
}

export function SkinElementThumbnail(props: SkinElementThumbnailProps) {
  const { element, className } = props

  if (element instanceof AnimatedImageElement) {
    return <AnimatedImageElementThumbnail className={className} element={element} />
  }

  if (element instanceof ImageElement) {
    return <ImageElementThumbnail className={className} element={element} />
  }

  return null
}
