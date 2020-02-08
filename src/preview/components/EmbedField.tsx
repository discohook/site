import React from "react"
import styled from "styled-components"
import { Markdown } from "../../markdown/components/Markdown"
import { MarkdownContainer } from "../../markdown/components/MarkdownContainer"
import { Field } from "../../message/types/Field"

const Container = styled.div`
  font-size: 0.875rem;
  line-height: 1.125rem;
`

const FieldName = styled.div`
  margin: 0 0 1px;

  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text.muted};
`

const FieldValue = styled.div`
  & > ${MarkdownContainer} {
    font-size: 0.875rem;
    line-height: 1.125rem;
    color: ${({ theme }) => theme.text.normal};
    white-space: pre-line;
  }
`

export type EmbedFieldProps = {
  field: Field
  width: string
}

export function EmbedField(props: EmbedFieldProps) {
  const { field, width } = props

  return (
    <Container style={{ gridColumn: width }}>
      <FieldName>
        <Markdown content={field.name ?? ""} type="embed-header" />
      </FieldName>
      <FieldValue>
        <Markdown content={field.value ?? ""} type="embed-content" />
      </FieldValue>
    </Container>
  )
}
