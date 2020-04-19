import { useObserver } from "mobx-react-lite"
import React from "react"
import { InputField } from "../../form/components/InputField"
import { InputGroup } from "../../form/components/InputGroup"
import type { Embed } from "../../message/classes/Embed"

export type BodyEditorProps = {
  embed: Embed
}

export function BodyEditor(props: BodyEditorProps) {
  const { embed } = props

  return useObserver(() => (
    <>
      <InputGroup>
        <InputField
          id={`e${embed.id}.title`}
          value={embed.title}
          onChange={title => {
            embed.title = title
          }}
          label="Title"
          maxLength={256}
        />
        <InputField
          id={`e${embed.id}.url`}
          value={embed.url}
          onChange={url => {
            embed.url = url
          }}
          label="Title URL"
          validate={url => {
            if (!/^https?:\/\//.test(url)) return "Invalid URL"

            const embedIndex = embed.message.embeds.indexOf(embed)
            if (embedIndex <= 0) return

            const previousEmbed = embed.message.embeds[embedIndex - 1]
            if (previousEmbed.url === url) {
              return "Cannot be the same as previous embed"
            }
          }}
        />
      </InputGroup>
      <InputField
        id={`e${embed.id}.desc`}
        value={embed.description}
        onChange={description => {
          embed.description = description
        }}
        label="Description"
        type="multiline"
        maxLength={2048}
      />
    </>
  ))
}
