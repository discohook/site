/* eslint-disable no-await-in-loop */

import { observable, runInAction } from "mobx"
import { downloadBlob } from "../../../common/dom/downloadBlob"
import { toSnakeCase } from "../../../common/object/toSnakeCase"
import type { EditorManagerLike } from "../../editor/EditorManager"
import { messageOf } from "../../message/helpers/messageOf"
import type { MessageData } from "../../message/state/data/MessageData"
import type { DatabaseManager } from "../DatabaseManager"
import type { Backup } from "./types/Backup"
import type { BackupData } from "./types/BackupData"
import type { ExportData } from "./types/ExportData"

export class BackupManager {
  private readonly databaseManager: DatabaseManager
  private readonly editorManager: EditorManagerLike

  @observable backups: BackupData[] = []

  constructor(
    databaseManager: DatabaseManager,
    editorManager: EditorManagerLike,
  ) {
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

    this.editorManager.set(
      "messages",
      backup.messages.map(({ data, ...message }) => ({
        ...messageOf(data),
        ...message,
      })),
    )
    this.editorManager.set("targets", backup.targets)
    for (const target of this.editorManager.targets) {
      target.fetch().catch(() => {})
    }
  }

  async saveBackup(backup: string | Backup) {
    if (typeof backup === "string") {
      const id = await this.getId(backup)

      backup = {
        id,
        name: backup,
        messages: this.editorManager.messages.map(message => ({
          data: {
            ...message.data,
            files: undefined,
          },
          reference: message.reference,
        })),
        targets: this.editorManager.targets.map(target => ({
          url: target.url,
        })),
      }
    } else {
      backup = {
        ...backup,
        id: await this.getId(backup.name),
      }
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
      version: 7,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      backups: [backup].map(({ id, ...backup }) => backup),
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
      version: 7,
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
    let exportData = JSON.parse(await blob.text()) as ExportData

    switch (exportData.version) {
      case 1:
      case 2: {
        exportData = {
          version: 3,
          backups: [
            {
              name: exportData.name,
              message: toSnakeCase(exportData.message) as MessageData,
            },
          ],
        }
      }
      // falls through
      case 3: {
        exportData = {
          version: 4,
          backups: exportData.backups.map(({ message, ...backup }) => ({
            ...backup,
            messages: [message],
          })),
        }
      }
      // falls through
      case 4:
        exportData = {
          version: 5,
          backups: exportData.backups.map(({ webhookUrl, ...backup }) => ({
            ...backup,
            target: {
              url: webhookUrl,
            },
          })),
        }
      // falls through
      case 5:
        exportData = {
          version: 6,
          backups: exportData.backups.map(
            ({ messages, target, ...backup }) => ({
              ...backup,
              messages: messages.map(data => ({
                data,
                reference: target.message,
              })),
              target: {
                url: target.url,
              },
            }),
          ),
        }
      // falls through
      case 6:
        exportData = {
          version: 7,
          backups: exportData.backups.map(({ target, ...backup }) => ({
            ...backup,
            targets: [{ url: target.url ?? "" }],
          })),
        }
      // falls through
      case 7:
        for (const backup of exportData.backups) {
          await this.saveBackup({
            ...backup,
            name: await this.getSafeBackupName(backup.name),
            id: undefined,
          })
        }
    }
  }
}
