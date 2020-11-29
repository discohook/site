import { useObserver } from "mobx-react-lite"
import { useRequiredContext } from "../state/useRequiredContext"
import { PreferenceManagerContext } from "./PreferenceManagerContext"
import type { Preferences } from "./Preferences"

export const usePreference = <P extends keyof Preferences>(key: P) => {
  const preferenceManager = useRequiredContext(PreferenceManagerContext)
  return useObserver(() => preferenceManager.settings[key])
}
