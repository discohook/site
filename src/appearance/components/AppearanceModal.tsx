import React from "react"
import styled from "styled-components"
import { Actions } from "../../editor/components/Actions"
import { FlexContainer } from "../../editor/components/Container"
import { Button } from "../../form/components/Button"
import { COLOR_THEMES, DISPLAY_THEMES, FONT_SIZES } from "../constants"
import { useTheme } from "../hooks/useTheme"
import { Appearance } from "../types/Appearance"

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background: ${({ theme }) => theme.background.primary};
  border-radius: 3px;
  padding: 8px;
  overflow-y: scroll;
`

const AppearanceTypeHeader = styled.div`
  margin: 16px 8px 2px;

  color: ${({ theme }) => theme.header.secondary};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`

export type AppearanceModalProps = {
  onAppearanceChange: (appearance: Appearance) => void
  onClose: () => void
}

export function AppearanceModal(props: AppearanceModalProps) {
  const {
    onAppearanceChange: handleAppearanceChange,
    onClose: handleClose,
  } = props

  const { appearance } = useTheme()
  const { mobile } = appearance

  return (
    <ModalContainer onClick={event => event.stopPropagation()}>
      <Actions
        title="Appearance"
        actions={[
          {
            name: "Reset",
            action: () =>
              handleAppearanceChange({
                ...appearance,
                color: "dark",
                display: "cozy",
                fontSize: 16,
              }),
          },
          {
            name: "Close",
            action: handleClose,
          },
        ]}
      />
      <AppearanceTypeHeader>Color theme</AppearanceTypeHeader>
      <FlexContainer flow="row">
        {COLOR_THEMES.map(color => (
          <Button
            key={color}
            onClick={() => {
              handleAppearanceChange({ ...appearance, color })
            }}
            filled={appearance.color === color}
          >
            {color.replace(/^\w/, letter => letter.toUpperCase())} theme
          </Button>
        ))}
      </FlexContainer>
      {!mobile && (
        <>
          <AppearanceTypeHeader>Display mode</AppearanceTypeHeader>
          <FlexContainer flow="row">
            {DISPLAY_THEMES.map(display => (
              <Button
                key={display}
                onClick={() => {
                  handleAppearanceChange({ ...appearance, display })
                }}
                filled={appearance.display === display}
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
            onClick={() => {
              handleAppearanceChange({ ...appearance, fontSize })
            }}
            filled={appearance.fontSize === fontSize}
          >
            {fontSize} pixels
          </Button>
        ))}
      </FlexContainer>
    </ModalContainer>
  )
}
