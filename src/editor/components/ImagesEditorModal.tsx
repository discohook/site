import { useObserver } from "mobx-react-lite"
import React from "react"
import styled from "styled-components"
import { Button } from "../../form/components/Button"
import { InputField } from "../../form/components/InputField"
import type { Embed } from "../../message/classes/Embed"
import { BaseModal } from "../../modal/components/BaseModal"
import { BaseModalBody } from "../../modal/components/BaseModalBody"
import { BaseModalFooter } from "../../modal/components/BaseModalFooter"
import { BaseModalHeader } from "../../modal/components/BaseModalHeader"
import { useStores } from "../../state/hooks/useStores"
import { FlexContainer } from "./Container"

const GalleryNotice = styled.div`
  margin: 8px;
  line-height: 1.375;
`

export type ImagesEditorModalProps = {
  embed: Embed
}

export function ImagesEditorModal(props: ImagesEditorModalProps) {
  const { embed } = props

  const { modalStore } = useStores()

  return useObserver(() => {
    const imageInputs = embed.gallery.map((image, index) => (
      <FlexContainer
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        flow="row"
      >
        <InputField
          id={`e${embed.id}.image${index}`}
          value={embed.gallery[index]}
          onChange={url => {
            embed.gallery[index] = url
          }}
          label={`Image ${index + 1}`}
          validate={url =>
            /^https?:\/\//.test(url) ? undefined : "Invalid URL"
          }
        />
        <Button
          onClick={() => {
            embed.gallery.splice(index, 1)
          }}
        >
          Remove
        </Button>
      </FlexContainer>
    ))

    return (
      <BaseModal>
        <BaseModalHeader>Images</BaseModalHeader>
        <BaseModalBody>
          {imageInputs}
          {embed.gallery.length < 4 && (
            <FlexContainer flow="row">
              {embed.gallery.length >= 1 && !embed.url && (
                <GalleryNotice>
                  Adding up to 4 images is possible when this embed has an URL.
                  Beware that every image after first will use up an additional
                  embed internally.
                </GalleryNotice>
              )}
              <Button
                disabled={embed.gallery.length >= 1 && !embed.url}
                onClick={() => {
                  embed.gallery.push("")
                }}
              >
                Add image
              </Button>
            </FlexContainer>
          )}
          <InputField
            id={`e${embed.id}.thumb`}
            value={embed.thumbnail}
            onChange={url => {
              embed.thumbnail = url
            }}
            label="Thumbnail"
            validate={url =>
              /^https?:\/\//.test(url) ? undefined : "Invalid URL"
            }
          />
        </BaseModalBody>
        <BaseModalFooter>
          <Button
            size="medium"
            onClick={() => {
              modalStore.dismiss("images-editor")
            }}
          >
            Done
          </Button>
        </BaseModalFooter>
      </BaseModal>
    )
  })
}
