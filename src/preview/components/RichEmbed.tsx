import React from "react"
import styled, { css } from "styled-components"
import { numberToHex } from "../../color/helpers/numberToHex"
import { Markdown } from "../../markdown/components/Markdown"
import { MarkdownContainer } from "../../markdown/components/MarkdownContainer"
import { ID } from "../../message/constants/id"
import { EmbedWithGallery } from "../../message/helpers/getEmbedsWithGallery"
import { getFieldsWithWidths } from "../../message/helpers/getFieldsWithWidths"
import { EmbedAuthor } from "./EmbedAuthor"
import { EmbedField } from "./EmbedField"
import { EmbedFooter } from "./EmbedFooter"
import { EmbedGallery } from "./EmbedGallery"
import { RichEmbedContainer } from "./RichEmbedContainer"

const EmbedGrid = styled.div`
  padding: 0.5rem 1rem 1rem 0.75rem;
  display: inline-grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
`

const EmbedTitleNormal = styled.span`
  display: inline-block;
  margin: 8px 0 0;
  grid-column: 1 / 2;

  & > ${MarkdownContainer} {
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.header.primary};
  }
`

const EmbedTitleLink = styled(EmbedTitleNormal.withComponent("a"))`
  & > ${MarkdownContainer} {
    color: ${({ theme }) => theme.text.link};
  }
`

const EmbedDescription = styled.div`
  margin: 8px 0 0;
  grid-column: 1 / 2;

  & > ${MarkdownContainer} {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.text.normal};

    line-height: 1.125rem;
    white-space: pre-line;
  }
`

const EmbedFields = styled.div`
  margin: 8px 0 0;

  display: grid;
  grid-column: 1 / 2;
  grid-gap: 8px;
`

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

const EmbedThumbnail = styled.img`
  width: 80px;
  height: 80px;
  margin: 8px 0 0 16px;

  border-radius: 4px;

  grid-row: 1 / 8;
  grid-column: 2 / 2;
  flex-shrink: 0;
  justify-self: end;

  cursor: pointer;
`

export type RichEmbedProps = {
  embed: EmbedWithGallery
}

export function RichEmbed(props: RichEmbedProps) {
  const {
    title,
    description,
    url,
    timestamp,
    color,
    footer,
    image,
    thumbnail,
    author,
    fields,
    gallery,
  } = props.embed

  const embedColor = numberToHex(color)

  const hasThumbnail = /^https?:\/\/.+/i.test(thumbnail?.url ?? "")
  const hasImage = /^https?:\/\/.+/i.test(image?.url ?? "")

  return (
    <RichEmbedContainer style={{ borderColor: embedColor }}>
      <EmbedGrid>
        {author && <EmbedAuthor author={author} />}
        {title &&
          (url ? (
            <EmbedTitleLink
              href={url}
              rel="noopener noreferrer nofollow ugc"
              target="_blank"
            >
              <Markdown content={title} type="embed-header" />
            </EmbedTitleLink>
          ) : (
            <EmbedTitleNormal>
              <Markdown content={title} type="embed-header" />
            </EmbedTitleNormal>
          ))}
        {description && (
          <EmbedDescription>
            <Markdown content={description} type="embed-content" />
          </EmbedDescription>
        )}
        {fields && (
          <EmbedFields>
            {getFieldsWithWidths(fields).map(({ width, ...field }) => (
              <EmbedField key={field[ID]} field={field} width={width} />
            ))}
          </EmbedFields>
        )}
        {gallery ? (
          <EmbedGallery gallery={gallery} />
        ) : hasImage ? (
          <EmbedImage
            src={image?.url}
            alt="Image"
            hasThumbnail={hasThumbnail}
          />
        ) : (
          undefined
        )}
        {(footer ?? timestamp) && (
          <EmbedFooter
            footer={footer}
            timestamp={timestamp}
            hasThumbnail={hasThumbnail}
          />
        )}
        {hasThumbnail && (
          <EmbedThumbnail src={thumbnail?.url} alt="Thumbnail" />
        )}
      </EmbedGrid>
    </RichEmbedContainer>
  )
}
