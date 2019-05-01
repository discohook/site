import React from "react"
import styled from "styled-components"
import { Markup } from "../markup/Markup"
import { Embed } from "./Embed"
import { EmbedField } from "./EmbedField"

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
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => (props.href ? "#0096cf;" : "#ffffff")};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
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

export const MessageEmbed = (props: Props) => (
  <Container>
    <Pill fill={props.embed.color} />
    <EmbedContent>
      <InnerEmbedContent>
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
      </InnerEmbedContent>
    </EmbedContent>
  </Container>
)
