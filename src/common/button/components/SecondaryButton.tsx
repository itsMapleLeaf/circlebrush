import { styled } from "../../../modules/theming/themes"
import { Button } from "./Button"
import { getColor, getTransparency } from "../../../modules/theming/helpers"

export const SecondaryButton = styled(Button)`
  display: inline-flex;
  justify-content: center;

  padding: 8px;

  border: solid 2px ${getTransparency("positive")};
  border-radius: 3px;

  > .label {
    font-weight: bold;
    font-size: 0.9em;

    color: ${getTransparency("positive")};
    text-transform: uppercase;
  }

  &:hover {
    background: ${getTransparency("positive")};

    > .label {
      color: ${getColor("primary")};
    }
  }
`
