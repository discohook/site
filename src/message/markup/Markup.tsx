import React from "react"
import styled from "styled-components"
import { parse } from "./parser"

interface Props {
  content: string
  inline?: boolean
}

const MarkupContainer = styled.div`
  a {
    color: #0096cf;
  }
`

export const Markup = (props: Props) => (
  <MarkupContainer>{parse(props.content, props.inline)}</MarkupContainer>
)
