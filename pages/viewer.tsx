import { useObserver } from "mobx-react-lite"
import { destroy, getSnapshot, SnapshotOut } from "mobx-state-tree"
import type { GetServerSidePropsContext } from "next"
import React, { useEffect } from "react"
import styled from "styled-components"
import { ModalManagerContext } from "../common/modal/ModalManagerContext"
import { Header } from "../common/page/Header"
import { PageHead } from "../common/page/PageHead"
import { PreferencesModal } from "../common/settings/PreferencesModal"
import { useLazyValue } from "../common/state/useLazyValue"
import { useRequiredContext } from "../common/state/useRequiredContext"
import { EditorManager } from "../modules/editor/EditorManager"
import { EditorManagerProvider } from "../modules/editor/EditorManagerContext"
import { getEditorManagerFromQuery } from "../modules/editor/getEditorManagerFromQuery"
import { Preview } from "../modules/message/preview/Preview"

const Container = styled.div`
  overflow-y: auto;
`

export type ViewerProps = {
  state: SnapshotOut<typeof EditorManager>
}

export default function Viewer(props: ViewerProps) {
  const { state } = props

  const editorManager = useLazyValue(() => EditorManager.create(state))
  useEffect(() => () => destroy(editorManager), [editorManager])

  const modalManager = useRequiredContext(ModalManagerContext)
  const spawnSettingsModal = () =>
    modalManager.spawn({ render: () => <PreferencesModal /> })

  return useObserver(() => (
    <EditorManagerProvider value={editorManager}>
      <PageHead
        title="Discohook"
        description="The easiest way to build and send Discord messages with embeds using webhooks."
      >
        <meta key="referrer" name="referrer" content="strict-origin" />
      </PageHead>
      <Container>
        <Header
          items={[
            { name: "Editor", to: "/" },
            { name: "Settings", handler: spawnSettingsModal },
          ]}
        />
        <Preview />
      </Container>
    </EditorManagerProvider>
  ))
}

export const getServerSideProps = (
  context: GetServerSidePropsContext,
): { props: ViewerProps } => {
  return {
    props: {
      state: getSnapshot(getEditorManagerFromQuery(context.query)),
    },
  }
}
