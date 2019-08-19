import { IconType } from "../../icon/types/IconType"
import { styled } from "../../../modules/theming/themes"
import React from "react"
import { Icon } from "../../icon/components/Icon"

export interface ButtonVariants {
  stretch?: boolean
}

export interface ButtonProps extends ButtonVariants {
  className?: string
  icon?: IconType
  label?: string
  onClick: () => void
}

const Container = styled.button<ButtonVariants>`
  ${props =>
    props.stretch &&
    `
    width: 100%;
  `}

  &:focus {
    outline: none;
  }
`

const Inner = styled.span`
  &:hover {
    cursor: pointer;
  }
`

export function Button(props: ButtonProps) {
  const { stretch, className, icon, label, ...rest } = props

  const renderIcon = () => {
    if (!icon) return

    return <Icon name={icon} className="icon" />
  }

  const renderLabel = () => {
    if (!label) return

    return <span className="label">{label}</span>
  }

  return (
    <Container stretch={stretch} {...rest}>
      <Inner className={className}>
        {renderIcon()}
        {renderLabel()}
      </Inner>
    </Container>
  )
}
