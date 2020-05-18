import React, { useEffect } from "react"
import styled from "styled-components"
import { PageHead } from "../common/PageHead"

const Container = styled.div`
  margin: 64px 16px;
  text-align: center;
`

const Header = styled.h1`
  color: ${({ theme }) => theme.header.primary};
`

const DISCORD_INVITE = "https://discord.gg/dtPGCsm"

export default function Discord() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.href = DISCORD_INVITE
    }
  })

  return (
    <Container>
      <PageHead title="Discord Support Server" description="" />
      <Header>You are being redirected</Header>
      <p>
        If nothing is happenning, please navigate to{" "}
        <a href={DISCORD_INVITE}>{DISCORD_INVITE}</a>.
      </p>
    </Container>
  )
}
