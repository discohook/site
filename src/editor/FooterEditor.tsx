import React from "react"
import { Footer } from "../message/Message"
import InputField from "./InputField"
import { InputGroup } from "./styles"

type PartialEmbed = { footer?: Partial<Footer>; timestamp?: string }

interface Props {
  footer: Footer | undefined
  timestamp: string | undefined
  onChange: (partialEmbed: PartialEmbed) => void
}

export default function FooterEditor(props: Props) {
  const { footer = {} as Partial<Footer>, timestamp } = props
  const { text, iconUrl } = footer

  const handleChange = (embed: PartialEmbed) => {
    props.onChange({
      footer:
        embed.footer && Object.values(embed.footer).some((value) => !!value)
          ? embed.footer
          : undefined,
      timestamp: embed.timestamp || undefined,
    })
  }

  return (
    <InputGroup>
      <InputField
        value={text || ""}
        onChange={(text) =>
          handleChange({ footer: { ...footer, text }, timestamp })
        }
        label="Embed footer name"
      />
      <InputField
        value={iconUrl || ""}
        onChange={(iconUrl) =>
          handleChange({ footer: { ...footer, iconUrl }, timestamp })
        }
        label="Embed footer icon"
      />
      <InputField
        value={timestamp || ""}
        onChange={(timestamp) => handleChange({ footer, timestamp })}
        label="Embed footer timestamp"
      />
    </InputGroup>
  )
}
