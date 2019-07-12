import React from "react"
import { Embed, Footer } from "../message/Message"
import InputField from "./InputField"
import { InputGroup } from "./styles"

interface Props {
  footer: Footer | undefined
  timestamp: string | undefined
  onChange: (embed: Omit<Embed, symbol>) => void
}

export default function FooterEditor(props: Props) {
  const { footer = {}, timestamp, onChange } = props
  const { text, iconUrl } = footer

  const handleChange = (embed: Omit<Embed, symbol>) => {
    onChange({
      footer:
        embed.footer && Object.values(embed.footer).some(value => !!value)
          ? embed.footer
          : undefined,
      timestamp: embed.timestamp || undefined,
    })
  }

  return (
    <InputGroup>
      <InputField
        value={text}
        onChange={text =>
          handleChange({ footer: { ...footer, text }, timestamp })
        }
        label="Embed footer name"
        maxLength={2048}
      />
      <InputField
        value={iconUrl}
        onChange={iconUrl =>
          handleChange({ footer: { ...footer, iconUrl }, timestamp })
        }
        label="Embed footer icon"
      />
      <InputField
        value={timestamp}
        onChange={timestamp => handleChange({ footer, timestamp })}
        label="Embed footer timestamp"
      />
    </InputGroup>
  )
}
