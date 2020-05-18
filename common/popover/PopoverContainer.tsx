import styled from "styled-components"
import { Z_INDEX_POPOVERS } from "../constants"

export const PopoverContainer = styled.div`
  z-index: ${Z_INDEX_POPOVERS};

  max-width: calc(100vw - 48px);

  padding: 12px;

  background: ${({ theme }) => theme.background.floating};
  border-radius: 4px;
`
