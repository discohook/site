import styled from "@emotion/styled"
import React from "react"
import { Theme } from "../core/themes"
import { Author } from "../message/Message"

const Container = styled.div`
  display: flex;
  align-items: center;
`

const AuthorImage = styled.img`
  width: 20px;
  height: 20px;

  margin: 0 8px 0 0;

  object-fit: cover;
  border-radius: 50%;
`

const AuthorNameNormal = styled.span<{}, Theme>`
  color: ${({ theme }) => (theme.color === "dark" ? "#ffffff" : "#4f545c")};
  font-size: 14px;
  font-weight: 500;
  white-space: pre-wrap;
  margin: 0 0 1px;
  display: inline-block;
`

const AuthorNameLink = AuthorNameNormal.withComponent("a")

type Props = {
  author: Author
}

export default function EmbedAuthor(props: Props) {
  const { name, url, iconUrl } = props.author

  const AuthorName = url ? AuthorNameLink : AuthorNameNormal

  return (
    <Container>
      {iconUrl && <AuthorImage src={iconUrl} alt="Author image" />}
      {name && <AuthorName href={url}>{name}</AuthorName>}
    </Container>
  )
}
