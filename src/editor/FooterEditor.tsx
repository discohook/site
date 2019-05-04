import React from "react"
import styled from "styled-components"
import { Embed } from "../message/embed/Embed"
import { Footer } from "../message/embed/Footer"
import { InputField } from "./InputField"

type PartialEmbed = Pick<Embed, "footer" | "timestamp">

interface Props {
  footer: Footer | undefined
  timestamp: string | undefined
  onChange: (partialEmbed: PartialEmbed) => void
}

const Container = styled.div`
  display: flex;

  > * {
    flex-grow: 1;
  }
`

export const FooterEditor = (props: Props) => {
  const handleChange = (embed: PartialEmbed) => {
    const footer =
      embed.footer &&
      Object.values(embed.footer).filter((value) => !!value).length !== 0
        ? embed.footer
        : undefined
    const timestamp = embed.timestamp || undefined

    props.onChange({ footer, timestamp })
  }

  return (
    <Container>
      <InputField
        value={(props.footer || { text: "" }).text || ""}
        onChange={(text) =>
          handleChange({
            footer: { ...props.footer, text } as Footer,
            timestamp: props.timestamp,
          })
        }
        label="Embed footer name"
      />
      <InputField
        value={props.timestamp || ""}
        onChange={(timestamp) =>
          handleChange({ footer: props.footer, timestamp })
        }
        label="Embed footer timestamp"
      />
      <InputField
        value={(props.footer || { iconUrl: "" }).iconUrl || ""}
        onChange={(iconUrl) =>
          handleChange({
            footer: { ...(props.footer as Footer), iconUrl },
            timestamp: props.timestamp,
          })
        }
        label="Embed footer icon"
      />
    </Container>
  )
}
