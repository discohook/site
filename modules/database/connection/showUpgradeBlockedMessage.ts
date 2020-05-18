export const showUpgradeBlockedMessage = () => {
  const container = document.createElement("div")
  container.id = "db-upgrade-blocked"
  container.style.position = "absolute"
  container.style.top = "0"
  container.style.right = "0"
  container.style.bottom = "0"
  container.style.left = "0"
  container.style.background = "rgba(0, 0, 0, 0.85)"
  container.style.padding = "16px"

  const header = document.createElement("h1")
  header.style.color = "#ffffff"
  header.append("Discohook's local database needs an upgrade")

  const blockedMessage = document.createElement("p")
  blockedMessage.append(
    "However, the upgrade can't proceed because there are older sessions of Discohook open.",
  )

  const closeTabsMessage = document.createElement("p")
  closeTabsMessage.append("Please close all Discohook tabs before continuing.")

  container.append(header, blockedMessage, closeTabsMessage)
  document.body.append(container)
}
