import { useObserver } from "mobx-react-lite"
import { rem } from "polished"
import React from "react"
import styled from "styled-components"
import { Markdown } from "../../markdown/Markdown"
import { MarkdownContainer } from "../../markdown/styles/MarkdownContainer"
import { getFieldGridColumn } from "../helpers/getFieldGridColumn"
import type { FieldLike } from "../state/models/FieldModel"

const Container = styled.div`
  min-width: 0;

  font-size: ${rem(14)};
  line-height: ${rem(18)};
`

const FieldName = styled.div`
  min-width: 0;

  margin: 0 0 1px;

  font-size: ${rem(14)};
  font-weight: 600;
  color: ${({ theme }) => theme.header.primary};
`

const FieldValue = styled.div`
  min-width: 0;

  & > ${MarkdownContainer} {
    font-size: ${rem(14)};
    line-height: ${rem(18)};
    color: ${({ theme }) => theme.text.normal};
    white-space: pre-line;
  }
`

export type EmbedFieldProps = {
  field: FieldLike
}

export function EmbedField(props: EmbedFieldProps) {
  const { field } = props

  return useObserver(() => (
    <Container style={{ gridColumn: getFieldGridColumn(field) }}>
      <FieldName>
        <Markdown content={field.name} type="embed-header" />
      </FieldName>
      <FieldValue>
        <Markdown content={field.value} type="embed-content" />
      </FieldValue>
    </Container>
  ))
}
