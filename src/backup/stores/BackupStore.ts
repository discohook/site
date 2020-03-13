import { observable, runInAction } from "mobx"
import { downloadBlob } from "../../dom/helpers/downloadBlob"
import { toCamelCase } from "../../json/helpers/toCamelCase"
import { toSnakeCase } from "../../json/helpers/toSnakeCase"
import { Message } from "../../message/classes/Message"
import { MessageData } from "../../message/types/MessageData"
import { InitialisableStore } from "../../state/classes/InitialisableStore"
import { BackupData } from "../types/BackupData"
import { ExportData } from "../types/ExportData"

export class BackupStore extends InitialisableStore {
  @observable backupList: BackupData[] = []

  async initialise() {
    if (SERVER) return

    const { databaseStore } = this.manager.stores
    await databaseStore.initialised

    await this.loadBackupList()
  }

  private async loadBackupList() {
    const { databaseStore } = this.manager.stores

    const backupKeys = await databaseStore.database
      .transaction("backups")
      .objectStore("backups")
      .getAllKeys()

    runInAction(() => {
      this.backupList = backupKeys.map(name => ({ name }))
    })
  }

  async loadBackup(name: string) {
    const { databaseStore, messageStore } = this.manager.stores

    const messageData = await databaseStore.database
      .transaction("backups")
      .objectStore("backups")
      .get(name)

    messageStore.message = new Message(messageData)
  }

  async saveBackup(name: string, message?: MessageData) {
    const { databaseStore, messageStore } = this.manager.stores

    if (!message) {
      message = {
        ...messageStore.message.getMessageData(),
        files: undefined,
      }
    }

    await databaseStore.database
      .transaction("backups", "readwrite")
      .objectStore("backups")
      .put(message, name)

    await this.loadBackupList()
  }

  async deleteBackup(name: string) {
    const { databaseStore } = this.manager.stores

    await databaseStore.database
      .transaction("backups", "readwrite")
      .objectStore("backups")
      .delete(name)

    await this.loadBackupList()
  }

  async exportBackup(name: string) {
    const { databaseStore } = this.manager.stores

    const messageData = await databaseStore.database
      .transaction("backups")
      .objectStore("backups")
      .get(name)

    const backup: ExportData = {
      version: 2,
      name,
      message: toSnakeCase(messageData ?? {}),
    }

    const blob = new Blob([JSON.stringify(backup, undefined, 2)], {
      type: "application/json",
    })

    downloadBlob(blob, name)
  }

  private getSafeBackupName(name: string) {
    if (!this.backupList.some(backup => backup.name === name)) {
      return name
    }

    for (let number = 1; true; number++) {
      const proposedName = `${name} (${number})`
      if (!this.backupList.some(backup => backup.name === proposedName)) {
        return proposedName
      }
    }
  }

  async importBackups(blob: Blob) {
    try {
      const json = await blob.text()
      const exportData = JSON.parse(json) as ExportData

      switch (exportData.version) {
        case 1:
          await this.saveBackup(
            this.getSafeBackupName(exportData.name),
            exportData.message,
          )
          break
        case 2:
          await this.saveBackup(
            this.getSafeBackupName(exportData.name),
            toCamelCase(exportData.message),
          )
      }
    } catch {
      // do nothing
    }
  }
}
