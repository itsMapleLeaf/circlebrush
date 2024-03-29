import React from "react"
import * as icons from "../icons"
import { IconType } from "../types/IconType"

export type IconProps = {
  className?: string
  name: IconType
}

export function Icon(props: IconProps) {
  const { name, className } = props

  if (!icons[name]) return null

  return React.cloneElement(icons[name], {
    className,
    width: "100%",
    height: "100%",
  })
}
