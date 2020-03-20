import styled, { css } from "styled-components"

export const RichEmbedContainer = styled.div`
  max-width: 520px;
  display: grid;

  background: ${({ theme }) => theme.background.secondary};

  border-radius: 4px;
  border-left: 4px solid ${({ theme }) => theme.background.tertiary};

  ${({ theme }) =>
    theme.appearance.display === "compact" &&
    css`
      margin: 6px 0 0;
    `}
`
