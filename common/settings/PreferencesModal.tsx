import { useObserver } from "mobx-react-lite"
import React from "react"
import styled from "styled-components"
import { remove } from "../../icons/remove"
import { bindToInput } from "../input/bindToInput"
import { PrimaryButton } from "../input/button/PrimaryButton"
import { Checkbox } from "../input/checkable/Checkbox"
import { Radio } from "../input/checkable/Radio"
import { RadioGroup } from "../input/checkable/RadioGroup"
import { Slider } from "../input/slider/Slider"
import { Stack } from "../layout/Stack"
import { ModalAction } from "../modal/layout/ModalAction"
import { ModalBody } from "../modal/layout/ModalBody"
import { ModalContainer } from "../modal/layout/ModalContainer"
import { ModalFooter } from "../modal/layout/ModalFooter"
import { ModalHeader } from "../modal/layout/ModalHeader"
import { ModalTitle } from "../modal/layout/ModalTitle"
import { ModalContext } from "../modal/ModalContext"
import { useRequiredContext } from "../state/useRequiredContext"
import { FONT_SIZES } from "../theming/constants"
import { PreferenceManagerContext } from "./PreferenceManagerContext"

const PreferenceSection = styled.h5`
  margin: 8px 0 4px;

  color: ${({ theme }) => theme.header.primary};
  font-weight: 600;
  font-size: 14px;
`

export function PreferencesModal() {
  const modal = useRequiredContext(ModalContext)

  const settingsManager = useRequiredContext(PreferenceManagerContext)

  return useObserver(() => (
    <ModalContainer>
      <ModalHeader>
        <ModalTitle>Settings</ModalTitle>
        <ModalAction
          icon={remove}
          label="Close"
          onClick={() => modal.dismiss()}
        />
      </ModalHeader>
      <ModalBody>
        <Stack gap={8}>
          <PreferenceSection>Appearance</PreferenceSection>
          <RadioGroup
            id="settings_color"
            label="Color Theme"
            {...bindToInput(settingsManager.settings, "color")}
          >
            <Radio label="Dark" value="dark" />
            <Radio label="Light" value="light" />
          </RadioGroup>
          <RadioGroup
            id="settings_display"
            label="Display Mode"
            {...bindToInput(settingsManager.settings, "display")}
          >
            <Radio label="Cozy" value="cozy" />
            <Radio label="Compact" value="compact" />
          </RadioGroup>
          <Slider
            id="settings_fontSize"
            label="Font Size"
            min={0}
            max={6}
            markers={FONT_SIZES.map((size, index) => ({
              value: index,
              label: String(size),
            }))}
            getValueName={value => `${FONT_SIZES[value]} pixels`}
            value={FONT_SIZES.indexOf(settingsManager.settings.fontSize)}
            onChange={index => {
              settingsManager.settings.fontSize = FONT_SIZES[index]
            }}
          />
          <PreferenceSection>Editor</PreferenceSection>
          <Checkbox
            id="settings_confirmExit"
            label="Confirm on Exit"
            {...bindToInput(settingsManager.settings, "confirmExit")}
          />
          <Checkbox
            id="settings_expandSections"
            label="Expand Sections by Default"
            {...bindToInput(settingsManager.settings, "expandSections")}
          />
        </Stack>
      </ModalBody>
      <ModalFooter>
        <PrimaryButton onClick={() => modal.dismiss()}>Close</PrimaryButton>
      </ModalFooter>
    </ModalContainer>
  ))
}
