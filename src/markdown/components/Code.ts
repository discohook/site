import styled from "styled-components"
import { RichEmbedContainer } from "../../preview/components/RichEmbedContainer"

export const Code = styled.code`
  padding: 0.2em;
  margin: -0.2em 0;

  border-radius: 3px;
  background: ${({ theme }) => theme.background.secondary};

  font-size: 0.85em;
  line-height: 1.125rem;

  white-space: pre-wrap;

  ${RichEmbedContainer} & {
    background: ${({ theme }) => theme.background.tertiary};
  }
`
