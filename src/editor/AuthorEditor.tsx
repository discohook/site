import React from "react"
import { Author } from "../message/embed/Author"
import { InputField } from "./InputField"
import { Container } from "./styles"

interface Props {
  author: Author | undefined
  onChange: (author: Author | undefined) => void
}

export const AuthorEditor = (props: Props) => {
  const handleChange = (author: Author) =>
    Object.values(author).filter((value) => !!value).length === 0
      ? props.onChange(undefined)
      : props.onChange(author)

  const author = props.author || { name: "" }

  return (
    <Container>
      <InputField
        value={author.name || ""}
        onChange={(name) => handleChange({ ...author, name: name || "" })}
        label="Embed author name"
      />
      <InputField
        value={author.url || ""}
        onChange={(url) => handleChange({ ...author, url })}
        label="Embed author link"
      />
      <InputField
        value={author.iconUrl || ""}
        onChange={(iconUrl) => handleChange({ ...author, iconUrl })}
        label="Embed author icon"
      />
    </Container>
  )
}
