import { styled } from "../../../modules/theming/themes"
import css from "@emotion/css"

/** Consistent spacing of buttons */
export const ButtonList = styled.div<{ horizontal?: boolean }>`
  ${props => {
    const { horizontal = false } = props

    const verticalStyle = css`
      * + * {
        margin-top: 16px;
      }
    `

    const horizontalStyle = css`
      * + * {
        margin-left: 16px;
      }
    `

    return horizontal ? horizontalStyle : verticalStyle
  }}
`
