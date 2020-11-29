import { createPopper } from "@popperjs/core"
import { animated, useTransition } from "@react-spring/web"
import { rgb, size } from "polished"
import React, { useRef, useState } from "react"
import styled from "styled-components"
import { useAutorun } from "../state/useAutorun"
import { useIsomorphicLayoutEffect } from "../state/useIsomorphicLayoutEffect"
import type { Tooltip } from "./Tooltip"

const TooltipContainer = styled(animated.div)`
  padding: 8px 11px;
  background: ${rgb(0, 0, 0)};
  border-radius: 4px;

  font-size: 15px;
  font-weight: 500;
  color: ${rgb(255, 255, 255)};

  box-shadow: ${({ theme }) => theme.elavation.high};

  transform-origin: bottom;
`

const Arrow = styled.div`
  &,
  &::before {
    ${size(10)}
    position: absolute;
    z-index: -1;
  }

  &::before {
    content: "";
    transform: rotate(45deg);
    background: ${rgb(0, 0, 0)};
  }
`

export type TooltipItemProps = {
  tooltip: Tooltip
}

export function TooltipItem(props: TooltipItemProps) {
  const { tooltip } = props

  const popperRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const { current: popper } = popperRef
    const { current: arrow } = arrowRef
    if (!popper || !arrow) return

    const instance = createPopper(tooltip.anchor, popper, {
      placement: "top",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 4],
          },
        },
        {
          name: "arrow",
          options: {
            element: arrow,
          },
        },
      ],
    })

    return () => {
      instance.destroy()
    }
  })

  const [visible, setVisible] = useState(false)
  const transition = useTransition(visible, {
    key: Number(visible),
    config: { friction: 20, tension: 400, clamp: true },
    from: { opacity: (0 as unknown) as undefined, scale: 0.9 },
    enter: { opacity: (1 as unknown) as undefined, scale: 1 },
    leave: { opacity: (0 as unknown) as undefined, scale: 0.9 },
  })

  const mouseEnter = () => setVisible(true)
  const mouseLeave = () => setVisible(false)

  useAutorun(() => {
    tooltip.anchor.addEventListener("mouseenter", mouseEnter)
    tooltip.anchor.addEventListener("mouseleave", mouseLeave)

    return () => {
      tooltip.anchor.removeEventListener("mouseenter", mouseEnter)
      tooltip.anchor.removeEventListener("mouseleave", mouseLeave)
    }
  })

  return transition(
    (style, item) =>
      item && (
        <div
          ref={popperRef}
          style={{
            pointerEvents: "none",
            position: "absolute",
          }}
        >
          <TooltipContainer style={style}>
            {tooltip.content}
            <Arrow ref={arrowRef} />
          </TooltipContainer>
        </div>
      ),
  )
}
