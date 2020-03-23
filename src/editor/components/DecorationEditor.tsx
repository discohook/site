import { useObserver } from "mobx-react-lite"
import React from "react"
import { ColorInput } from "../../color/components/ColorInput"
import { InputField } from "../../form/components/InputField"
import { InputGroup } from "../../form/components/InputGroup"
import type { Embed } from "../../message/classes/Embed"

export type DecorationEditorProps = {
  embed: Embed
}

export function DecorationEditor(props: DecorationEditorProps) {
  const { embed } = props

  return useObserver(() => (
    <InputGroup>
      <InputField
        id={`e${embed.id}.img`}
        value={embed.image}
        onChange={image => {
          embed.image = image
        }}
        label="Image"
      />
      <InputField
        id={`e${embed.id}.thumb`}
        value={embed.thumbnail}
        onChange={thumbnail => {
          embed.thumbnail = thumbnail
        }}
        label="Thumbnail"
      />
      <ColorInput id={`e${embed.id}.color`} color={embed.color} />
    </InputGroup>
  ))
}
