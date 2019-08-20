import { SkinElementLike } from "../../types/SkinElementLike"
import { styled } from "../../../theming/themes"
import React from "react"
import { PrimaryButton } from "../../../../common/button/components/PrimaryButton"
import { shell } from "electron"
import { ButtonList } from "../../../../common/button/components/ButtonList"
import { SecondaryButton } from "../../../../common/button/components/SecondaryButton"

export interface PrimaryActionsProps {
  element: SkinElementLike
}

const Container = styled.div`
  margin-top: 32px;
`

export function PrimaryActions(props: PrimaryActionsProps) {
  const { element } = props

  return (
    <Container>
      <ButtonList horizontal>
        <PrimaryButton
          stretch
          label="Edit element"
          onClick={() => shell.openItem(element.path)}
        />
        <SecondaryButton
          stretch
          label="Show in folder"
          onClick={() => shell.showItemInFolder(element.path)}
        />
      </ButtonList>
    </Container>
  )
}
