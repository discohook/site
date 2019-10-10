import styled from "@emotion/styled"
import React from "react"
import { FileLike } from "../backup/Backup"
import { Theme } from "../core/themes"
import AttachmentIcon from "./AttachmentIcon"
import { getHumanReadableSize } from "./getHumanReadableSize"
import {
  Container,
  DownloadButton,
  FileName,
  FileNameInner,
  FileSize,
  IconContainer,
  Info,
} from "./styles"

type Props = {
  file: FileLike
}

const AudioContainer = styled(Container)`
  flex-direction: column;
  width: 400px;
`

const AudioMetadata = styled.div`
  display: flex;

  margin: 2px 0 0;

  width: 378px;
  height: 40.5px;
`

const AudioIconContainer = styled(IconContainer)`
  margin: -4px 15px 0 -3px;
`

const AudioFileNameInner = styled(FileNameInner)`
  font-weight: 500;
`

const AudioFileSize = styled(FileSize)`
  margin: 2px 0 0;
  font-weight: 400;
`

const AudioDownloadButton = styled(DownloadButton)`
  align-self: flex-start;
  margin: -2px 0 0;

  display: flex;
  height: 25px;
  align-items: center;

  & > svg {
    height: 25px;
  }
`

const AudioControls = styled.div<{}, Theme>`
  display: flex;
  align-items: center;

  margin: 3px 0 0;

  width: 378px;
  height: 32px;

  background: rgba(0, 0, 0, 0.6);
  border-radius: 3px;
`

const AudioDuration = styled.div<{}, Theme>`
  display: flex;
  margin: 4px;

  color: #ffffff;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  line-height: 12px;
  font-weight: 500;
`

const AudioDurationSeparator = styled.span`
  margin: 0 2px;
`

const AudioSeekbarContainer = styled.div`
  flex: 1;
  height: 32px;

  margin: 4px;

  display: flex;
  align-items: center;

  cursor: pointer;
`

const AudioSeekbar = styled.div<{}, Theme>`
  width: 100%;
  height: 6px;

  background: rgba(185, 187, 190, 0.3);
  border-radius: 3px;
`

const AudioSeekbarHandle = styled.div<{}, Theme>`
  width: 6px;
  height: 6px;

  background: ${({ theme }) => theme.accent};
  border-radius: 3px;
`

const AudioControlButton = styled.div<{}, Theme>`
  width: 24px;
  height: 24px;
  margin: 4px;

  cursor: hover;

  color: white;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }

  & > svg {
    fill: currentColor;
  }
`

export default function AudioAttachment(props: Props) {
  const { name, size } = props.file

  return (
    <AudioContainer>
      <AudioMetadata>
        <AudioIconContainer>
          <AttachmentIcon type="audio" />
        </AudioIconContainer>
        <Info>
          <FileName>
            <AudioFileNameInner>{name}</AudioFileNameInner>
          </FileName>
          <AudioFileSize>{getHumanReadableSize(size)}</AudioFileSize>
        </Info>
        <AudioDownloadButton>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M19,9h-4V3H9v6H5l7,7,7-7zM5,18v2h14v-2H5z" />
          </svg>
        </AudioDownloadButton>
      </AudioMetadata>
      <AudioControls>
        <AudioControlButton>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <polygon points="0 0 0 14 11 7" transform="translate(7 5)" />
          </svg>
        </AudioControlButton>
        <AudioDuration>
          -:--
          <AudioDurationSeparator>/</AudioDurationSeparator>
          -:--
        </AudioDuration>
        <AudioSeekbarContainer>
          <AudioSeekbar>
            <AudioSeekbarHandle />
          </AudioSeekbar>
        </AudioSeekbarContainer>
        <AudioControlButton>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904ZM14 5.00195V7.00195C16.757 7.00195 19 9.24595 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 8.14295 17.86 5.00195 14 5.00195ZM14 9.00195C15.654 9.00195 17 10.349 17 12.002C17 13.657 15.654 15.002 14 15.002V13.002C14.551 13.002 15 12.553 15 12.002C15 11.451 14.551 11.002 14 11.002V9.00195Z"
            />
          </svg>
        </AudioControlButton>
      </AudioControls>
    </AudioContainer>
  )
}
