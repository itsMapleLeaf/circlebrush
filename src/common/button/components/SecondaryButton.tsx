import { styled } from "../../../modules/theming/themes"
import { Button } from "./Button"
import { getColor, getTransparency, getFontColor } from "../../../modules/theming/helpers"

export const SecondaryButton = styled(Button)`
  display: inline-flex;
  justify-content: center;

  padding: 8px;

  border: solid 2px ${getFontColor("muted")};
  border-radius: 3px;

  > .label {
    font-weight: bold;
    font-size: 0.9em;

    color: ${getFontColor("muted")};
    text-transform: uppercase;
  }

  &:hover {
    background: ${getFontColor("muted")};
    border-color: transparent;

    > .label {
      color: ${getColor("primary")};
    }
  }
`
