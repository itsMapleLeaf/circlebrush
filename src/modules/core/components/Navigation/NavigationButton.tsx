import { styled } from "../../../theming/themes"
import { Button, ButtonWithProps } from "../../../../common/button/components/Button"
import { size } from "polished"
import { getTransparency } from "../../../theming/helpers"

export const NavigationButton = styled(Button as ButtonWithProps<{ active?: boolean }>)`
  ${size(55)};

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  &:after {
    content: "";

    display: block;
    width: 2px;

    position: absolute;
    top: 0px;
    bottom: 0px;
    right: 0px;
  }

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

  ${props =>
    props.active &&
    `
    > .icon {
      fill: ${props.theme.colors.accent};
      opacity: 1;
    }

    &::after {
      background: ${props.theme.colors.accent};
    }
  `}
`
