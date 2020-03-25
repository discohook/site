import { useObserver } from "mobx-react-lite"
import { rem } from "polished"
import React, { useRef } from "react"
import styled, { css } from "styled-components"
import { Markdown } from "../../markdown/components/Markdown"
import { MarkdownContainer } from "../../markdown/components/MarkdownContainer"
import type { Embed } from "../../message/classes/Embed"
import { useReaction } from "../../state/hooks/useReaction"
import { EmbedAuthor } from "./EmbedAuthor"
import { EmbedField } from "./EmbedField"
import { EmbedFooter } from "./EmbedFooter"
import { EmbedGallery } from "./EmbedGallery"
import { RichEmbedContainer } from "./RichEmbedContainer"

const EmbedGrid = styled.div`
  padding: ${rem(8)} ${rem(16)} ${rem(16)} ${rem(12)};
  display: inline-grid;

  grid-template-columns: auto;
  grid-template-rows: auto;
`

const EmbedTitleNormal = styled.span`
  min-width: 0;

  display: inline-block;
  margin: 8px 0 0;
  grid-column: 1 / 2;

  & > ${MarkdownContainer} {
    font-size: ${rem(16)};
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
  min-width: 0;

  margin: 8px 0 0;
  grid-column: 1 / 2;

  & > ${MarkdownContainer} {
    font-size: ${rem(14)};
    color: ${({ theme }) => theme.text.normal};

    line-height: ${rem(18)};
    white-space: pre-line;
  }
`

const EmbedFields = styled.div`
  min-width: 0;

  margin: 8px 0 0;

  display: grid;
  grid-column: 1 / 2;
  grid-gap: 8px;
`

const EmbedImage = styled.img<{ hasThumbnail?: boolean }>`
  min-width: 0;

  max-width: 400px;
  max-height: 300px;

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

const EmbedThumbnailContainer = styled.div`
  margin: 8px 0 0 16px;

  grid-row: 1 / 8;
  grid-column: 2 / 3;
  justify-self: end;

  cursor: pointer;
`

const EmbedThumbnail = styled.img`
  max-width: 80px;
  max-height: 80px;

  border-radius: 4px;
`

export type RichEmbedProps = {
  embed: Embed
}

export function RichEmbed(props: RichEmbedProps) {
  const { embed } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useReaction(
    () => embed.image,
    () => {
      const { current: container } = containerRef
      if (!container) return

      container.style.maxWidth = ""
    },
  )

  return useObserver(() => {
    if (!embed.shouldRender) return null

    const color = embed.color.raw === 0xffffff ? undefined : embed.color.hex

    return (
      <RichEmbedContainer style={{ borderColor: color }} ref={containerRef}>
        <EmbedGrid>
          {embed.hasAuthor && <EmbedAuthor embed={embed} />}
          {embed.hasTitle &&
            (embed.url ? (
              <EmbedTitleLink
                href={embed.url}
                rel="noopener noreferrer nofollow ugc"
                target="_blank"
              >
                <Markdown content={embed.title} type="embed-header" />
              </EmbedTitleLink>
            ) : (
              <EmbedTitleNormal>
                <Markdown content={embed.title} type="embed-header" />
              </EmbedTitleNormal>
            ))}
          {embed.hasDescription && (
            <EmbedDescription>
              <Markdown content={embed.description} type="embed-content" />
            </EmbedDescription>
          )}
          {embed.fields.length > 0 && (
            <EmbedFields>
              {embed.fields.map(field => (
                <EmbedField key={field.id} field={field} />
              ))}
            </EmbedFields>
          )}
          {embed.gallery ? (
            <EmbedGallery gallery={embed.gallery} />
          ) : embed.image ? (
            <EmbedImage
              src={embed.image}
              alt="Image"
              hasThumbnail={Boolean(embed.thumbnail)}
              ref={imageRef}
              onLoad={() => {
                const { current: container } = containerRef
                const { current: image } = imageRef
                if (!container || !image) return

                const { width } = image.getBoundingClientRect()
                container.style.maxWidth = width >= 300 ? `${width + 32}px` : ""
              }}
            />
          ) : undefined}
          {embed.hasFooter && <EmbedFooter embed={embed} />}
          {embed.thumbnail && (
            <EmbedThumbnailContainer>
              <EmbedThumbnail src={embed.thumbnail} alt="Thumbnail" />
            </EmbedThumbnailContainer>
          )}
        </EmbedGrid>
      </RichEmbedContainer>
    )
  })
}
