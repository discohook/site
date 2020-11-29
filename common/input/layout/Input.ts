import styled from "styled-components"

export const Input = styled.input.attrs(({ type }) => ({
  type: type ?? "text",
}))`
  padding: 0 9px;
  height: 36px;
  min-width: 0;
  max-width: 100%;

  background: ${({ theme }) => theme.background.secondaryAlt};
  border: 2px solid transparent;
  border-radius: 3px;
  outline: none;

  color: ${({ theme }) => theme.text.normal};
  font-size: 16px;

  transition: 150ms;
  transition-property: background-color, border-color, color;

  unicode-bidi: plaintext;

  textarea& {
    padding: 5.5px 9px;
    min-height: 36px;

    resize: vertical;
  }

  &:focus {
    border-color: ${({ theme }) => theme.accent.primary};
  }

  &:disabled {
    border-color: ${({ theme }) => theme.interactive.muted};
    background: transparent;

    color: ${({ theme }) => theme.text.muted};
  }

  &:invalid {
    box-shadow: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.interactive.normal};
  }
`
