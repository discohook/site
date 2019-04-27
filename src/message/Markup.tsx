import React from "react"
import SimpleMarkdown from "simple-markdown"

interface Props {
  content: string
}

export const Markup = (props: Props) => (
  <div>
    {SimpleMarkdown.defaultReactOutput(
      SimpleMarkdown.defaultImplicitParse(props.content),
    )}
  </div>
)
