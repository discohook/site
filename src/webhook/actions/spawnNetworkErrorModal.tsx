import React from "react"
import type { Manager } from "../../state/types/Manager"
import { NetworkErrorModal } from "../components/NetworkErrorModal"

export const spawnNetworkErrorModal = (manager: Manager) => {
  manager.stores.modalStore.spawn({
    name: "network-error",
    render: () => <NetworkErrorModal />,
  })
}
