import "@testing-library/jest-dom/extend-expect"
import "fake-indexeddb/auto"
import { StoreManager } from "../state/classes/StoreManager"
import { stores } from "../state/stores"

beforeAll(async () => {
  const manager = new StoreManager(stores)
  await manager.initialize()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(global as any).manager = manager
})
