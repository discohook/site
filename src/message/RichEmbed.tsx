import styled from "@emotion/styled"
import React from "react"
import { id } from "../uid"
import EmbedAuthor from "./EmbedAuthor"
import EmbedField from "./EmbedField"
import EmbedFooter from "./EmbedFooter"
import Markup from "./markup/Markup"
import { Embed } from "./Message"

type Props = {
  embed: Embed
}

const Container = styled.div`
  margin: 8px 0 0;
  max-width: 520px;
  display: flex;
`

const Pill = styled.div`
  background: ${({ theme }) => theme.message.embed.pillDefaultFill};
  border-radius: 3px 0 0 3px;
  flex-shrink: 0;
  width: 4px;
`

const EmbedContent = styled.div`
  max-width: 520px;
  display: flex;

  border: 1px solid ${({ theme }) => theme.message.embed.border};

  background: ${({ theme }) => theme.message.embed.background};
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

const EmbedTitleNormal = styled.span`
  display: inline-block;

  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.message.embed.title};
`

const EmbedTitleLink = styled(EmbedTitleNormal.withComponent("a"))`
  color: ${({ theme }) => theme.link};
`

const EmbedDescription = styled.div`
  color: ${({ theme }) => theme.message.embed.description};
  font-size: 14px;
  line-height: 16px;
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

  const EmbedTitle = !url ? EmbedTitleNormal : EmbedTitleLink

  return (
    <Container>
      <Pill style={{ background: embedPillColor }} />
      <EmbedContent>
        <InnerEmbedContent>
          {author && <EmbedAuthor author={author} />}
          {title && (
            <EmbedTitle href={String(url)}>
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
          {image && <EmbedImage src={String(image.url)} alt="Image" />}
          {(footer || timestamp) && (
            <EmbedFooter footer={footer} timestamp={timestamp} />
          )}
        </InnerEmbedContent>
        {thumbnail && (
          <EmbedThumbnail src={String(thumbnail.url)} alt="Thumbnail" />
        )}
      </EmbedContent>
    </Container>
  )
}
