import { css } from "@emotion/core"
import styled from "@emotion/styled"
import React from "react"
import { Theme } from "../core/themes"
import { numberToHex } from "../editor/ColorInput"
import Markup from "../markup/Markup"
import {
  BlockQuoteContent,
  Code,
  CodeBlockContainer,
  Emoji,
  MarkupContainer,
} from "../markup/styles"
import { Embed } from "../message/Message"
import { id } from "../message/uid"
import EmbedAuthor from "./EmbedAuthor"
import EmbedField from "./EmbedField"
import EmbedFooter from "./EmbedFooter"
import { getFieldsWithWidths } from "./getFieldsWithWidths"

const Container = styled.div<{}, Theme>`
  max-width: 520px;
  margin: 8px 0 0;
  display: inline;

  background: ${({ theme }) => theme.background.secondary};

  border-radius: 4px;
  border-left: 4px solid ${({ theme }) => theme.background.tertiary};

  & ${MarkupContainer} {
    & ${Emoji} {
      width: 18px;
      height: 18px;
    }

    & ${CodeBlockContainer}, & ${BlockQuoteContent} {
      max-width: 100%;
    }

    & ${Code}, & ${CodeBlockContainer} {
      background: ${({ theme }) => theme.background.tertiary};
    }
  }
`

const EmbedGrid = styled.div<{}, Theme>`
  padding: 8px 16px 16px;
  display: inline-grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
`

const EmbedTitleNormal = styled.span<{}, Theme>`
  display: inline-block;
  margin: 8px 0 0;
  grid-column: 1 / 1;

  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.header.primary};
`

const EmbedTitleLink = styled(EmbedTitleNormal.withComponent("a"))`
  color: ${({ theme }) => theme.text.link};
`

const EmbedDescription = styled.div<{}, Theme>`
  margin: 8px 0 0;
  grid-column: 1 / 1;

  & > ${MarkupContainer} {
    font-size: 0.875rem;
    font-weight: 400;

    color: ${({ theme }) => theme.text.normal};

    line-height: 1.125rem;
    white-space: pre-line;
  }
`

const EmbedFields = styled.div`
  margin: 8px 0 0;

  display: grid;
  grid-column: 1 / 1;
  grid-gap: 8px;
`

const EmbedImage = styled.img<{ hasThumbnail?: boolean }>`
  max-width: 256px;
  max-height: 256px;

  margin: 16px 0 0;
  border-radius: 4px;

  cursor: pointer;

  grid-column: 1 / 1;

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

type Props = {
  embed: Embed
}

export default function RichEmbed(props: Props) {
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
  } = props.embed

  const embedColor = numberToHex(color)
  const hasThumbnail = Boolean(thumbnail)

  const EmbedTitle = url ? EmbedTitleLink : EmbedTitleNormal

  return (
    <Container style={{ borderColor: embedColor }}>
      <EmbedGrid>
        {author && <EmbedAuthor author={author} />}
        {title && (
          <EmbedTitle href={url}>
            <Markup content={title} inline />
          </EmbedTitle>
        )}
        {description && (
          <EmbedDescription>
            <Markup content={description} />
          </EmbedDescription>
        )}
        {fields && (
          <EmbedFields>
            {getFieldsWithWidths(fields).map(({ width, ...field }) => (
              <EmbedField key={field[id]} field={field} width={width} />
            ))}
          </EmbedFields>
        )}
        {image && (
          <EmbedImage src={image.url} alt="Image" hasThumbnail={hasThumbnail} />
        )}
        {(footer ?? timestamp) && (
          <EmbedFooter
            footer={footer}
            timestamp={timestamp}
            hasThumbnail={hasThumbnail}
          />
        )}
        {thumbnail && <EmbedThumbnail src={thumbnail.url} alt="Thumbnail" />}
      </EmbedGrid>
    </Container>
  )
}
