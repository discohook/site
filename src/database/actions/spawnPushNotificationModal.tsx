import React from "react"
import { Manager } from "../../state/types/Manager"
import { PushNotificationModal } from "../components/PushNotificationModal"

export const spawnPushNotificationModal = (manager: Manager) => {
  manager.stores.modalStore.spawn({
    name: "persistent-storage-push-notifications",
    render: () => <PushNotificationModal />,
  })
}
