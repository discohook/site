import { useObserver } from "mobx-react-lite"
import { rem, size } from "polished"
import React from "react"
import styled, { css } from "styled-components"
import { Embed } from "../../message/classes/Embed"

const Container = styled.div`
  display: flex;
  align-items: center;
  grid-column: 1 / 2;
  margin: 8px 0 0;
`

const AuthorImage = styled.img`
  ${size(24)};

  margin: 0 8px 0 0;

  object-fit: contain;
  border-radius: 50%;
`

const AuthorNameNormal = styled.span`
  font-size: ${rem(14)};
  font-weight: 500;
  color: ${({ theme }) => theme.header.primary};

  white-space: pre-wrap;
  display: inline-block;

  ${({ theme }) =>
    theme.appearance.color === "light" &&
    css`
      @media (max-resolution: 1dppx) {
        font-weight: 500;
      }
    `}
`

const AuthorNameLink = AuthorNameNormal.withComponent("a")

export type EmbedAuthorProps = {
  embed: Embed
}

export function EmbedAuthor(props: EmbedAuthorProps) {
  const { embed } = props

  return useObserver(() => (
    <Container>
      {embed.authorIcon && (
        <AuthorImage src={embed.authorIcon} alt="Author image" />
      )}
      {embed.author &&
        (embed.authorUrl ? (
          <AuthorNameLink
            href={embed.authorUrl}
            rel="noopener noreferrer nofollow ugc"
            target="_blank"
          >
            {embed.author}
          </AuthorNameLink>
        ) : (
          <AuthorNameNormal>{embed.author}</AuthorNameNormal>
        ))}
    </Container>
  ))
}
