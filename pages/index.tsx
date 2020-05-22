import { useObserver } from "mobx-react-lite"
import type { GetServerSidePropsContext } from "next"
import Head from "next/head"
import Router from "next/router"
import React, { useEffect, useState } from "react"
import styled, { css, ThemeProvider } from "styled-components"
import { base64UrlEncode } from "../common/base64/base64UrlEncode"
import { PageHead } from "../common/PageHead"
import { useAutorun } from "../common/state/useAutorun"
import { useLazyValue } from "../common/state/useLazyValue"
import { useRequiredContext } from "../common/state/useRequiredContext"
import { AppearanceManagerContext } from "../common/style/AppearanceManagerContext"
import { Editor } from "../modules/editor/Editor"
import { EditorManager } from "../modules/editor/EditorManager"
import { EditorManagerProvider } from "../modules/editor/EditorManagerContext"
import type { MessageData } from "../modules/message/data/MessageData"
import { decodeMessage } from "../modules/message/helpers/decodeMessage"
import { INITIAL_MESSAGE_DATA } from "../modules/message/initialMessageData"
import { MessagePreview } from "../modules/message/MessagePreview"

const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
`

const TabSwitcher = styled.div`
  display: flex;

  background: ${({ theme }) => theme.background.secondary};

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`

const Tab = styled.button.attrs({ type: "button" })<{ active: boolean }>`
  height: 40px;
  padding: 0 16px;

  background: none;
  border: solid transparent;
  border-width: 2px 0;
  border-radius: 0;

  font-weight: 500;
  font-size: 15px;
  color: ${({ theme }) => theme.header.primary};
  line-height: 38px;

  ${({ active }) =>
    active &&
    css`
      border-bottom-color: ${({ theme }) => theme.accent.primary};
    `}
`

const View = styled.main`
  display: flex;
  flex-direction: row-reverse;
  align-items: stretch;

  flex: 1;

  max-height: 100%;

  & > * {
    flex: 1;
  }

  ${({ theme }) =>
    theme.appearance.mobile &&
    css`
      margin: 40px 0 0;
      max-height: calc(100% - 40px);
    `}
`

const ScrollContainer = styled.div`
  height: 100%;
  overflow-y: scroll;
`

const Preview = styled(MessagePreview)`
  flex: 0 0 auto;
`

export type MainProps = {
  message: MessageData
  mobile: boolean
}

export default function Main(props: MainProps) {
  const { message, mobile } = props

  const editorManager = useLazyValue(() => new EditorManager(message))

  useAutorun(() => {
    const message = editorManager.message.getMessageData()
    const json = JSON.stringify({ message: { ...message, files: undefined } })
    const base64 = base64UrlEncode(json)

    if (Router.query.message !== base64) {
      Router.replace(`/?message=${base64}`, `/?message=${base64}`, {
        shallow: true,
      }).catch(() => {})
    }
  })

  const appearanceManager = useRequiredContext(AppearanceManagerContext)
  useEffect(() => {
    appearanceManager.mobile = mobile
  }, [appearanceManager, mobile])

  const [activeTab, setActiveTab] = useState<"preview" | "editor">("preview")

  return useObserver(() => (
    <ThemeProvider
      theme={theme => ({
        ...theme,
        appearance: { ...theme.appearance, mobile },
      })}
    >
      <EditorManagerProvider value={editorManager}>
        <PageHead
          title="Discohook | A message and embed generator for Discord webhooks"
          description="An easy-to-use tool for building and sending Discord messages and embeds using webhooks."
        />
        <Head>
          <meta key="referrer" name="referrer" content="strict-origin" />
        </Head>
        <Container>
          {mobile && (
            <TabSwitcher>
              <Tab
                active={activeTab === "editor"}
                onClick={() => setActiveTab("editor")}
              >
                Editor
              </Tab>
              <Tab
                active={activeTab === "preview"}
                onClick={() => setActiveTab("preview")}
              >
                Preview
              </Tab>
            </TabSwitcher>
          )}
          <View>
            {(!mobile || activeTab === "preview") && (
              <ScrollContainer>
                <Preview message={editorManager.message} />
              </ScrollContainer>
            )}
            {(!mobile || activeTab === "editor") && (
              <ScrollContainer>
                <Editor />
              </ScrollContainer>
            )}
          </View>
        </Container>
      </EditorManagerProvider>
    </ThemeProvider>
  ))
}

export const getServerSideProps = (
  context: GetServerSidePropsContext,
): { props: MainProps } => {
  const message =
    decodeMessage(String(context.query.message ?? "")) ?? INITIAL_MESSAGE_DATA

  const mobile = /mobile/i.test(context.req.headers["user-agent"] ?? "")

  return {
    props: {
      message,
      mobile,
    },
  }
}
