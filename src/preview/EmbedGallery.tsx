import { css } from "@emotion/core"
import styled from "@emotion/styled"
import React from "react"
import { id } from "../message/uid"
import { ImageWithId } from "./getEmbedsWithGallery"

const EmbedImage = styled.img<{ hasThumbnail?: boolean }>`
  max-width: 256px;
  max-height: 256px;

  margin: 16px 0 0;
  border-radius: 4px;

  cursor: pointer;

  grid-column: 1 / 2;

  ${({ hasThumbnail }) =>
    hasThumbnail &&
    css`
      grid-column: 1 / 3;
    `}
`

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
    (length === 2 || (length === 3 && index === 0)) &&
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
  hasThumbnail?: boolean
}

export default function EmbedGallery(props: Props) {
  const { gallery, hasThumbnail } = props

  console.log(gallery)

  if (gallery.length === 1) {
    return (
      <EmbedImage
        src={gallery[0].url}
        alt="Image"
        hasThumbnail={hasThumbnail}
      />
    )
  }

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
