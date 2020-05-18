import { useObserver } from "mobx-react-lite"
import React from "react"
import { InputField } from "../../../common/input/InputField"
import { InputGroup } from "../../../common/input/styles/InputGroup"
import { TimestampInput } from "../../../common/input/timestamp/TimestampInput"
import type { Embed } from "../../message/Embed"

export type FooterEditorProps = {
  embed: Embed
}

export function FooterEditor(props: FooterEditorProps) {
  const { embed } = props

  return useObserver(() => (
    <InputGroup>
      <InputField
        id={`embed-${embed.id}-footer`}
        value={embed.footer}
        onChange={footer => {
          embed.footer = footer
        }}
        label="Footer Text"
        maxLength={2048}
      />
      <InputField
        id={`embed-${embed.id}-footericon`}
        value={embed.footerIcon}
        onChange={footerIcon => {
          embed.footerIcon = footerIcon
        }}
        label="Footer Icon"
        validate={url => (/^https?:\/\//.test(url) ? undefined : "Invalid URL")}
      />
      <TimestampInput
        id={`embed-${embed.id}-timestamp`}
        timestamp={embed.timestamp}
        onChange={timestamp => {
          embed.timestamp = timestamp
        }}
      />
    </InputGroup>
  ))
}
