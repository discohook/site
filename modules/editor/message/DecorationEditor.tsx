import React from "react"
import styled from "styled-components"
import { Button } from "../../../common/input/Button"
import { ColorInput } from "../../../common/input/color/ColorInput"
import { ModalManagerContext } from "../../../common/modal/ModalManagerContext"
import { useRequiredContext } from "../../../common/state/useRequiredContext"
import type { Embed } from "../../message/Embed"
import { FlexContainer } from "../styles/FlexContainer"
import { ImagesEditorModal } from "./ImagesEditorModal"

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

  const modalManager = useRequiredContext(ModalManagerContext)

  return (
    <Container flow="row">
      <ColorInput id={`embed-${embed.id}-color`} color={embed.color} />
      <Button
        onClick={() =>
          modalManager.spawn({
            render: () => <ImagesEditorModal embed={embed} />,
          })
        }
      >
        Edit images
      </Button>
    </Container>
  )
}
