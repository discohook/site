import { tint, transparentize } from "polished"
import styled from "styled-components"
import { DARK_THEME } from "../../../common/style/themes/darkTheme"

export const Mention = styled.span`
  border-radius: 3px;
  padding: 0 2px;

  cursor: pointer;

  background: ${({ theme }) =>
    theme.appearance.color === "dark"
      ? transparentize(0.9, theme.accent.primary)
      : tint(0.9, theme.accent.primary)};

  color: ${({ theme }) => theme.accent.primary};
  font-weight: 500;

  &:hover {
    background: ${({ theme }) =>
      theme.appearance.color === "dark"
        ? transparentize(0.3, theme.accent.primary)
        : theme.accent.primary};

    color: ${DARK_THEME.header.primary};
  }
`
