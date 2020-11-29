import { isValid } from "date-fns"
import { useObserver } from "mobx-react-lite"
import dynamic from "next/dynamic"
import { rem, size } from "polished"
import React from "react"
import styled, { css } from "styled-components"
import type { EmbedLike } from "../state/models/EmbedModel"
import type { EmbedTimestampProps } from "./EmbedTimestamp"

const EmbedTimestamp = dynamic<EmbedTimestampProps>(
  async () => import("./EmbedTimestamp").then(module => module.EmbedTimestamp),
  { ssr: false },
)

const Container = styled.div<{ hasThumbnail?: boolean }>`
  min-width: 0;

  margin: 8px 0 0;

  display: flex;
  align-items: center;

  grid-row: auto / auto;
  grid-column: 1 / 2;

  ${({ hasThumbnail }) =>
    hasThumbnail &&
    css`
      grid-column: 1 / 3;
    `};
`

const FooterImage = styled.img`
  ${size(20)};

  margin: 0 8px 0 0;

  object-fit: contain;
  border-radius: 50%;
`

const FooterText = styled.span`
  font-size: ${rem(12)};
  font-weight: 500;
  color: ${({ theme }) => theme.text.normal};
  line-height: ${rem(16)};

  white-space: pre-wrap;
  white-space: break-spaces;

  ${({ theme }) =>
    theme.appearance.color === "light" &&
    css`
      @media (max-resolution: 1dppx) {
        font-weight: 500;
      }
    `};
`

const FooterSeparator = styled.span`
  display: inline-block;
  margin: 0 4px;
`

export type EmbedFooterProps = {
  embed: EmbedLike
}

export function EmbedFooter(props: EmbedFooterProps) {
  const { embed } = props

  return useObserver(() => (
    <Container hasThumbnail={Boolean(embed.thumbnail)}>
      {embed.footerIcon && (
        <FooterImage src={embed.footerIcon} alt="Footer image" />
      )}
      <FooterText>
        {embed.footer}
        {embed.footer && isValid(embed.timestamp) && (
          <FooterSeparator>•</FooterSeparator>
        )}
        {isValid(embed.timestamp) && (
          <EmbedTimestamp timestamp={embed.timestamp} />
        )}
      </FooterText>
    </Container>
  ))
}
