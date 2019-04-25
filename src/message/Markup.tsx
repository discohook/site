import React from "react"

interface Props {
  content: string
}

export const Markup = (props: Props) => <div>{props.content}</div>
