import React from "react"
import InputField from "../form/InputField"
import { Embed, Footer } from "../message/Message"
import { InputGroup } from "./styles"

type Props = {
  id: number
  footer: Footer | undefined
  timestamp: string | undefined
  onChange: (embed: Pick<Embed, "footer" | "timestamp">) => void
}

export default function FooterEditor(props: Props) {
  const { id: embedId, footer = {}, timestamp, onChange } = props
  const { text, iconUrl } = footer

  const handleChange = (embed: Pick<Embed, "footer" | "timestamp">) => {
    onChange({
      footer: Object.values(embed.footer ?? {}).some(Boolean)
        ? embed.footer
        : undefined,
      timestamp: embed.timestamp?.length ? embed.timestamp : undefined,
    })
  }

  return (
    <InputGroup>
      <InputField
        id={`message-embed${embedId}-footer-text`}
        value={text}
        onChange={text =>
          handleChange({
            footer: {
              ...footer,
              text,
            },
            timestamp,
          })
        }
        label="Footer Text"
        maxLength={2048}
      />
      <InputField
        id={`message-embed${embedId}-footer-icon`}
        value={iconUrl}
        onChange={iconUrl =>
          handleChange({
            footer: {
              ...footer,
              iconUrl,
            },
            timestamp,
          })
        }
        label="Footer Icon"
      />
      <InputField
        id={`message-embed${embedId}-footer-timestamp`}
        value={timestamp?.replace(/[a-z]/gi, " ").slice(0, -8)}
        onChange={timestamp =>
          handleChange({
            footer,
            timestamp: timestamp
              ? `${timestamp.replace(/[^\d-:]/g, "T")}:00.000Z`
              : undefined,
          })
        }
        label="Timestamp (UTC)"
        placeholder="YYYY-MM-DD hh:mm"
      />
    </InputGroup>
  )
}
