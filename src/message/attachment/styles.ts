import styled from "@emotion/styled"
import { Theme } from "../../themes"

export const Container = styled.div<{}, Theme>`
  width: 100%;
  max-width: 520px;

  margin: 8px 0 0;
  padding: 10px;

  display: flex;
  align-items: center;

  box-sizing: border-box;
  border: 1px solid
    ${({ theme }) =>
      theme.color === "dark" ? "rgba(47, 49, 54, 0.6)" : "#f6f6f7"};
  border-radius: 3px;

  background: ${({ theme }) =>
    theme.color === "dark" ? "rgba(47, 49, 54, 0.3)" : "transparent"};
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

export const FileNameInner = styled.span<{}, Theme>`
  color: ${({ theme }) => theme.text.link};
  font-size: 16px;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export const FileSize = styled.div<{}, Theme>`
  color: #72767d;
  font-size: 12px;
  line-height: 16px;
  font-weight: 300;
`

export const DownloadButton = styled.div<{}, Theme>`
  cursor: pointer;

  color: #4f545c;

  &:hover {
    color: rgba(114, 118, 125, 0.6);
  }

  & > svg {
    fill: currentColor;
  }
`
