import React from "react"
import styled, { css } from "styled-components"
import { id } from "../message/uid"
import { ImageWithId } from "./getEmbedsWithGallery"

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

type EmbedGalleryCellProps = { length?: number; index?: number }
const EmbedGalleryCell = styled.div<EmbedGalleryCellProps>`
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
  width: 100%;
  height: 100%;

  object-fit: cover;
`

type Props = {
  gallery: ImageWithId[]
}

export default function EmbedGallery(props: Props) {
  const { gallery } = props

  return (
    <EmbedGalleryWrapper>
      {gallery.map((image, index) => (
        <EmbedGalleryCell key={image[id]} length={gallery.length} index={index}>
          <EmbedGalleryImage src={image.url} alt="Image" />
        </EmbedGalleryCell>
      ))}
    </EmbedGalleryWrapper>
  )
}
