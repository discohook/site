import { useObserver } from "mobx-react-lite"
import React from "react"
import { useRequiredContext } from "../../../common/state/useRequiredContext"
import { EditorManagerContext } from "../../editor/EditorManagerContext"
import { MessagePreview } from "./MessagePreview"

export function Preview() {
  const editorManager = useRequiredContext(EditorManagerContext)

  return useObserver(() => (
    <>
      {editorManager.messages.map(message => (
        <MessagePreview key={message.id} message={message} />
      ))}
    </>
  ))
}
