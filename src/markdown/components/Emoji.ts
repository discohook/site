import { em, rem, size } from "polished"
import styled, { css } from "styled-components"
import { RichEmbedContainer } from "../../preview/components/RichEmbedContainer"

export const Emoji = styled.img.attrs({ draggable: false })<{ big?: boolean }>`
  ${size(em(22))};

  object-fit: contain;
  vertical-align: bottom;

  ${({ theme, big }) =>
    theme.appearance.display === "cozy" &&
    big &&
    css`
      ${size(rem(48))};

      min-height: ${rem(48)};
    `}

  ${RichEmbedContainer} & {
    ${size(18)};
  }
`
