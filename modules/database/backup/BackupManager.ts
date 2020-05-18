/* eslint-disable no-await-in-loop */

import { observable, runInAction } from "mobx"
import { downloadBlob } from "../../../common/dom/downloadBlob"
import { toSnakeCase } from "../../../common/object/toSnakeCase"
import type { EditorManager } from "../../editor/EditorManager"
import { Message } from "../../message/Message"
import type { DatabaseManager } from "../DatabaseManager"
import type { Backup } from "./types/Backup"
import type { BackupData } from "./types/BackupData"
import type { ExportData } from "./types/ExportData"

export class BackupManager {
  private readonly databaseManager: DatabaseManager
  private readonly editorManager: EditorManager

  @observable backups: BackupData[] = []

  constructor(databaseManager: DatabaseManager, editorManager: EditorManager) {
    this.databaseManager = databaseManager
    this.editorManager = editorManager

    databaseManager.initialized
      .then(async () => {
        await this.loadBackupList()
      })
      .catch(() => {})
  }

  private async loadBackupList() {
    const backups: BackupData[] = []

    let cursor = await this.databaseManager.database
      .transaction("backup")
      .objectStore("backup")
      .index("name")
      .openKeyCursor()

    while (cursor) {
      backups.push({
        id: cursor.primaryKey,
        name: cursor.key,
      })

      cursor = await cursor.continue()
    }

    runInAction(() => {
      this.backups = backups
    })
  }

  private async getId(name: string) {
    return this.databaseManager.database
      .transaction("backup")
      .objectStore("backup")
      .index("name")
      .getKey(name)
  }

  async loadBackup(name: string) {
    const backup = await this.databaseManager.database
      .transaction("backup")
      .objectStore("backup")
      .index("name")
      .get(name)

    if (!backup) return

    this.editorManager.message = Message.of(backup.message)
    this.editorManager.webhook.url = backup.webhookUrl ?? ""
  }

  async saveBackup(backup: string | Backup) {
    if (typeof backup === "string") {
      const id = await this.getId(backup)

      backup = {
        id,
        name: backup,
        webhookUrl: this.editorManager.webhook.url || undefined,
        message: {
          ...this.editorManager.message.getMessageData(),
          files: undefined,
        },
      }
    } else {
      backup = { ...backup, id: await this.getId(backup.name) }
    }

    if (!backup.id) delete backup.id

    await this.databaseManager.database
      .transaction("backup", "readwrite")
      .objectStore("backup")
      .put(backup)

    await this.loadBackupList()
  }

  async deleteBackup(name: string) {
    const id = await this.getId(name)
    if (!id) return

    await this.databaseManager.database
      .transaction("backup", "readwrite")
      .objectStore("backup")
      .delete(id)

    await this.loadBackupList()
  }

  async exportBackup(name: string) {
    const backup = await this.databaseManager.database
      .transaction("backup")
      .objectStore("backup")
      .index("name")
      .get(name)

    if (!backup) return

    const backupData: ExportData = {
      version: 3,
      backups: [{ ...backup, id: undefined }],
    }

    const blob = new Blob([JSON.stringify(backupData, undefined, 2), "\n"], {
      type: "application/json",
    })

    downloadBlob(blob, `${name}.json`)
  }

  async exportAll() {
    const backups: Backup[] = []

    let cursor = await this.databaseManager.database
      .transaction("backup")
      .objectStore("backup")
      .openCursor()

    while (cursor) {
      backups.push({
        ...cursor.value,
        id: undefined,
      })

      cursor = await cursor.continue()
    }

    const backupData: ExportData = {
      version: 3,
      backups,
    }

    const blob = new Blob([JSON.stringify(backupData, undefined, 2), "\n"], {
      type: "application/json",
    })

    downloadBlob(blob, "backups.json")
  }

  private async getSafeBackupName(name: string) {
    if (!(await this.getId(name))) {
      return name
    }

    for (let number = 1; true; number++) {
      const proposedName = `${name} (${number})`

      if (!(await this.getId(proposedName))) {
        return proposedName
      }
    }
  }

  async importBackups(blob: Blob) {
    const json = await blob.text()
    const exportData = JSON.parse(json) as ExportData

    switch (exportData.version) {
      case 1:
      case 2: {
        const name = await this.getSafeBackupName(exportData.name)
        await this.saveBackup({
          name,
          message: toSnakeCase(exportData.message),
        })
        break
      }
      case 3: {
        for (const backup of exportData.backups) {
          await this.saveBackup({
            ...backup,
            name: await this.getSafeBackupName(backup.name),
          })
        }
        break
      }
    }
  }
}
