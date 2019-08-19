import { styled } from "../../../theming/themes"
import { Button } from "../../../../common/button/components/Button"
import { TITLEBAR_HEIGHT } from "./constants"
import { size } from "polished"
import { getTransparency } from "../../../theming/helpers"

export const TitlebarButton = styled(Button)`
  ${size(TITLEBAR_HEIGHT)};

  display: flex;
  justify-content: center;
  align-items: center;

  > .icon {
    ${size(16)};
    opacity: 0.5;
  }

  &:hover {
    background: ${getTransparency("negative")};

    > .icon {
      opacity: 1;
    }
  }
`
