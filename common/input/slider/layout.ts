import {
  SliderHandle,
  SliderInput,
  SliderMarker,
  SliderRange,
  SliderTrack,
} from "@reach/slider"
import { size } from "polished"
import styled, { css } from "styled-components"
import { omitProp } from "../../utilities/omitProps"

export const Input = styled(omitProp(SliderInput, "hasMarkers"))<{
  hasMarkers?: boolean
}>`
  &[data-reach-slider-input] {
    height: 8px;
    padding: 4px 0 12px;

    width: 320px;
    max-width: 100%;

    outline: none;

    ${({ hasMarkers }) =>
      hasMarkers &&
      css`
        padding-bottom: 32px;
      `};
  }
`

export const Track = styled(SliderTrack)`
  &[data-reach-slider-track] {
    background: ${({ theme }) => theme.background.secondaryAlt};
    border-radius: 4px;
  }
`

export const Range = styled(SliderRange)`
  &[data-reach-slider-range] {
    background: inherit;
  }
`

export const Handle = styled(omitProp(SliderHandle, "hasFocus"))<{
  hasFocus?: boolean
}>`
  &[data-reach-slider-handle] {
    width: 8px;
    height: 16px;

    border: none;
    background: ${({ theme }) => theme.interactive.active};
    border-radius: 4px;

    box-shadow: ${({ theme }) => theme.elavation.medium};

    cursor: ew-resize;

    ${({ hasFocus }) =>
      hasFocus &&
      css`
        border: 2px solid ${({ theme }) => theme.accent.primary};
      `};
  }
`

export const Marker = styled(SliderMarker)`
  &[data-reach-slider-marker] {
    ${size("auto")};

    background: transparent;
    border: none;
  }
`

export const MarkerLabel = styled.div`
  transform: translateY(20px);

  font-size: 13px;
  font-weight: 500;

  user-select: none;
`
