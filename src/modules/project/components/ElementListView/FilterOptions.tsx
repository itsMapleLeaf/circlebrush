import { styled } from "../../../theming/themes"
import React from "react"
import { TextInput } from "../../../../common/input/components/TextInput"

const Container = styled.div`
  margin-bottom: 32px;
`

export interface Filter {
  search: string
}

export interface FilterOptionsProps {
  filter: Filter
  onChange: (filter: Filter) => void
}

export function FilterOptions(props: FilterOptionsProps) {
  const { filter, onChange } = props

  const update = (newFilter: Partial<Filter>) => {
    onChange({ ...filter, ...newFilter })
  }

  return (
    <Container>
      <TextInput
        onInput={value => update({ search: value })}
        value={filter.search}
        placeholder="Filter..."
      />
    </Container>
  )
}
