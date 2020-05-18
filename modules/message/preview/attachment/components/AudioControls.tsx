import { size, transparentize } from "polished"
import React from "react"
import styled from "styled-components"
import { DARK_THEME } from "../../../../../common/style/themes/darkTheme"
import { play } from "../icons/play"
import { volume } from "../icons/volume"

const AudioControlsContainer = styled.div`
  display: flex;
  align-items: center;

  margin: 2px 0 0;

  width: 378px;
  height: 32px;

  background: ${transparentize(0.4, "black")};
  border-radius: 3px;
`

const AudioDuration = styled.div`
  display: flex;
  margin: 4px;

  color: ${DARK_THEME.header.primary};
  font-family: ${({ theme }) => theme.font.mono};
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

const AudioSeekbar = styled.div`
  width: 100%;
  height: 6px;

  background: ${transparentize(0.7, DARK_THEME.interactive.normal)};
  border-radius: 3px;
`

const AudioSeekbarHandle = styled.div`
  ${size(6)};

  background: ${({ theme }) => theme.accent.primary};
  border-radius: 3px;
`

const AudioControlButton = styled.div`
  ${size(24)};

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

export function AudioControls() {
  return (
    <AudioControlsContainer>
      <AudioControlButton>{play}</AudioControlButton>
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
      <AudioControlButton>{volume}</AudioControlButton>
    </AudioControlsContainer>
  )
}
