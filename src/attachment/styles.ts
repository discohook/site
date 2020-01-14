import { rgb, transparentize } from "polished"
import styled from "styled-components"
import { darkTheme } from "../appearance/themes"

export const Container = styled.div`
  width: 100%;
  max-width: 520px;

  margin: 8px 0 0;
  padding: 10px;

  display: flex;
  align-items: center;

  border: 1px solid
    ${({ theme }) =>
      theme.appearance.color === "dark"
        ? transparentize(0.4, theme.background.secondary)
        : rgb(246, 246, 247)};
  border-radius: 3px;

  background: ${({ theme }) =>
    theme.appearance.color === "dark"
      ? transparentize(0.7, theme.background.secondary)
      : "transparent"};
`

export const IconContainer = styled.div`
  width: 30px;
  height: 40px;
  margin: 0 8px 0 0;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const Info = styled.div`
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const FileName = styled.div`
  line-height: 16px;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const FileNameInner = styled.span`
  color: ${({ theme }) => theme.text.link};
  font-size: 16px;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export const FileSize = styled.div`
  color: ${darkTheme.text.muted};
  font-size: 12px;
  line-height: 16px;
  font-weight: 300;
`

export const DownloadButton = styled.div`
  cursor: pointer;

  color: ${darkTheme.interactive.muted};

  &:hover {
    color: ${({ theme }) => transparentize(0.4, theme.text.muted)};
  }

  & > svg {
    fill: currentColor;
  }
`
