import styled, { css } from "styled-components"

export const BaseModal = styled.div`
  width: 440px;
  max-width: calc(50vw - 48px);
  max-height: 660px;
  min-height: 200px;

  background: ${({ theme }) => theme.background.primary};
  border-radius: 5px;

  ${({ theme }) =>
    theme.appearance.mobile &&
    css`
      max-width: calc(100vw - 32px);
    `}
`
