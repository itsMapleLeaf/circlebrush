import React, { useState } from "react"
import { Skin } from "../../../skin/classes/Skin"
import { SkinElementList } from "../../../skin/components/SkinElementList"
import { FilterOptions } from "./FilterOptions"

export type ElementListViewProps = {
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
      <FilterOptions filter={filter} onChange={setFilter} />
      <SkinElementList elements={elements} />
    </>
  )
}
