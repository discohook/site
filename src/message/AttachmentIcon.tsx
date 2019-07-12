import React from "react"
import { AttachmentIconType } from "./attachmentTypes"

interface Props {
  type: Exclude<AttachmentIconType, "image">
}

export default function AttachmentIcon(props: Props) {
  const { type } = props

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
            dx={type !== "webcode" ? "0" : "-1"}
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
        {icons[type]}
      </g>
    </svg>
  )
}

const background = (
  <>
    <path
      d="M0,3.00741988 C0,1.34646775 1.34252415,0 2.99998588,0 L15.1166483,0 C17.0807354,0 24,6.91885725 24,8.87457593 L24,33.0035574 C24,34.6584469 22.6582294,36 21.0089096,36 L2.99109042,36 C1.33915679,36 0,34.6544607 0,32.9925801 L0,3.00741988 Z"
      stroke="#7289da"
      fill="#f4f6fc"
    />
    <path
      d="M17,1.09677336 C17,0.542040316 17.3147964,0.407097791 17.7133118,0.80556379 L23.1952031,6.28677654 C23.5891543,6.68067898 23.4552279,7 22.9039575,7 L18.0045574,7 C17.4497557,7 17,6.54676916 17,5.99556698 L17,1.09677336 Z"
      stroke="#7289da"
      fill="#f4f6fc"
      filter="url(#filter)"
    />
  </>
)

const innerShadow = (
  <path
    d="M13,3 L4.49710104,3 C3.67027497,3 3,3.66579723 3,4.5 L3,6"
    stroke="#c9d2f0"
    strokeLinecap="round"
    strokeLinejoin="round"
    opacity="0.6"
  />
)

