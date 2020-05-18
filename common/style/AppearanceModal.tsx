import { useObserver } from "mobx-react-lite"
import React from "react"
import styled from "styled-components"
import { FlexContainer } from "../../modules/editor/styles/FlexContainer"
import { Button } from "../input/Button"
import { ModalContext } from "../modal/ModalContext"
import { BaseModal } from "../modal/styles/BaseModal"
import { BaseModalBody } from "../modal/styles/BaseModalBody"
import { BaseModalFooter } from "../modal/styles/BaseModalFooter"
import { BaseModalHeader } from "../modal/styles/BaseModalHeader"
import { useRequiredContext } from "../state/useRequiredContext"
import { AppearanceManagerContext } from "./AppearanceManagerContext"
import { COLOR_THEMES, DISPLAY_THEMES, FONT_SIZES } from "./constants"

const AppearanceTypeHeader = styled.h5`
  margin: 16px 8px 2px;

  color: ${({ theme }) => theme.header.secondary};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`

export type AppearanceModalProps = {}

export function AppearanceModal() {
  const modal = useRequiredContext(ModalContext)
  const appearanceManager = useRequiredContext(AppearanceManagerContext)

  return useObserver(() => (
    <BaseModal>
      <BaseModalHeader>Appearance</BaseModalHeader>
      <BaseModalBody>
        <AppearanceTypeHeader>Color theme</AppearanceTypeHeader>
        <FlexContainer flow="row">
          {COLOR_THEMES.map(color => (
            <Button
              key={color}
              variant={appearanceManager.color === color ? "filled" : "outline"}
              onClick={() => {
                appearanceManager.color = color
              }}
            >
              {color.replace(/^\w/, letter => letter.toUpperCase())} theme
            </Button>
          ))}
        </FlexContainer>
        {!appearanceManager.mobile && (
          <>
            <AppearanceTypeHeader>Display mode</AppearanceTypeHeader>
            <FlexContainer flow="row">
              {DISPLAY_THEMES.map(display => (
                <Button
                  key={display}
                  variant={
                    appearanceManager.display === display ? "filled" : "outline"
                  }
                  onClick={() => {
                    appearanceManager.display = display
                  }}
                >
                  {display.replace(/^\w/, letter => letter.toUpperCase())} mode
                </Button>
              ))}
            </FlexContainer>
          </>
        )}
        <AppearanceTypeHeader>Font size</AppearanceTypeHeader>
        <FlexContainer flow="row">
          {FONT_SIZES.map(fontSize => (
            <Button
              key={fontSize}
              variant={
                appearanceManager.fontSize === fontSize ? "filled" : "outline"
              }
              onClick={() => {
                appearanceManager.fontSize = fontSize
              }}
            >
              {fontSize}px
            </Button>
          ))}
        </FlexContainer>
      </BaseModalBody>
      <BaseModalFooter>
        <Button
          size="medium"
          variant="borderless"
          onClick={() => {
            appearanceManager.color = "dark"
            appearanceManager.display = "cozy"
            appearanceManager.fontSize = 16
          }}
        >
          Reset
        </Button>
        <Button size="medium" onClick={() => modal.dismiss()}>
          Close
        </Button>
      </BaseModalFooter>
    </BaseModal>
  ))
}
