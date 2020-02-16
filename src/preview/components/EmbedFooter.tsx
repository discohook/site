import { isValid } from "date-fns"
import { useObserver } from "mobx-react-lite"
import React from "react"
import styled, { css } from "styled-components"
import { Embed } from "../../message/classes/Embed"
import { formatTimestamp } from "../../message/helpers/formatTimestamp"

const Container = styled.div<{ hasThumbnail?: boolean }>`
  margin: 8px 0 0;

  display: flex;
  align-items: center;

  grid-row: auto / auto;
  grid-column: 1 / 2;

  ${({ hasThumbnail }) =>
    hasThumbnail &&
    css`
      grid-column: 1 / 3;
    `}
`

const FooterImage = styled.img`
  width: 20px;
  height: 20px;

  margin: 0 8px 0 0;

  object-fit: contain;
  border-radius: 50%;
`

const FooterText = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text.muted};
  line-height: 1rem;

  ${({ theme }) =>
    theme.appearance.color === "light" &&
    css`
      @media (max-resolution: 1dppx) {
        font-weight: 500;
      }
    `}
`

const FooterSeparator = styled.span`
  display: inline-block;
  margin: 0 4px;

  font-weight: 700;
  color: ${({ theme }) => theme.backgroundModifier.accent};
`

export type EmbedFooterProps = {
  embed: Embed
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
        {isValid(embed.timestamp) && formatTimestamp(embed.timestamp)}
      </FooterText>
    </Container>
  ))
}
