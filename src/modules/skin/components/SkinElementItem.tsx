import { SkinElementLike } from "../types/SkinElementLike"
import { ImageElement } from "../../imagery/classes/ImageElement"
import React from "react"

export interface SkinElementItemProps {
  element: SkinElementLike
}

export function SkinElementItem(props: SkinElementItemProps) {
  const { element } = props

  if (element instanceof ImageElement) {
    const { path } = element

    return <img src={path} />
  }

  return null
}
