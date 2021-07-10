import { rgb, transparentize } from "polished"
import styled from "styled-components"
import { DARK_THEME } from "../../../common/theming/darkTheme"

export const Mention = styled.span`
  border-radius: 3px;
  padding: 0 2px;

  cursor: pointer;

  background: ${({ theme }) =>
    theme.appearance.color === "dark"
      ? transparentize(0.7, theme.discord.primary)
      : transparentize(0.85, theme.discord.primary)};

  color: ${({ theme }) =>
    theme.appearance.color === "dark"
      ? rgb(222, 224, 252)
      : theme.discord.primary};

  font-weight: 500;
  transition: background 50ms ease-out, color 50ms ease-out;

  &:hover {
    background: ${DARK_THEME.discord.primary};
    color: ${DARK_THEME.header.primary};
    transition: background 50ms ease-out, color 50ms ease-out;
  }
`
