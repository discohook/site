import React from "react"
import { InputField } from "../../form/components/InputField"
import { InputGroup } from "../../form/components/InputGroup"
import { Embed } from "../../message/types/Embed"
import { Footer } from "../../message/types/Footer"
import { TimestampInput } from "../../timestamp/components/TimestampInput"

export type FooterEditorProps = {
  id: number
  footer: Footer | undefined
  timestamp: string | undefined
  onChange: (embed: Pick<Embed, "footer" | "timestamp">) => void
}

export function FooterEditor(props: FooterEditorProps) {
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
      <TimestampInput
        id={`message-embed${embedId}-footer-timestamp`}
        timestamp={timestamp}
        onChange={timestamp => handleChange({ footer, timestamp })}
      />
    </InputGroup>
  )
}
