import React from "react"
import type { Embed } from "../../message/classes/Embed"
import type { Manager } from "../../state/types/Manager"
import { ImagesEditorModal } from "../components/ImagesEditorModal"

export const spawnImagesEditorModal = (manager: Manager, embed: Embed) => {
  manager.stores.modalStore.spawn({
    name: "images-editor",
    render: () => <ImagesEditorModal embed={embed} />,
  })
}
