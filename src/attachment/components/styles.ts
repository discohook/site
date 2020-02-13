import { rgb, transparentize } from "polished"
import styled from "styled-components"
import { DARK_THEME } from "../../appearance/constants/darkTheme"

export const AttachmentContainer = styled.div`
  width: 100%;
  max-width: 520px;

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
      : "none"};
`

export const AttachmentIconContainer = styled.div`
  width: 30px;
  height: 40px;
  margin: 0 8px 0 0;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const AttachmentInfo = styled.div`
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const AttachmentFileName = styled.div`
  line-height: 1em;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const AttachmentFileNameInner = styled.span`
  color: ${({ theme }) => theme.text.link};
  font-size: 1em;

  cursor: pointer;

  opacity: 0.85;

  &:hover {
    text-decoration: underline;
  }
`

export const AttachmentFileSize = styled.div`
  color: ${DARK_THEME.text.muted};
  font-size: 12px;
  line-height: 1.33333em;
  font-weight: 300;
`

export const AttachmentDownloadButton = styled.div`
  height: 25px;

  color: ${DARK_THEME.interactive.muted};

  cursor: pointer;

  &:hover {
    color: ${({ theme }) => transparentize(0.4, theme.text.muted)};
  }

  & > svg {
    fill: currentColor;
  }
`
