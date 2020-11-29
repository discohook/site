import { animated, useSpring } from "@react-spring/web"
import { size } from "polished"
import React, { useState } from "react"
import styled, { useTheme } from "styled-components"
import { darkLogo, lightLogo } from "../../icons/logo"
import { menu } from "../../icons/menu"
import { Clickable } from "../input/Clickable"
import { SCREEN_NOT_TINY, SCREEN_TINY } from "../layout/breakpoints"
import { Z_INDEX_HEADER } from "../layout/constants"
import { IconButton } from "../layout/IconButton"
import { HeaderItem } from "./HeaderItem"
import { HeaderTabs, HeaderTabsProps } from "./HeaderTabs"

const Container = styled.header`
  height: 48px;
  padding: 0 4px;

  position: sticky;
  top: 0;
  left: 0;
  z-index: ${Z_INDEX_HEADER};

  border: solid transparent;
  border-width: 1px 0;

  display: flex;
  align-items: center;

  box-shadow: ${({ theme }) => theme.elavation.medium};

  &::before {
    content: "";
    display: block;

    position: absolute;
    top: -1px;
    left: 0;
    z-index: ${Z_INDEX_HEADER + 2};
    width: 100%;
    height: 48px;

    background: ${({ theme }) => theme.background.primary};
    border-bottom: 1px solid ${({ theme }) => theme.background.tertiary};
  }

  & > * {
    z-index: ${Z_INDEX_HEADER + 2};
  }
`

const Logo = styled(Clickable)`
  height: 100%;
  padding: 0 12px;

  & > svg {
    ${size(24)};

    display: block;
  }
`

const Navigation = styled(animated.nav)`
  height: 100%;

  display: flex;
  align-items: center;

  ${SCREEN_TINY} {
    width: 100%;
    height: auto;

    position: absolute;
    left: 0;
    top: 47px;

    flex-direction: column;
    align-items: start;

    background: ${({ theme }) => theme.background.primary};
    box-shadow: ${({ theme }) => theme.elavation.medium};

    z-index: ${Z_INDEX_HEADER + 1};
  }

  ${SCREEN_NOT_TINY} {
    z-index: ${Z_INDEX_HEADER + 2};

    transform: none !important;
  }
`

const Dim = styled(animated.div)`
  position: fixed;
  width: 100%;
  height: calc(100% - 48px);
  top: 48px;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgb(0, 0, 0, 0.35);
  z-index: ${Z_INDEX_HEADER};
`

const OverflowButton = styled.div`
  margin: 0 8px;
  display: none;

  ${SCREEN_TINY} {
    display: block;
  }
`

export type HeaderItemOptions = {
  name: string
} & (
  | {
      to: string
      newWindow?: boolean
    }
  | {
      to?: undefined
      handler: () => void
    }
)

export type HeaderProps<T extends string> = {
  items: HeaderItemOptions[]
  tabs?: HeaderTabsProps<T>
}

export function Header<T extends string>(props: HeaderProps<T>) {
  const { items, tabs } = props

  const theme = useTheme()

  const [expanded, setExpanded] = useState(false)

  const navigationStyle = useSpring({
    y: expanded ? "calc(0% - 0px)" : "calc(-100% - 48px)",
  })

  const dimStyle = useSpring({
    opacity: (Number(expanded) as unknown) as undefined,
    pointerEvents: expanded ? ("auto" as const) : ("none" as const),
  })

  return (
    <Container>
      <Logo>{theme.appearance.color === "dark" ? darkLogo : lightLogo}</Logo>
      {tabs && <HeaderTabs {...tabs} />}
      <Dim style={dimStyle} onClick={() => setExpanded(false)} />
      <Navigation style={navigationStyle} onClick={() => setExpanded(false)}>
        {items.map(item =>
          item.to !== undefined ? (
            <HeaderItem key={item.name} to={item.to} newWindow={item.newWindow}>
              {item.name}
            </HeaderItem>
          ) : (
            <HeaderItem key={item.name} onClick={() => item.handler()}>
              {item.name}
            </HeaderItem>
          ),
        )}
      </Navigation>
      <div style={{ flex: 1 }} />
      <OverflowButton>
        <IconButton
          icon={menu}
          label="Overflow menu"
          tooltip={false}
          onClick={() => setExpanded(expanded => !expanded)}
        />
      </OverflowButton>
    </Container>
  )
}
