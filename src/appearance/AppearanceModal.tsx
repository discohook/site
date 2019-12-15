import styled from "@emotion/styled"
import { useTheme } from "emotion-theming"
import React from "react"
import Actions from "../editor/Actions"
import { Container } from "../editor/styles"
import Button from "../form/Button"
import { Appearance, Theme } from "./Theme"

const ModalContainer = styled.div<{}, Theme>`
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

const AppearanceTypeHeader = styled.div<{}, Theme>`
  margin: 16px 8px 2px;

  color: ${({ theme }) => theme.header.secondary};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`

const colorThemes = ["dark", "light"] as const
const displayThemes = ["cozy", "compact"] as const
const fontSizes = [12, 14, 15, 16, 18, 20, 24] as const

type Props = {
  onAppearanceChange: (appearance: Appearance) => void
  onClose: () => void
}

export default function AppearanceModal(props: Props) {
  const {
    onAppearanceChange: handleAppearanceChange,
    onClose: handleClose,
  } = props

  const { appearance } = useTheme<Theme>()
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
          { name: "Close", action: handleClose },
        ]}
      />
      <AppearanceTypeHeader>Color theme</AppearanceTypeHeader>
      <Container flow="row">
        {colorThemes.map(color => (
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
      </Container>
      {!mobile && (
        <>
          <AppearanceTypeHeader>Display mode</AppearanceTypeHeader>
          <Container flow="row">
            {displayThemes.map(display => (
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
          </Container>
        </>
      )}
      <AppearanceTypeHeader>Font size</AppearanceTypeHeader>
      <Container flow="row">
        {fontSizes.map(fontSize => (
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
      </Container>
    </ModalContainer>
  )
}
