import { styled } from "../../../modules/theming/themes"
import { Button } from "./Button"
import { getColor, getTransparency, getFontColor } from "../../../modules/theming/helpers"

export const SecondaryButton = styled(Button)`
  display: inline-flex;
  justify-content: center;

  padding: 8px;

  background: ${getTransparency("negative")};

  > .label {
    font-weight: bold;
    font-size: 0.8em;

    color: ${getFontColor("normal")};
    text-transform: uppercase;
  }

  &:hover {
    background: ${getFontColor("normal")};
    border-color: transparent;

    > .label {
      color: ${getColor("primary")};
    }
  }
`
