import React from "react"
import styled from "styled-components"
import { Markup } from "../markup/Markup"
import { Field } from "./Field"

interface Props {
  field: Field
}

const Container = styled.div<{ inline?: boolean }>`
  flex: ${(props) => (props.inline ? 1 : 0)};
  margin: 4px 0 0;
  min-width: ${(props) => (props.inline ? "150px" : "100%")};
  flex-basis: auto;
`

const FieldTitle = styled.div``

export const EmbedField = (props: Props) => (
  <Container inline={props.field.inline}>
    <FieldTitle>
      <Markup content={props.field.name} inline={true} />
    </FieldTitle>
    <Markup content={props.field.value} />
  </Container>
)
