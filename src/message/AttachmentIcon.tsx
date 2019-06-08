import React from "react"

export type AttachmentType =
  | "acrobat"
  | "ae"
  | "ai"
  | "archive"
  | "audio"
  | "code"
  | "document"
  | "image"
  | "photoshop"
  | "sketch"
  | "spreadsheet"
  | "video"
  | "webcode"
  | "unknown"

interface Props {
  type: AttachmentType
}

export default function AttachmentIcon(props: Props) {
  const { type } = props

  return (
    <svg
      width="28px"
      height="40px"
      viewBox="0 0 28 40"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-402.000000, -524.000000)" strokeWidth="2">
          <g transform="translate(404.000000, 526.000000)">
            <path
              d="M0,3.00741988 C0,1.34646775 1.34252415,0 2.99998588,0 L15.1166483,0 C17.0807354,0 24,6.91885725 24,8.87457593 L24,33.0035574 C24,34.6584469 22.6582294,36 21.0089096,36 L2.99109042,36 C1.33915679,36 0,34.6544607 0,32.9925801 L0,3.00741988 Z"
              stroke="#7289DA"
              fill="#F4F6FC"
            />
            <path
              d="M17,1.09677336 C17,0.542040316 17.3147964,0.407097791 17.7133118,0.80556379 L23.1952031,6.28677654 C23.5891543,6.68067898 23.4552279,7 22.9039575,7 L18.0045574,7 C17.4497557,7 17,6.54676916 17,5.99556698 L17,1.09677336 Z"
              stroke="#7289DA"
              fill="#F4F6FC"
            />
            <path
              d="M13,3 L4.49710104,3 C3.67027497,3 3,3.66579723 3,4.5 L3,6"
              stroke="#C9D2F0"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}
