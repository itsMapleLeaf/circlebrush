import { styled } from "../../../theming/themes"
import { getColor } from "../../../theming/helpers"
import { SkinElementLike } from "../../types/SkinElementLike"
import { ImagePreview } from "../../../imagery/components/ImagePreview"
import React from "react"
import { ImageElement } from "../../../imagery/classes/ImageElement"
import { PrimaryInfo } from "./PrimaryInfo"

export interface SkinElementSidebarProps {
  element: SkinElementLike
}

const Container = styled.div`
  background: ${getColor("primary")};
  width: 450px;
`

const Sections = styled.div`
  margin-top: 16px;
  padding: 0px 16px;
`

const Image = styled(ImagePreview)`
  height: 350px;
`

export function SkinElementSidebar(props: SkinElementSidebarProps) {
  const { element } = props

  const renderPreview = () => {
    if (element instanceof ImageElement) {
      return <Image src={element.path} />
    }
  }

  return (
    <Container>
      {renderPreview()}
      <Sections>
        <PrimaryInfo element={element} />
      </Sections>
    </Container>
  )
}
