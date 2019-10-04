import React from "react"
import { Embed, Footer } from "../message/Message"
import InputField from "./InputField"
import { InputGroup } from "./styles"

const supportsDateTimeInput = (() => {
  if (process.env.SSR) return false

  const input = document.createElement("input")
  input.type = "datetime-local"
  return input.type === "datetime-local"
})()

type Props = {
  id: number
  footer: Footer | undefined
  timestamp: string | undefined
  onChange: (embed: Omit<Embed, symbol>) => void
}

export default function FooterEditor(props: Props) {
  const { id: embedId, footer = {}, timestamp, onChange } = props
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
          value={
            timestamp && new Date(timestamp).toISOString().replace("Z", "")
          }
          onChange={timestamp =>
            handleChange({
              footer,
              timestamp: timestamp
                ? new Date(`${timestamp}Z`).toISOString()
                : undefined,
            })
          }
          label="Timestamp (GMT)"
          type="datetime-local"
        />
      ) : (
        <InputField
          id={`message-embed${embedId}-footer-timestamp`}
          value={timestamp}
          onChange={timestamp =>
            handleChange({
              footer,
              timestamp,
            })
          }
          label="Timestamp (ISO 8601)"
        />
      )}
    </InputGroup>
  )
}
