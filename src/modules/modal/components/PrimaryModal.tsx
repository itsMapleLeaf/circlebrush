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

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeaderTitle = styled.h1`
  margin-right: 32px;

  font-weight: bold;
  font-size: 1em;
`

const CloseButton = styled(Button)`
  ${size(32)};

  display: flex;
  justify-content: center;
  align-items: center;

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
      <HeaderTitle>{title}</HeaderTitle>
      <CloseButton icon="close" onClick={dismiss} />
    </HeaderContainer>
  )
}

const Body = styled.div`
  padding: 24px;
  font-size: 0.8em;
`

export const PrimaryModal = { Base, Header, Body }
