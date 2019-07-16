import styled from "@emotion/styled"
import React from "react"
import Markup from "./markup/Markup"
import { Field } from "./Message"

type Props = {
  field: Field
}

const Container = styled.div<{ inline?: boolean }>`
  flex: ${({ inline }) => (inline ? 1 : 0)};
  margin: 4px 0 0;
  min-width: ${({ inline }) => (inline ? "150px" : "100%")};
`

const FieldName = styled.div`
  margin: 0 0 4px;

  color: ${({ theme }) => theme.message.embed.field.name};
  font-size: 14px;
  font-weight: 500;
`

const FieldValue = styled.div`
  color: ${({ theme }) => theme.message.embed.field.value};
  font-size: 14px;
`

export default function EmbedField(props: Props) {
  const { name = "", value = "", inline } = props.field

  return (
    <Container inline={inline}>
      <FieldName>
        <Markup content={name} inline />
      </FieldName>
      <FieldValue>
        <Markup content={value} />
      </FieldValue>
    </Container>
  )
}
