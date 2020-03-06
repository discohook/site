import styled, { css } from "styled-components"

export const BaseModal = styled.div`
  width: 500px;
  max-width: calc(50vw - 48px);

  background: ${({ theme }) => theme.background.primary};
  border-radius: 5px;

  ${({ theme }) =>
    theme.appearance.mobile &&
    css`
      max-width: calc(100vw - 32px);
    `}
`
