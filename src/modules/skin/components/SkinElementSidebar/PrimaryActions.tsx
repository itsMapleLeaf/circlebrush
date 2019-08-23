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

const Container = styled.div``

export function PrimaryActions(props: PrimaryActionsProps) {
  const { element } = props

  return (
    <Container>
      <ButtonList horizontal>
        <PrimaryButton
          stretch
          label="Edit element"
          onClick={() => shell.openItem(element.assetPath)}
        />
        <SecondaryButton
          stretch
          label="Show in folder"
          onClick={() => shell.showItemInFolder(element.assetPath)}
        />
      </ButtonList>
    </Container>
  )
}
