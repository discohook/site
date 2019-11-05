import { css } from "@emotion/core"
import styled from "@emotion/styled"
import React from "react"
import { Theme } from "../core/themes"
import Markup from "../markup/Markup"
import { MarkupContainer } from "../markup/styles"
import { Field } from "../message/Message"

const Container = styled.div<{ inline: boolean }>`
  margin: 4px 0 0;
  min-width: 100%;

  ${({ inline }) =>
    inline &&
    css`
      flex: 1;
      min-width: 150px;
    `}
`

const FieldName = styled.div<{}, Theme>`
  margin: 0 0 4px;

  color: ${({ theme }) => (theme.color === "dark" ? "#ffffff" : "#36393f")};
  font-size: 14px;
  font-weight: 500;
`

const FieldValue = styled.div<{}, Theme>`
  color: ${({ theme }) =>
    theme.color === "dark" ? "rgba(255, 255, 255, 0.6)" : "#36393f"};
  font-size: 0.875rem;

  & > ${MarkupContainer} {
    white-space: pre-line;
  }
`

type Props = {
  field: Field
}

export default function EmbedField(props: Props) {
  const { name = "", value = "", inline = false } = props.field

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
