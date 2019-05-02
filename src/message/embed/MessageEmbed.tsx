import React from "react"
import styled from "styled-components"
import { Markup } from "../markup/Markup"
import { Embed } from "./Embed"
import { EmbedAuthor } from "./EmbedAuthor"
import { EmbedField } from "./EmbedField"
import { EmbedFooter } from "./EmbedFooter"

interface Props {
  embed: Embed
}

const Container = styled.div`
  margin: 8px 0 0;
  max-width: 520px;
  display: flex;
`

const colorToRgb = (color: number) =>
  `rgb(${(color >> 16) & 255}, ${(color >> 8) & 255}, ${color & 255})`

const Pill = styled.div<{ fill?: number }>`
  background-color: ${(props) => colorToRgb(props.fill || 5198940)};
  border-radius: 3px 0 0 3px;
  flex-shrink: 0;
  width: 4px;
`

const EmbedContent = styled.div`
  display: flex;

  border: 1px solid rgba(46, 48, 54, 0.6);

  background: rgba(46, 48, 54, 0.3);
  border-radius: 0 3px 3px 0;

  padding: 8px 10px;
`

const InnerEmbedContent = styled.div`
  flex: 1;
  color: #dcddde;

  > * + * {
    margin: 4px 0 0;
  }
`

const EmbedTitle = styled.a`
  display: inline-block;

  font-size: 14px;
  font-weight: 500;
  color: ${(props) => (props.href ? "#0096cf;" : "#ffffff")};
  text-decoration: none;

  :hover {
    text-decoration: ${(props) => (props.href ? "underline" : "none")};
  }
`

const EmbedDescription = styled.div`
  color: #aeafb1;
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

  && {
    margin: 8px 0 0;
  }
`

const EmbedThumbnail = styled.img`
  max-width: 80px;
  max-height: 80px;
  flex-shrink: 0;

  margin: 0 0 0 16px;

  border-radius: 3px;
  object-fit: contain;

  cursor: pointer;
`

export const MessageEmbed = (props: Props) => (
  <Container>
    <Pill fill={props.embed.color} />
    <EmbedContent>
      <InnerEmbedContent>
        {props.embed.author && <EmbedAuthor author={props.embed.author} />}
        {props.embed.title && (
          <EmbedTitle href={props.embed.url}>
            <Markup content={props.embed.title} inline={true} />
          </EmbedTitle>
        )}
        {props.embed.description && (
          <EmbedDescription>
            <Markup content={props.embed.description} />
          </EmbedDescription>
        )}
        {props.embed.fields && (
          <EmbedFields>
            {props.embed.fields.map((field, index) => (
              <EmbedField field={field} key={index} />
            ))}
          </EmbedFields>
        )}
        {props.embed.image && <EmbedImage src={props.embed.image.url} />}
        {(props.embed.footer || props.embed.timestamp) && (
          <EmbedFooter
            footer={props.embed.footer}
            timestamp={props.embed.timestamp}
          />
        )}
      </InnerEmbedContent>
      {props.embed.thumbnail && (
        <EmbedThumbnail src={props.embed.thumbnail.url} />
      )}
    </EmbedContent>
  </Container>
)
