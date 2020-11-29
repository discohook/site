import React, { cloneElement } from "react"

export const chevron = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M12 10L8 6L4 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const chevronDown = cloneElement(chevron, {
  style: {
    transform: "rotate(180deg)",
  },
})

export const chevronLeft = cloneElement(chevron, {
  style: {
    transform: "rotate(-90deg)",
  },
})

export const chevronRight = cloneElement(chevron, {
  style: {
    transform: "rotate(90deg)",
  },
})
