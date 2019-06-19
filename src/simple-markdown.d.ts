type ReactNode = React.ReactNode

declare module "simple-markdown" {
  namespace SimpleMarkdown {
    export type ASTNode = Record<string, any>
    export type State = Record<string, any>
    export type Capture = string[] & { index?: number }

    export type Rule = {
      order: number
      match: (
        source: string,
        state: State,
        previousCapture: string,
      ) => Capture | null
      parse: (capture: Capture, parser: Parser, state: State) => ASTNode
      react?: (
        node: ASTNode,
        output: (node: ASTNode, state: State) => ReactNode,
        state: State,
      ) => ReactNode
    }
    export type Rules = Record<string, Rule>

    export const inlineRegex: (regex: RegExp) => Rule["match"]
    export const blockRegex: (regex: RegExp) => Rule["match"]
    export const anyScopeRegex: (regex: RegExp) => Rule["match"]

    export type Parser = (source: string, state?: State) => ASTNode[]
    export type ReactOutput = (node: ASTNode, state?: State) => ReactNode

    export const parserFor: (rules: Rules, defaultState?: State) => Parser
    export const outputFor: (
      rules: Rules,
      param: "react",
      defaultState?: State,
    ) => ReactOutput

    export const defaultRules: Rules
  }

  export = SimpleMarkdown
}
