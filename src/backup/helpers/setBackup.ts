import { MessageData } from "../../message/types/MessageData"
import { runTransaction } from "./runTransaction"

export const setBackup = async (name: string, message: MessageData) => {
  await runTransaction("readwrite", store => store.put(message, name))
}
