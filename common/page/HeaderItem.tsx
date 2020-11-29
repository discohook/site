import Link from "next/link"
import React, { cloneElement, ReactNode } from "react"
import styled from "styled-components"
import { Clickable } from "../input/Clickable"
import { SCREEN_TINY } from "../layout/breakpoints"

const Container = styled(Clickable)`
  height: 100%;
  padding: 0 8px;
  margin: 0 4px;

  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.header.primary};
  font-size: 15px;
  font-weight: 600;
  text-align: center;

  position: relative;

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  ${SCREEN_TINY} {
    height: 48px;
    width: calc(100% - 24px);
  }
`

export type HeaderItemProps = {
  children?: ReactNode
  to?: string
  newWindow?: boolean
  onClick?: () => void
}

export function HeaderItem(props: HeaderItemProps) {
  const { children, to, newWindow = false, onClick: handleClick } = props

  if (!to) {
    return <Container onClick={handleClick}>{children}</Container>
  }

  const link = (
    <Container as="a" type={undefined} onClick={handleClick}>
      {children}
    </Container>
  )

  if (newWindow) {
    return cloneElement(link, { href: to, target: "_blank", rel: "noopener" })
  }

  return (
    <Link href={to} passHref>
      {link}
    </Link>
  )
}
