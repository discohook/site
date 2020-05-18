import type { Backup } from "./backup/types/Backup"

export type Schema = {
  backup: {
    key: number
    value: Backup
    indexes: {
      name: string
    }
  }
}
