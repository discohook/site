import type { Backup } from "../../backup/types/Backup"

export type Schema = {
  backups: {
    key: string
    value: Backup
  }
}
