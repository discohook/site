import styled from "@emotion/styled"

export const AttachmentContainer = styled.div`
  width: 100%;
  max-width: 520px;

  margin: 8px 0 0;
  padding: 10px;

  display: flex;
  align-items: center;

  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.message.attachment.border};
  border-radius: 3px;

  background: ${({ theme }) => theme.message.attachment.background};
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
  line-height: 16px;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const AttachmentFileNameInner = styled.span`
  color: ${({ theme }) => theme.message.attachment.fileName};
  font-size: 16px;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export const AttachmentFileSize = styled.div`
  color: ${({ theme }) => theme.message.attachment.fileSize};
  font-size: 12px;
  line-height: 16px;
  font-weight: 300;
`

export const AttachmentDownloadButton = styled.div`
  cursor: pointer;

  color: ${({ theme }) => theme.message.attachment.download};

  &:hover {
    color: ${({ theme }) => theme.message.attachment.downloadHover};
  }

  & > svg {
    fill: currentColor;
  }
`
