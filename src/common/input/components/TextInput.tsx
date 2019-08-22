import { styled } from "../../../modules/theming/themes"
import React, { ChangeEvent } from "react"
import { getColor, getFontColor } from "../../../modules/theming/helpers"

const Container = styled.input`
  border: solid 1px ${getColor("divider")};
  background: ${getColor("primary")};

  font-size: 0.8em;
  font-family: "Open Sans", sans-serif;
  color: ${getFontColor("normal")};

  padding: 8px;
  height: 34px;

  &:focus {
    outline: none;
    border-color: ${getColor("accent")};
  }
`

export interface TextInputProps {
  placeholder?: string
  value: string
  onInput: (text: string) => void
}

export function TextInput(props: TextInputProps) {
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (props.onInput) {
      const { target } = event
      props.onInput(target.value)
    }
  }

  return <Container {...props} onInput={handleInput} />
}
