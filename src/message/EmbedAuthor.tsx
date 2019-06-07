import styled from "@emotion/styled"
import React from "react"
import { Author } from "./Message"

interface Props {
  author: Author
}

const Container = styled.div`
  display: flex;
  align-items: center;
`

const AuthorImage = styled.img`
  width: 20px;
  height: 20px;

  margin: 0 8px 0 0;

  object-fit: contain;
  border-radius: 50%;
`

const AuthorName = styled.a`
  color: ${(props) => props.theme.embed.author.name};
  font-size: 14px;
  font-weight: 500;

  text-decoration: none;

  :hover {
    text-decoration: ${(props) => (props.href ? "underline" : "none")};
  }
`

export default function EmbedAuthor(props: Props) {
  const { name, url, iconUrl } = props.author

  return (
    <Container>
      {iconUrl && <AuthorImage src={iconUrl} />}
      {name && <AuthorName href={url}>{name}</AuthorName>}
    </Container>
  )
}
