import styled from "styled-components"

export const Stack = styled.div<{ gap?: number | string }>`
  display: grid;
  gap: ${({ gap = 0 }) => (typeof gap === "number" ? `${gap}px` : gap)};
  align-items: start;
`
