import { MessageData } from "../../message/types/MessageData"
import { runTransaction } from "./runTransaction"

export const getBackup = async (name: string) => {
  const request = await runTransaction("readonly", store => store.get(name))
  const backup: MessageData | undefined = request.result?.message
  return backup
}
