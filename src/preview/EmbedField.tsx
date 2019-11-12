import styled from "@emotion/styled"
import React from "react"
import { Theme } from "../core/themes"
import Markup from "../markup/Markup"
import { MarkupContainer } from "../markup/styles"
import { Field } from "../message/Message"

const Container = styled.div`
  font-size: 0.875rem;
  line-height: 1.125rem;
`

const FieldName = styled.div<{}, Theme>`
  margin: 0 0 1px;

  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text.muted};
`

const FieldValue = styled.div<{}, Theme>`
  & > ${MarkupContainer} {
    font-size: 0.875rem;
    line-height: 1.125rem;
    color: ${({ theme }) => theme.text.normal};
    white-space: pre-line;
  }
`

type Props = {
  field: Field
  width: string
}

export default function EmbedField(props: Props) {
  const { field, width } = props

  return (
    <Container style={{ gridColumn: width }}>
      <FieldName>
        <Markup content={field.name ?? ""} inline />
      </FieldName>
      <FieldValue>
        <Markup content={field.value ?? ""} />
      </FieldValue>
    </Container>
  )
}
