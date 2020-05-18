import { useObserver } from "mobx-react-lite"
import { size } from "polished"
import React from "react"
import styled, { css } from "styled-components"
import type { Embed } from "../Embed"

const EmbedGalleryWrapper = styled.div<{ hasThumbnail?: boolean }>`
  grid-column: 1 / 2;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 4px;

  height: 300px;
  margin-top: 16px;

  border-radius: 4px;
  overflow: hidden;

  ${({ hasThumbnail }) =>
    hasThumbnail &&
    css`
      grid-column: 1 / 3;
    `}
`

const EmbedGalleryCell = styled.div<{ index?: number; length?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 100%;
  min-height: 100%;

  ${({ length, index }) =>
    (length === 1 || length === 2 || (length === 3 && index === 0)) &&
    css`
      grid-row: span 2;
    `}
`

const EmbedGalleryImage = styled.img`
  ${size("100%")};

  object-fit: cover;
`

export type EmbedGalleryProps = {
  embed: Embed
}

export function EmbedGallery(props: EmbedGalleryProps) {
  const { embed } = props

  return useObserver(() => (
    <EmbedGalleryWrapper>
      {embed.gallery.map((url, index) => (
        <EmbedGalleryCell
          // eslint-disable-next-line react/no-array-index-key
          key={`${index}-${url}`}
          index={index}
          length={embed.gallery.length}
        >
          <EmbedGalleryImage src={url} alt="Image" />
        </EmbedGalleryCell>
      ))}
    </EmbedGalleryWrapper>
  ))
}
