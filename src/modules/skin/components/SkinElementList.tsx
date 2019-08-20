import { useSkin } from "../hooks/useSkin"
import React from "react"
import { SkinElementItem } from "./SkinElementItem"

export function SkinElementList() {
  const skin = useSkin()

  return (
    <>
      {skin.elements.map(element => (
        <SkinElementItem element={element} />
      ))}
    </>
  )
}
