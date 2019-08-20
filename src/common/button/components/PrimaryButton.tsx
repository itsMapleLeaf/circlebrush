import { styled } from "../../../modules/theming/themes"
import { Button } from "./Button"
import { getColor } from "../../../modules/theming/helpers"

export const PrimaryButton = styled(Button)`
  display: inline-flex;
  justify-content: center;

  padding: 8px;

  border: solid 2px ${getColor("accent")};
  border-radius: 3px;

  > .label {
    font-weight: bold;
    font-size: 0.9em;

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