const icons: Record<Exclude<AttachmentIconType, "image">, JSX.Element> = {
  acrobat: (
    <>
      {background}
      <path
        d="M2,9 L12,9 L12,10 L2,10 L2,9 Z M2,7 L12,7 L12,8 L2,8 L2,7 Z M20.7079147,31.9989413 L3.88315634,31.9981473 L2.01200764,31.9989413 C2.01200764,29.4318798 1.61129203,23.5294118 5.4395906,23.5294118 C9.26788918,23.5294118 7.66315715,25.8455634 11.6715596,28.0288493 C11.7223502,28.0563753 11.7746987,28.0831073 11.8258009,28.1106332 L11.9900133,28.0272613 L12.2558067,28.1633031 C15.9931186,26.3227685 14.489656,23.5294118 18.5267256,23.5294118 C22.6597674,23.5294118 21.9543085,31.9989413 21.9543085,31.9989413 L20.7079147,31.9989413 Z M5.26600631,24.588103 C2.55476067,24.588103 3.03242746,30.9402501 3.03242746,30.9402501 L5.60646754,30.9402501 L6.01808421,30.9383974 C7.25740139,30.3809965 8.86908807,29.6597631 10.5768186,28.9054456 L10.3920698,28.8120161 L10.5324661,28.7424072 C7.35918877,27.1234037 7.93289945,24.588103 5.26600631,24.588103 Z M18.7718377,24.588103 C16.2677035,24.588103 16.1425126,27.3639913 13.5542855,28.7408192 L13.7227874,28.8260438 L13.553021,28.9096804 C15.1940967,29.7026401 16.8563537,30.4050817 18.1958331,30.9402501 L15.2943126,30.9402501 C15.2943126,30.9402501 14.5150309,30.5842652 12.3115445,29.5213392 L12.1332423,29.6092106 L11.9622113,29.5218686 C10.0878253,30.4281083 8.98292074,30.9349567 8.97343658,30.9394561 L18.2015236,30.9426322 C18.1996268,30.9418382 18.1977299,30.9410441 18.1958331,30.9402501 L20.9848082,30.9402501 C20.9848082,30.9402501 21.3262379,24.588103 18.7718377,24.588103 Z M2,13 L22,13 L22,14 L2,14 L2,13 Z M2,11 L12,11 L12,12 L2,12 L2,11 Z M2,15 L22,15 L22,16 L2,16 L2,15 Z M2,17 L22,17 L22,18 L2,18 L2,17 Z M2,19 L22,19 L22,20 L2,20 L2,19 Z"
        opacity="0.6"
        fill="#697ec4"
      />
    </>
  ),
  ae: (
    <>
      {background}
      {innerShadow}
      <text
        opacity="0.8"
        fontFamily="Source Code Pro"
        fontSize="12"
        fontWeight="400"
        letterSpacing="-0.3"
        fill="#697ec4"
      >
        <tspan x="5.2690141" y="26.4705882">
          Ae
        </tspan>
      </text>
    </>
  ),
  ai: (
    <>
      {background}
      {innerShadow}
      <text
        opacity="0.8"
        fontFamily="Source Code Pro"
        fontSize="12"
        fontWeight="400"
        letterSpacing="-0.3"
        fill="#697ec4"
      >
        <tspan x="5.2690141" y="26.4705882">
          Ai
        </tspan>
      </text>
    </>
  ),
  archive: (
    <>
      {background}
      <path
        d="M0,0 L4,0 L4,22 L0,22 L0,0 Z M2,21 L1,21 L1,20 L2,20 L2,21 Z M3,20 L2,20 L2,19 L3,19 L3,20 Z M2,19 L1,19 L1,18 L2,18 L2,19 Z M3,18 L2,18 L2,17 L3,17 L3,18 Z M2,17 L1,17 L1,16 L2,16 L2,17 Z M3,16 L2,16 L2,15 L3,15 L3,16 Z M2,15 L1,15 L1,14 L2,14 L2,15 Z M3,14 L2,14 L2,13 L3,13 L3,14 Z M2,13 L1,13 L1,12 L2,12 L2,13 Z M3,12 L2,12 L2,11 L3,11 L3,12 Z M2,11 L1,11 L1,10 L2,10 L2,11 Z M3,10 L2,10 L2,9 L3,9 L3,10 Z M2,9 L1,9 L1,8 L2,8 L2,9 Z M3,8 L2,8 L2,7 L3,7 L3,8 Z M2,7 L1,7 L1,6 L2,6 L2,7 Z M3,6 L2,6 L2,5 L3,5 L3,6 Z M2,5 L1,5 L1,4 L2,4 L2,5 Z M3,4 L2,4 L2,3 L3,3 L3,4 Z M2,3 L1,3 L1,2 L2,2 L2,3 Z M3,2 L2,2 L2,1 L3,1 L3,2 Z"
        transform="translate(10, 14)"
        fill="#8596cf"
      />
    </>
  ),
  audio: (
    <>
      <path
        fill="#f4f6fc"
        fillRule="nonzero"
        stroke="#7289da"
        d="M1,4 C1,2.3 2.3,1 4,1 L16.1,1 C18.1,1 25,7.9 25,9.9 L25,34 C25,35.7 23.7,37 22,37 L4,37 C2.3,37 1,35.7 1,34 L1,4 Z"
      />
      <path
        fill="#f4f6fc"
        fillRule="nonzero"
        stroke="#7289da"
        d="M18,2.1 C18,1.5 18.3,1.4 18.7,1.8 L24.2,7.3 C24.6,7.7 24.5,8 23.9,8 L19,8 C18.4,8 18,7.5 18,7 L18,2.1 Z"
      />
      <path
        stroke="#c9d2f0"
        d="M14,4 L5.5,4 C4.7,4 4,4.7 4,5.5 L4,7"
        opacity="0.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fill="#8596cf"
        fillRule="nonzero"
        d="M12.6,17.7 L12.6,24.4 C12.2,24.3 11.9,24.2 11.5,24.2 C9.7,24.2 8.3,25.6 8.3,27.4 C8.3,29.2 9.7,30.6 11.5,30.6 C13.3,30.6 14.7,29.2 14.7,27.4 L14.7,19.8 L17.6,19.8 L17.6,17.6 L12.6,17.6 L12.6,17.7 Z"
      />
    </>
  ),
  code: (
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
  ),
  document: (
    <>
      {background}
      <path
        d="M2,9 L12,9 L12,10 L2,10 L2,9 Z M2,7 L12,7 L12,8 L2,8 L2,7 Z M2,13 L22,13 L22,14 L2,14 L2,13 Z M2,11 L12,11 L12,12 L2,12 L2,11 Z M2,15 L22,15 L22,16 L2,16 L2,15 Z M2,17 L22,17 L22,18 L2,18 L2,17 Z M2,19 L22,19 L22,20 L2,20 L2,19 Z M2,21 L22,21 L22,22 L2,22 L2,21 Z M2,23 L22,23 L22,24 L2,24 L2,23 Z M2,25 L22,25 L22,26 L2,26 L2,25 Z M2,27 L22,27 L22,28 L2,28 L2,27 Z M2,29 L22,29 L22,30 L2,30 L2,29 Z M2,31 L22,31 L22,32 L2,32 L2,31 Z"
        opacity="0.6"
        fill="#697ec4"
      />
    </>
  ),
  photoshop: (
    <>
      {background}
      {innerShadow}
      <text
        opacity="0.8"
        fontFamily="Source Code Pro"
        fontSize="12"
        fontWeight="400"
        letter-spacing="-0.3"
        fill="#697ec4"
      >
        <tspan x="5.2690141" y="26.4705882">
          Ps
        </tspan>
      </text>
    </>
  ),
  sketch: (
    <>
      {background}
      {innerShadow}
      <path
        d="M18,19.8761468 L12,28 L6,19.8761468 L8.90909091,17 L15.0909091,17 L18,19.8761468 Z"
        stroke="#8596cf"
        fill="#f4f6fc"
      />
    </>
  ),
  spreadsheet: (
    <>
      {background}
      <path
        d="M2,12 L7,12 L7,14 L2,14 L2,12 Z M2,4 L7,4 L7,6 L2,6 L2,4 Z M2,8 L7,8 L7,10 L2,10 L2,8 Z M9,12 L14,12 L14,14 L9,14 L9,12 Z M9,4 L14,4 L14,6 L9,6 L9,4 Z M9,8 L14,8 L14,10 L9,10 L9,8 Z M16,12 L21,12 L21,14 L16,14 L16,12 Z M2,16 L7,16 L7,18 L2,18 L2,16 Z M9,16 L14,16 L14,18 L9,18 L9,16 Z M16,16 L21,16 L21,18 L16,18 L16,16 Z M2,20 L7,20 L7,22 L2,22 L2,20 Z M9,20 L14,20 L14,22 L9,22 L9,20 Z M16,20 L21,20 L21,22 L16,22 L16,20 Z M2,24 L7,24 L7,26 L2,26 L2,24 Z M9,24 L14,24 L14,26 L9,26 L9,24 Z M16,24 L21,24 L21,26 L16,26 L16,24 Z M2,28 L7,28 L7,30 L2,30 L2,28 Z M9,28 L14,28 L14,30 L9,30 L9,28 Z M16,28 L21,28 L21,30 L16,30 L16,28 Z"
        opacity="0.6"
        fill="#697ec4"
      />
    </>
  ),
  video: (
    <>
      {background}
      <path
        d="M4,0 L5,0 L5,36 L4,36 L4,0 Z M0,3 L4,3 L4,4 L0,4 L0,3 Z M0,7 L4,7 L4,8 L0,8 L0,7 Z M0,11 L4,11 L4,12 L0,12 L0,11 Z M0,15 L4,15 L4,16 L0,16 L0,15 Z M0,19 L4,19 L4,20 L0,20 L0,19 Z M0,23 L4,23 L4,24 L0,24 L0,23 Z M0,31 L4,31 L4,32 L0,32 L0,31 Z M0,27 L4,27 L4,28 L0,28 L0,27 Z"
        fill="#7289da"
      />
      <path
        d="M23,9 L24,9 L24,36 L23,36 L23,9 Z M19,11 L23,11 L23,12 L19,12 L19,11 Z M19,15 L23,15 L23,16 L19,16 L19,15 Z M19,19 L23,19 L23,20 L19,20 L19,19 Z M19,23 L23,23 L23,24 L19,24 L19,23 Z M19,31 L23,31 L23,32 L19,32 L19,31 Z M19,27 L23,27 L23,28 L19,28 L19,27 Z"
        fill="#7289da"
        transform="translate(21.5, 22.5) scale(-1, 1) translate(-21.5, -22.5)"
      />
      <path
        d="M14.5039397,17.3759145 C15.1656928,17.7205743 15.165014,18.2797318 14.5039397,18.6240381 L10.1982101,20.8665842 C9.53645691,21.211244 9,20.8649547 9,20.0946469 L9,15.9053057 C9,15.1343167 9.53713571,14.7890621 10.1982101,15.1333684 L14.5039397,17.3759145 L14.5039397,17.3759145 Z"
        stroke="#7289da"
        fill="#f4f6fc"
      />
    </>
  ),
  unknown: (
    <>
      {background}
      {innerShadow}
    </>
  ),
  webcode: (
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
        <tspan x="5.11901409" y="26.4705882">
          /
        </tspan>
        <tspan x="12.0190141" y="26.4705882">
          >
        </tspan>
      </text>
    </>
  ),
}
