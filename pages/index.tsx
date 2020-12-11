import { useObserver } from "mobx-react-lite"
import { destroy, getSnapshot, SnapshotOut } from "mobx-state-tree"
import type { GetServerSidePropsContext } from "next"
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { base64UrlEncode } from "../common/base64/base64UrlEncode"
import { ModalManagerContext } from "../common/modal/ModalManagerContext"
import { Header } from "../common/page/Header"
import { PageHead } from "../common/page/PageHead"
import { PreferencesModal } from "../common/settings/PreferencesModal"
import { useAutorun } from "../common/state/useAutorun"
import { useLazyValue } from "../common/state/useLazyValue"
import { useRequiredContext } from "../common/state/useRequiredContext"
import { timeout } from "../common/utilities/timeout"
import { Editor } from "../modules/editor/Editor"
import { EditorManager } from "../modules/editor/EditorManager"
import { EditorManagerProvider } from "../modules/editor/EditorManagerContext"
import { getEditorManagerFromQuery } from "../modules/editor/getEditorManagerFromQuery"
import { Preview } from "../modules/message/preview/Preview"

const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
`

const View = styled.main.attrs({ translate: "no" })`
  max-height: calc(100% - 48px);

  display: flex;
  flex-direction: row-reverse;
  align-items: stretch;

  flex: 1;

  & > * {
    flex: 1;
    height: 100%;
    overflow-y: scroll;
  }
`

export type MainProps = {
  state: SnapshotOut<typeof EditorManager>
  mobile: boolean
}

export default function Main(props: MainProps) {
  const { state, mobile } = props

  const editorManager = useLazyValue(() => EditorManager.create(state))
  useEffect(() => () => destroy(editorManager), [editorManager])

  const cancelRef = useRef<() => void>()
  useAutorun(() => {
    const messages = editorManager.messages.map(message => ({
      data: message.data,
    }))

    cancelRef.current?.()
    cancelRef.current = timeout(() => {
      const json = JSON.stringify({ messages })
      const base64 = base64UrlEncode(json)

      history.replaceState({ __N: false }, "", `/?data=${base64}`)
    }, 500)
  })

  const [activeTab, setActiveTab] = useState<"Preview" | "Editor">("Preview")

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
            { name: "Support Server", to: "/discord", newWindow: true },
            { name: "Discord Bot", to: "/bot", newWindow: true },
            { name: "Settings", handler: spawnSettingsModal },
          ]}
          tabs={
            mobile
              ? {
                  items: ["Editor", "Preview"],
                  current: activeTab,
                  onChange: setActiveTab,
                }
              : undefined
          }
        />
        <View>
          {(!mobile || activeTab === "Preview") && (
            <div>
              <Preview />
            </div>
          )}
          {(!mobile || activeTab === "Editor") && (
            <div>
              <Editor />
            </div>
          )}
        </View>
      </Container>
    </EditorManagerProvider>
  ))
}

export const getServerSideProps = (
  context: GetServerSidePropsContext,
): { props: MainProps } => {
  return {
    props: {
      state: getSnapshot(getEditorManagerFromQuery(context.query)),
      mobile: /mobile/i.test(context.req.headers["user-agent"] ?? ""),
    },
  }
}
