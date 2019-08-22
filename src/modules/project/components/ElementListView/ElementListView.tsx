import { Skin } from "../../../skin/classes/Skin"
import { useState } from "react"
import React from "react"
import { FilterOptions } from "./FilterOptions"
import { SkinElementList } from "../../../skin/components/SkinElementList"

export interface ElementListViewProps {
  skin: Skin
}

export function ElementListView(props: ElementListViewProps) {
  const { skin } = props

  const [filter, setFilter] = useState({
    search: "",
  })

  const elements = skin.elements.filter(element => {
    const { search } = filter

    if (!search) return true

    return element.name.includes(search) || element.alias.includes(search)
  })

  return (
    <>
      <FilterOptions filter={filter} onChange={filter => setFilter(filter)} />
      <SkinElementList elements={elements} />
    </>
  )
}
