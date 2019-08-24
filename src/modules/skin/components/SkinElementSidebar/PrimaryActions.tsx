import { shell } from "electron"
import React from "react"
import { ButtonList } from "../../../../common/button/components/ButtonList"
import { PrimaryButton } from "../../../../common/button/components/PrimaryButton"
import { SecondaryButton } from "../../../../common/button/components/SecondaryButton"
import { styled } from "../../../theming/themes"
import { ImageElement } from "../../../imagery/classes/ImageElement"

export type PrimaryActionsProps = {
  element: ImageElement
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
