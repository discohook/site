import React from "react"
import styled from "styled-components"
import { ColorInput } from "../../color/components/ColorInput"
import { Button } from "../../form/components/Button"
import type { Embed } from "../../message/classes/Embed"
import { useManager } from "../../state/hooks/useManager"
import { spawnImagesEditorModal } from "../actions/spawnImagesEditorModal"
import { FlexContainer } from "./Container"

const Container = styled(FlexContainer)`
  & > *:not(button) {
    flex-grow: 0;
  }
`

export type DecorationEditorProps = {
  embed: Embed
}

export function DecorationEditor(props: DecorationEditorProps) {
  const { embed } = props

  const manager = useManager()

  return (
    <Container flow="row">
      <ColorInput id={`e${embed.id}.color`} color={embed.color} />
      <Button
        onClick={() => {
          spawnImagesEditorModal(manager, embed)
        }}
      >
        Edit images
      </Button>
    </Container>
  )
}
