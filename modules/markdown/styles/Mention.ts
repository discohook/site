import { tint, transparentize } from "polished"
import styled from "styled-components"
import { DARK_THEME } from "../../../common/theming/darkTheme"

export const Mention = styled.span`
  border-radius: 3px;
  padding: 0 2px;

  cursor: pointer;

  background: ${({ theme }) =>
    theme.appearance.color === "dark"
      ? transparentize(0.9, theme.discord.primary)
      : tint(0.9, theme.discord.primary)};

  color: ${({ theme }) => theme.discord.primary};
  font-weight: 500;

  &:hover {
    background: ${({ theme }) =>
      theme.appearance.color === "dark"
        ? transparentize(0.3, theme.discord.primary)
        : theme.discord.primary};

    color: ${DARK_THEME.header.primary};
  }
`
