/* eslint-disable no-await-in-loop */

import { observable, runInAction } from "mobx"
import { downloadBlob } from "../../dom/helpers/downloadBlob"
import { toCamelCase } from "../../json/helpers/toCamelCase"
import { toSnakeCase } from "../../json/helpers/toSnakeCase"
import { Message } from "../../message/classes/Message"
import { InitializableStore } from "../../state/classes/InitializableStore"
import type { Stores } from "../../state/types/Stores"
import type { Backup } from "../types/Backup"
import type { BackupData } from "../types/BackupData"
import type { ExportData } from "../types/ExportData"

export class BackupStore extends InitializableStore<Stores> {
  @observable backupList: BackupData[] = []

  async initialize() {
    if (SERVER) return

    const { databaseStore } = this.manager.stores
    await databaseStore.initialized

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
    const { databaseStore, messageStore, webhookStore } = this.manager.stores

    const backup = await databaseStore.database
      .transaction("backups")
      .objectStore("backups")
      .get(name)

    if (!backup) return

    messageStore.message = new Message(backup.message)
    webhookStore.url = backup.webhookUrl ?? ""
  }

  async saveBackup(name: string, backup?: Backup) {
    const { databaseStore, messageStore, webhookStore } = this.manager.stores

    if (!backup) {
      backup = {
        name,
        webhookUrl: webhookStore.url || undefined,
        message: {
          ...messageStore.message.getMessageData(),
          files: undefined,
        },
      }
    }

    await databaseStore.database
      .transaction("backups", "readwrite")
      .objectStore("backups")
      .put(backup, name)

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

    const backup = await databaseStore.database
      .transaction("backups")
      .objectStore("backups")
      .get(name)

    if (!backup) return

    const backupData: ExportData = {
      version: 3,
      backups: [{ ...backup, message: toSnakeCase(backup.message) }],
    }

    const blob = new Blob([JSON.stringify(backupData, undefined, 2)], {
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
        case 2: {
          await this.saveBackup(this.getSafeBackupName(exportData.name), {
            name: exportData.name,
            message: toCamelCase(exportData.message),
          })
          break
        }
        case 3: {
          for (const backup of exportData.backups) {
            await this.saveBackup(this.getSafeBackupName(backup.name), {
              ...backup,
              message: toCamelCase(backup.message),
            })
          }
          break
        }
      }
    } catch (error) {
      console.error("Error importing backups:", error)
    }
  }
}
