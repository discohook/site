import styled, { css } from "styled-components"
import { RichEmbedContainer } from "../../preview/components/RichEmbedContainer"

export const Emoji = styled.img.attrs({ draggable: false })<{ big?: boolean }>`
  width: 1.375em;
  height: 1.375em;

  object-fit: contain;
  vertical-align: bottom;

  ${({ theme, big }) =>
    theme.appearance.display === "cozy" &&
    big &&
    css`
      width: 3rem;
      height: 3rem;
      min-height: 3rem;
    `}

  ${RichEmbedContainer} & {
    width: 18px;
    height: 18px;
  }
`
