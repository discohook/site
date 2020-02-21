import { useObserver } from "mobx-react-lite"
import React from "react"
import { InputField } from "../../form/components/InputField"
import { InputGroup } from "../../form/components/InputGroup"
import { Embed } from "../../message/classes/Embed"
import { TimestampInput } from "../../timestamp/components/TimestampInput"

export type FooterEditorProps = {
  embed: Embed
}

export function FooterEditor(props: FooterEditorProps) {
  const { embed } = props

  return useObserver(() => (
    <InputGroup>
      <InputField
        id={`e${embed.id}.footer`}
        value={embed.footer}
        onChange={footer => {
          embed.footer = footer
        }}
        label="Footer Text"
        maxLength={2048}
      />
      <InputField
        id={`e${embed.id}.footericon`}
        value={embed.footerIcon}
        onChange={footerIcon => {
          embed.footerIcon = footerIcon
        }}
        label="Footer Icon"
      />
      <TimestampInput
        id={`e${embed.id}.timestamp`}
        timestamp={embed.timestamp}
        onChange={timestamp => {
          embed.timestamp = timestamp
        }}
      />
    </InputGroup>
  ))
}
