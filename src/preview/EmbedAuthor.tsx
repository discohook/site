import { css } from "@emotion/core"
import styled from "@emotion/styled"
import React from "react"
import { Theme } from "../core/themes"
import { Author } from "../message/Message"

const Container = styled.div`
  display: flex;
  align-items: center;
  grid-column: 1 / 2;
  margin: 8px 0 0;
`

const AuthorImage = styled.img`
  width: 24px;
  height: 24px;

  margin: 0 8px 0 0;

  object-fit: contain;
  border-radius: 50%;
`

const AuthorNameNormal = styled.span<{}, Theme>`
  font-size: 0.875rem;
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

type Props = {
  author: Author
}

export default function EmbedAuthor(props: Props) {
  const { name, url, iconUrl } = props.author

  const hasIcon = /^https?:\/\/.+/i.test(iconUrl ?? "")

  return (
    <Container>
      {hasIcon && <AuthorImage src={iconUrl} alt="Author image" />}
      {name &&
        (url ? (
          <AuthorNameLink
            href={url}
            rel="noopener noreferrer nofollow ugc"
            target="_blank"
          >
            {name}
          </AuthorNameLink>
        ) : (
          <AuthorNameNormal>{name}</AuthorNameNormal>
        ))}
    </Container>
  )
}
