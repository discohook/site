import styled from "@emotion/styled"
import React from "react"
import { Theme } from "../core/themes"
import Markup from "../markup/Markup"
import {
  BlockQuoteContent,
  CodeBlockContainer,
  Emoji,
  MarkupContainer,
} from "../markup/styles"
import { Embed } from "../message/Message"
import { id } from "../message/uid"
import EmbedAuthor from "./EmbedAuthor"
import EmbedField from "./EmbedField"
import EmbedFooter from "./EmbedFooter"

const Container = styled.div`
  margin: 8px 0 0;
  max-width: 520px;
  display: flex;

  & ${MarkupContainer} ${Emoji} {
    object-fit: contain;
    width: 1rem;
    height: 1rem;
    min-width: 22px;
    min-height: 22px;

    margin: 0 0.05em 0 0.1em;
    vertical-align: -0.4em;
  }
`

const Pill = styled.div<{}, Theme>`
  background: ${({ theme }) =>
    theme.color === "dark" ? "#4f545c" : "#cacbce"};
  border-radius: 3px 0 0 3px;
  flex-shrink: 0;
  width: 4px;
`

const EmbedContent = styled.div<{}, Theme>`
  max-width: 520px;
  display: flex;

  border: 1px solid
    ${({ theme }) =>
      theme.color === "dark"
        ? "rgba(46, 48, 54, 0.6)"
        : "rgba(205, 205, 205, 0.3)"};

  background: ${({ theme }) =>
    theme.color === "dark"
      ? "rgba(46, 48, 54, 0.3)"
      : "rgba(249, 249, 249, 0.3)"};
  border-radius: 0 3px 3px 0;

  padding: 8px 10px;
`

const InnerEmbedContent = styled.div`
  flex: 1;
  overflow: hidden;

  & > * + * {
    margin: 4px 0 0;
  }
`

const EmbedTitleNormal = styled.span<{}, Theme>`
  display: inline-block;
  padding: 2px 0 1px;

  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => (theme.color === "dark" ? "#ffffff" : "#4f545c")};
`

const EmbedTitleLink = styled(EmbedTitleNormal.withComponent("a"))`
  color: ${({ theme }) => theme.text.link};
`

const EmbedDescription = styled.div<{}, Theme>`
  color: ${({ theme }) =>
    theme.color === "dark"
      ? "rgba(255, 255, 255, 0.6)"
      : "rgba(79, 83, 91, 0.9)"};
  font-size: 0.875rem;

  & > ${MarkupContainer} {
    line-height: 1rem;
    white-space: pre-line;

    & ${CodeBlockContainer},
    & ${BlockQuoteContent} {
      max-width: 100%;
    }
  }
`

const EmbedFields = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const EmbedImage = styled.img`
  max-width: 256px;
  max-height: 256px;

  border-radius: 3px;

  cursor: pointer;

  * + & {
    margin: 8px 0 0;
  }
`

const EmbedThumbnail = styled.img`
  width: 80px;
  height: 80px;
  flex-shrink: 0;

  margin: 0 0 0 16px;

  border-radius: 3px;
  object-fit: contain;

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

  const embedPillColor =
    typeof color === "number"
      ? `#${color.toString(16).padStart(6, "0")}`
      : undefined

  const EmbedTitle = url ? EmbedTitleLink : EmbedTitleNormal

  return (
    <Container>
      <Pill style={{ backgroundColor: embedPillColor }} />
      <EmbedContent>
        <InnerEmbedContent>
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
              {fields.map(field => (
                <EmbedField field={field} key={field[id]} />
              ))}
            </EmbedFields>
          )}
          {image && <EmbedImage src={image.url} alt="Image" />}
          {(footer || timestamp) && (
            <EmbedFooter footer={footer} timestamp={timestamp} />
          )}
        </InnerEmbedContent>
        {thumbnail && <EmbedThumbnail src={thumbnail.url} alt="Thumbnail" />}
      </EmbedContent>
    </Container>
  )
}
