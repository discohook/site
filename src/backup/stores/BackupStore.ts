import { observable, runInAction } from "mobx"
import { Message } from "../../message/classes/Message"
import { InitialisableStore } from "../../state/classes/InitialisableStore"
import { BackupData } from "../types/BackupData"

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

  async saveBackup(name: string) {
    const { databaseStore, messageStore } = this.manager.stores

    const message = {
      ...messageStore.message.toJS(),
      files: undefined,
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
}
