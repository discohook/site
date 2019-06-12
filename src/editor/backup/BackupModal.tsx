import styled from "@emotion/styled"
import React from "react"
import { Message } from "../../message/Message"
import { Container } from "../styles"

interface Props {
  message: Message
  files: FileList | undefined
  onLoad: (message: Message) => void
  onClose: () => void
}

const ModalBackground = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background: rgba(0, 0, 0, 0.85);

  display: flex;
  align-items: center;
  justify-content: center;
`

const ModalContainer = styled(Container)`
  background: ${({ theme }) => theme.background};

  padding: 16px;
  border-radius: 3px;
`

export default function BackupModal(props: Props) {
  const { message, files, onLoad: handleLoad, onClose: handleClose } = props

  return (
    <ModalBackground onClick={handleClose}>
      <ModalContainer />
    </ModalBackground>
  )
}
