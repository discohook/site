import React from "react"
import { ATTACHMENT_ICONS } from "../constants"
import { AttachmentType } from "../types/AttachmentType"

export const getAttachmentIcon = (type: AttachmentType) => {
  return (
    <svg
      width="28"
      height="40"
      viewBox="0 0 28 40"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <filter
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          filterUnits="objectBoundingBox"
          id="filter"
        >
          <feOffset
            dx={type === "webcode" ? "-1" : "0"}
            dy="2"
            in="SourceAlpha"
            result="shadowOffsetOuter"
          />
          <feGaussianBlur
            stdDeviation="0"
            in="shadowOffsetOuter"
            result="shadowBlurOuter"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"
            in="shadowBlurOuter"
            type="matrix"
            result="shadowMatrixOuter"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixOuter" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g
        stroke="none"
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
        transform="translate(2, 2)"
      >
        {ATTACHMENT_ICONS[type]}
      </g>
    </svg>
  )
}
