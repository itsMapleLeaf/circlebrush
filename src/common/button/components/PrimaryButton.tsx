import { styled } from "../../../modules/theming/themes"
import { Button } from "./Button"
import { getColor, getTransparency } from "../../../modules/theming/helpers"

export const PrimaryButton = styled(Button)`
  display: inline-flex;
  justify-content: center;

  padding: 8px;

  background: ${getTransparency("negative")};

  > .label {
    font-weight: bold;
    font-size: 0.8em;

    color: ${getColor("accent")};
    text-transform: uppercase;
  }

  &:hover {
    background: ${getColor("accent")};

    > .label {
      color: ${getColor("primary")};
    }
  }
`
