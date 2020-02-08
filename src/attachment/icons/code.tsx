import React from "react"
import { background, innerShadow } from "./common"

export const code = (
  <>
    {background}
    {innerShadow}
    <text
      opacity="0.8"
      fontFamily="Source Code Pro"
      fontSize="12"
      fontWeight="420"
      letterSpacing="-0.3"
      fill="#697ec4"
    >
      <tspan x="5.2690141" y="26.4705882">
        {"{}"}
      </tspan>
    </text>
  </>
)
