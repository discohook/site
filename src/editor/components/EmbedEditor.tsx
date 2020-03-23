import { useObserver } from "mobx-react-lite"
import React from "react"
import type { Embed } from "../../message/classes/Embed"
import { Field } from "../../message/classes/Field"
import { AuthorEditor } from "./AuthorEditor"
import { BodyEditor } from "./BodyEditor"
import { FlexContainer } from "./Container"
import { DecorationEditor } from "./DecorationEditor"
import { FieldEditor } from "./FieldEditor"
import { FooterEditor } from "./FooterEditor"
import { MultiEditor } from "./MultiEditor"

export type EmbedEditorProps = {
  embed: Embed
}

export function EmbedEditor(props: EmbedEditorProps) {
  const { embed } = props

  return useObserver(() => (
    <FlexContainer>
      <BodyEditor embed={embed} />
      <AuthorEditor embed={embed} />
      <FooterEditor embed={embed} />
      <DecorationEditor embed={embed} />
      <MultiEditor<Field>
        items={embed.fields}
        name="Field"
        limit={25}
        factory={() => new Field(embed)}
        keyMapper={field => field.id}
      >
        {field => <FieldEditor field={field} />}
      </MultiEditor>
    </FlexContainer>
  ))
}
