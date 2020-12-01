import { animated, useSpring } from "@react-spring/web"
import { Observer } from "mobx-react-lite"
import { ellipsis } from "polished"
import React, { ReactNode, useEffect, useRef, useState } from "react"
import styled, { css, useTheme } from "styled-components"
import { chevron } from "../../icons/chevron"
import { error } from "../../icons/error"
import { useMeasure } from "../dom/useMeasure"
import type { ColorLike } from "../input/color/ColorModel"
import { usePreference } from "../settings/usePreference"
import { usePrevious } from "../state/usePrevious"
import { Action, ActionButtons } from "./ActionButtons"
import { SCREEN_TINY } from "./breakpoints"
import { Icon } from "./Icon"
import { IconButton } from "./IconButton"

type SectionVariant = "normal" | "indented" | "large"

const Container = styled(animated.section)<{ variant: SectionVariant }>`
  display: flex;

  ${({ variant }) =>
    (variant === "normal" || variant === "indented") &&
    css`
      margin: -8px;
      padding: 0 8px;
    `};

  ${({ variant }) =>
    variant === "large" &&
    css`
      border-radius: 4px;

      box-shadow: ${({ theme }) => theme.elavation.medium};
    `};
`

const ColorPreview = styled.div`
  width: 4px;
`

const SectionContent = styled.div<{ variant: SectionVariant }>`
  flex: 1;

  ${({ variant }) =>
    variant === "large" &&
    css`
      border: 1px solid ${({ theme }) => theme.background.secondaryAlt};
      border-left: none;

      padding: 15px;

      border-radius: 0 4px 4px 0;
    `};
`

const Header = styled.div<{ variant: SectionVariant }>`
  display: grid;
  grid-template-columns: 1fr max-content;

  height: 32px;

  ${({ variant }) =>
    variant === "large" &&
    css`
      margin: -8px 0;
    `}
`

const HeaderContent = styled.div`
  min-width: 0;
  height: 100%;

  display: flex;
  align-items: center;
`

const CollapseIcon = styled(IconButton)<{ open: boolean }>`
  margin-left: -8px;

  transform: rotate(90deg);
  transition: transform 150ms;

  ${({ open }) =>
    open &&
    css`
      transform: rotate(180deg);
    `};
`

const Title = styled.h2<{ variant: SectionVariant }>`
  ${ellipsis()};

  margin: -8px 0;
  padding: 8px 0;

  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.header.secondary};

  user-select: none;

  ${({ variant }) =>
    variant === "large" &&
    css`
      font-size: 18px;
      line-height: 16px;

      color: ${({ theme }) => theme.header.primary};
    `};
`

const ValidationError = styled(animated.div)`
  color: ${({ theme }) => theme.accent.danger};
  margin-right: 8px;
`

const Content = styled.div<{ variant: SectionVariant }>`
  &:not(:empty) {
    padding-top: ${({ variant }) => (variant === "large" ? 16 : 8)}px;
    padding-bottom: ${({ variant }) => (variant === "large" ? 0 : 8)}px;

    ${({ variant }) =>
      variant === "indented" &&
      css`
        padding-left: 24px;

        ${SCREEN_TINY} {
          padding-left: 12px;
        }
      `}
  }
`

export type SectionProps = {
  children?: ReactNode
  name: string
  variant?: SectionVariant
  actions?: Action[]
  color?: ColorLike
  hasError?: boolean
}

export function Section(props: SectionProps) {
  const { children, name, variant = "normal", actions, color, hasError } = props

  const expandSections = usePreference("expandSections")

  const containerRef = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(expandSections)
  const previousOpen = usePrevious(open)

  const [visible, setVisible] = useState(open)

  const frameRef = useRef<number>()
  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  const toggleOpen = (force?: boolean) => {
    frameRef.current = requestAnimationFrame(() => {
      setVisible(true)
      frameRef.current = requestAnimationFrame(() => {
        setOpen(force ?? (open => !open))
      })
    })
  }

  const previousExpandSections = usePrevious(expandSections)
  useEffect(() => {
    if (previousExpandSections !== expandSections && open !== expandSections) {
      toggleOpen(expandSections)
    }
  }, [expandSections, open, previousExpandSections])

  const [ref, { height: contentHeight }] = useMeasure()
  const style = useSpring({
    config: { tension: 250, clamp: true },
    height: (variant === "large" ? 48 : 32) + (open ? contentHeight + 16 : 0),
    onRest: () => setVisible(open),
  })

  const errorStyle = useSpring({
    config: { tension: 300, clamp: true },
    opacity: (Number(hasError) as unknown) as undefined,
  })

  const theme = useTheme()

  return (
    <Container
      variant={variant}
      ref={containerRef}
      style={{
        overflow: "hidden",
        height: open && previousOpen ? "auto" : style.height,
      }}
    >
      {color && (
        <Observer>
          {() => (
            <ColorPreview
              style={{
                backgroundColor: color.hex ?? theme.background.secondaryAlt,
              }}
            />
          )}
        </Observer>
      )}
      <SectionContent variant={variant}>
        <Header variant={variant}>
          <HeaderContent onClick={() => toggleOpen()}>
            <CollapseIcon
              open={open}
              icon={chevron}
              label={`${open ? "Collapse" : "Expand"} ${name}`}
              tooltip={false}
            />
            <Title variant={variant}>{name}</Title>
            <ValidationError style={errorStyle}>
              <Icon>{error}</Icon>
            </ValidationError>
          </HeaderContent>
          {actions && <ActionButtons actions={actions} />}
        </Header>
        <Content variant={variant} ref={ref}>
          {visible && children}
        </Content>
      </SectionContent>
    </Container>
  )
}
