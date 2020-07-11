import { createPopper } from "@popperjs/core"
import { em, rgb, size } from "polished"
import React, { ReactNode, RefObject, useEffect, useRef } from "react"
import styled from "styled-components"
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect"

const TooltipContainer = styled.div`
  padding: ${em(8)} ${em(11)};
  background: ${rgb(0, 0, 0)};
  border-radius: 4px;

  font-size: ${em(16)};
  font-weight: 500;
  color: ${rgb(255, 255, 255)};

  box-shadow: ${({ theme }) => theme.elavation.high};

  transition: 150ms;
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
    margin-left: -1px;
    content: "";
    transform: rotate(45deg);
    background: ${rgb(0, 0, 0)};
  }
`

export type TooltipProps<T extends Element> = {
  tooltip: ReactNode
  children: (ref: RefObject<T>) => ReactNode
}

export function Tooltip<T extends Element>(props: TooltipProps<T>) {
  const { tooltip, children } = props

  const elementRef = useRef<T>(null)
  const popperRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const { current: element } = elementRef
    const { current: popper } = popperRef
    const { current: arrow } = arrowRef
    if (!element || !popper || !arrow) return

    const instance = createPopper(element, popper, {
      placement: "top",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 12],
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
  }, [])

  useEffect(() => {
    const { current: element } = elementRef
    const { current: popper } = popperRef
    const { current: tooltip } = tooltipRef
    if (!element || !popper || !tooltip) return

    let frame = 0

    element.addEventListener("mouseenter", () => {
      frame = requestAnimationFrame(() => {
        popper.style.visibility = "visible"
        tooltip.style.opacity = "0"
        tooltip.style.transform = "scale(0.95)"

        // eslint-disable-next-line max-nested-callbacks
        frame = requestAnimationFrame(() => {
          tooltip.style.opacity = ""
          tooltip.style.transform = ""
        })
      })
    })

    element.addEventListener("mouseleave", () => {
      popper.style.visibility = "hidden"
      tooltip.style.opacity = "0"
      tooltip.style.transform = "scale(0.95)"
    })

    return () => {
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      {children(elementRef)}
      <div
        ref={popperRef}
        style={{ visibility: "hidden", pointerEvents: "none" }}
      >
        <TooltipContainer ref={tooltipRef}>
          {tooltip}
          <Arrow ref={arrowRef} />
        </TooltipContainer>
      </div>
    </>
  )
}
