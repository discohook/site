import { useObserver } from "mobx-react-lite"
import React from "react"
import styled from "styled-components"
import { FlexContainer } from "../../editor/components/Container"
import { Button } from "../../form/components/Button"
import { BaseModal } from "../../modal/components/BaseModal"
import { BaseModalBody } from "../../modal/components/BaseModalBody"
import { BaseModalFooter } from "../../modal/components/BaseModalFooter"
import { BaseModalHeader } from "../../modal/components/BaseModalHeader"
import { useStores } from "../../state/hooks/useStores"
import { COLOR_THEMES, DISPLAY_THEMES, FONT_SIZES } from "../constants"

const AppearanceTypeHeader = styled.h5`
  margin: 16px 8px 2px;

  color: ${({ theme }) => theme.header.secondary};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`

export function AppearanceModal() {
  const { appearanceStore, modalStore } = useStores()

  return useObserver(() => (
    <BaseModal>
      <BaseModalHeader>Appearance</BaseModalHeader>
      <BaseModalBody>
        <AppearanceTypeHeader>Color theme</AppearanceTypeHeader>
        <FlexContainer flow="row">
          {COLOR_THEMES.map(color => (
            <Button
              key={color}
              variant={appearanceStore.color === color ? "filled" : "outline"}
              onClick={() => {
                appearanceStore.color = color
              }}
            >
              {color.replace(/^\w/, letter => letter.toUpperCase())} theme
            </Button>
          ))}
        </FlexContainer>
        {!appearanceStore.mobile && (
          <>
            <AppearanceTypeHeader>Display mode</AppearanceTypeHeader>
            <FlexContainer flow="row">
              {DISPLAY_THEMES.map(display => (
                <Button
                  key={display}
                  variant={
                    appearanceStore.display === display ? "filled" : "outline"
                  }
                  onClick={() => {
                    appearanceStore.display = display
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
          {FONT_SIZES.map(size => (
            <Button
              key={size}
              variant={appearanceStore.fontSize === size ? "filled" : "outline"}
              onClick={() => {
                appearanceStore.fontSize = size
              }}
            >
              {size}px
            </Button>
          ))}
        </FlexContainer>
      </BaseModalBody>
      <BaseModalFooter>
        <Button
          size="medium"
          variant="borderless"
          onClick={() => {
            appearanceStore.color = "dark"
            appearanceStore.display = "cozy"
            appearanceStore.fontSize = 16
          }}
        >
          Reset
        </Button>
        <Button
          size="medium"
          onClick={() => {
            modalStore.dismiss("appearance")
          }}
        >
          Close
        </Button>
      </BaseModalFooter>
    </BaseModal>
  ))
}
