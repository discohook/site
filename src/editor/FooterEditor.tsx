import React from "react"
import { SERVER } from "../core/environment"
import { Embed, Footer } from "../message/Message"
import InputField from "./InputField"
import { InputGroup } from "./styles"

const supportsDateTimeInput = (() => {
  if (SERVER) return false

  const input = document.createElement("input")
  input.type = "datetime-local"
  return input.type === "datetime-local"
})()

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
      footer: Object.values(embed.footer || {}).some(Boolean)
        ? embed.footer
        : undefined,
      timestamp: embed.timestamp || undefined,
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
        label="Footer text"
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
        label="Footer icon"
      />
      {supportsDateTimeInput ? (
        <InputField
          id={`message-embed${embedId}-footer-timestamp`}
          value={timestamp && new Date(timestamp).toISOString().slice(0, -1)}
          onChange={timestamp =>
            handleChange({
              footer,
              timestamp: timestamp
                ? new Date(`${timestamp}Z`).toISOString()
                : undefined,
            })
          }
          label="Timestamp (UTC)"
          type="datetime-local"
        />
      ) : (
        <InputField
          id={`message-embed${embedId}-footer-timestamp`}
          value={timestamp && timestamp.replace(/[a-z]/gi, " ").slice(0, -8)}
          onChange={timestamp =>
            handleChange({
              footer,
              timestamp: timestamp
                ? `${timestamp.replace(/[^0-9\-:]/g, "T")}:00.000Z`
                : undefined,
            })
          }
          label="Timestamp (UTC)"
          placeholder="YYYY-MM-DD hh:mm"
        />
      )}
    </InputGroup>
  )
}
