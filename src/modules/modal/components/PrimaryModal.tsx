import { styled } from "../../theming/themes"
import { getColor } from "../../theming/helpers"
import React from "react"
import { Button } from "../../../common/button/components/Button"
import { useModalContext } from "../hooks/useModalContext"
import { size } from "polished"

const Base = styled.div`
  background: ${getColor("background")};
  border-top: ${getColor("accent")} 2px solid;
`

const HeaderContainer = styled.div`
  padding: 24px;
  padding-bottom: 0px;

  font-weight: bold;
  font-size: 1em;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CloseButton = styled(Button)`
  ${size(32)};

  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 32px;

  opacity: 0.5;

  > .icon {
    ${size(16)};
  }

  &:hover {
    opacity: 1;
  }
`

export type HeaderProps = {
  title: string
}

export function Header(props: HeaderProps) {
  const { title } = props
  const { dismiss } = useModalContext()

  return (
    <HeaderContainer>
      <h3>{title}</h3>
      <CloseButton icon="close" onClick={dismiss} />
    </HeaderContainer>
  )
}

const Body = styled.div`
  padding: 24px;
  font-size: 0.8em;
`

export const PrimaryModal = { Base, Header, Body }
