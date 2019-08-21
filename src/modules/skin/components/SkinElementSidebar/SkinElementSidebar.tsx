import { styled } from "../../../theming/themes"
import { getColor } from "../../../theming/helpers"
import { SkinElementLike } from "../../types/SkinElementLike"
import React from "react"
import { ImageElement } from "../../../imagery/classes/ImageElement"
import { PrimaryInfo } from "./PrimaryInfo"
import { PrimaryActions } from "./PrimaryActions"
import { ImageElementThumbnail } from "../../../imagery/components/ImageElementThumbnail"

export interface SkinElementSidebarProps {
  element: SkinElementLike
}

const Container = styled.div`
  background: ${getColor("primary")};
  width: 380px;
  flex-shrink: 0;
`

const Sections = styled.div`
  margin-top: 32px;
  padding: 0px 32px;
`

const Image = styled(ImageElementThumbnail)`
  height: 350px;
`

const Divider = styled.div`
  height: 1px;
  width: 100%;

  background: ${getColor("divider")};
  margin: 16px 0px;
`

export function SkinElementSidebar(props: SkinElementSidebarProps) {
  const { element } = props

  const renderPreview = () => {
    if (element instanceof ImageElement) {
      return <Image element={element} />
    }
  }

  return (
    <Container>
      {renderPreview()}
      <Sections>
        <PrimaryInfo element={element} />
        <Divider />
        <PrimaryActions element={element} />
      </Sections>
    </Container>
  )
}
