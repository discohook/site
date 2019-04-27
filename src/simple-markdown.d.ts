declare module "simple-markdown" {
  namespace SimpleMarkdown {
    export type Capture =
      | Array<string> & { index: number }
      | Array<string> & { index?: number }
    export type Attr = string | number | boolean
    export type SingleASTNode = {
      type: string
      [key: string]: any
    }
    export type UnTypedASTNode = {
      [key: string]: any
    }
    export type ASTNode = SingleASTNode | Array<SingleASTNode>
    export type State = { [key: string]: any }
    export type ReactElement = React.ReactElement<any>
    export type ReactElements = React.ReactNode
    export type MatchFunction = (
      source: string,
      state: State,
      prevCapture: string,
    ) => Capture | null
    export type Parser = (source: string, state?: State | null) => ASTNode
    export type ParseFunction = (
      capture: Capture,
      nestedParse: Parser,
      state: State,
    ) => UnTypedASTNode | ASTNode
    export type SingleNodeParseFunction = (
      capture: Capture,
      nestedParse: Parser,
      state: State,
    ) => UnTypedASTNode
    export type Output<Result> = (node: ASTNode, state?: State | null) => Result
    export type NodeOutput<Result> = (
      node: SingleASTNode,
      nestedOutput: Output<Result>,
      state: State,
    ) => Result
    export type ArrayNodeOutput<Result> = (
      node: Array<SingleASTNode>,
      nestedOutput: Output<Result>,
      state: State,
    ) => Result
    export type ReactOutput = Output<ReactElements>
    export type ReactNodeOutput = NodeOutput<ReactElements>
    export type HtmlOutput = Output<string>
    export type HtmlNodeOutput = NodeOutput<string>
    export type ParserRule = {
      readonly order: number
      readonly match: MatchFunction
      readonly quality?: (
        capture: Capture,
        state: State,
        prevCapture: string,
      ) => number
      readonly parse: ParseFunction
    }
    export type SingleNodeParserRule = {
      readonly order: number
      readonly match: MatchFunction
      readonly quality?: (
        capture: Capture,
        state: State,
        prevCapture: string,
      ) => number
      readonly parse: SingleNodeParseFunction
    }
    export type ReactOutputRule = {
      readonly react: ReactNodeOutput | null
    }
    export type HtmlOutputRule = {
      readonly html: HtmlNodeOutput | null
    }
    export type ArrayRule = {
      readonly react?: ArrayNodeOutput<ReactElements>
      readonly html?: ArrayNodeOutput<string>
    } & {
      readonly [key: string]: ArrayNodeOutput<any>
    }
    export type ParserRules = {
      readonly Array?: ArrayRule
    } & {
      readonly [type: string]: ParserRule
    }
    export type OutputRules<Rule> = {
      readonly Array?: ArrayRule
    } & {
      readonly [type: string]: Rule
    }
    export type Rules<OutputRule> = {
      readonly Array?: ArrayRule
    } & {
      readonly [type: string]: ParserRule & OutputRule
    }
    export type ReactRules = {
      readonly Array?: {
        readonly react: ArrayNodeOutput<ReactElements>
      }
    } & {
      readonly [type: string]: ParserRule & ReactOutputRule
    }
    export type HtmlRules = {
      readonly Array?: {
        readonly html: ArrayNodeOutput<string>
      }
    } & {
      readonly [type: string]: ParserRule & HtmlOutputRule
    }
    export type NonNullReactOutputRule = {
      readonly react: ReactNodeOutput
    }
    export type ElementReactOutputRule = {
      readonly react: NodeOutput<ReactElement>
    }
    export type TextReactOutputRule = {
      readonly react: NodeOutput<string>
    }
    export type NonNullHtmlOutputRule = {
      readonly html: HtmlNodeOutput
    }
    export type DefaultInRule = SingleNodeParserRule &
      ReactOutputRule &
      HtmlOutputRule
    export type TextInOutRule = SingleNodeParserRule &
      TextReactOutputRule &
      NonNullHtmlOutputRule
    export type LenientInOutRule = SingleNodeParserRule &
      NonNullReactOutputRule &
      NonNullHtmlOutputRule
    export type DefaultInOutRule = SingleNodeParserRule &
      ElementReactOutputRule &
      NonNullHtmlOutputRule
    export type DefaultRules = {
      readonly Array: {
        readonly react: ArrayNodeOutput<ReactElements>
        readonly html: ArrayNodeOutput<string>
      }
      readonly heading: DefaultInOutRule
      readonly nptable: DefaultInRule
      readonly lheading: DefaultInRule
      readonly hr: DefaultInOutRule
      readonly codeBlock: DefaultInOutRule
      readonly fence: DefaultInRule
      readonly blockQuote: DefaultInOutRule
      readonly list: DefaultInOutRule
      readonly def: LenientInOutRule
      readonly table: DefaultInOutRule
      readonly newline: TextInOutRule
      readonly paragraph: DefaultInOutRule
      readonly escape: DefaultInRule
      readonly autolink: DefaultInRule
      readonly mailto: DefaultInRule
      readonly url: DefaultInRule
      readonly link: DefaultInOutRule
      readonly image: DefaultInOutRule
      readonly reflink: DefaultInRule
      readonly refimage: DefaultInRule
      readonly em: DefaultInOutRule
      readonly strong: DefaultInOutRule
      readonly u: DefaultInOutRule
      readonly del: DefaultInOutRule
      readonly inlineCode: DefaultInOutRule
      readonly br: DefaultInOutRule
      readonly text: TextInOutRule
    }
    export type RefNode = {
      type: string
      content?: ASTNode
      target?: string
      title?: string
    }

    export const defaultRules: DefaultRules
    export const parserFor: (
      rules: ParserRules,
      defaultState?: State | null,
    ) => Parser
    export const outputFor: <Rule extends Object>(
      rules: OutputRules<Rule>,
      param: keyof Rule,
      defaultState?: State | null,
    ) => Output<any>
    export const ruleOutput: <Rule extends Object>(
      rules: OutputRules<Rule>,
      param: keyof Rule,
    ) => NodeOutput<any>
    export const reactFor: (outputFunc: ReactNodeOutput) => ReactOutput
    export const htmlFor: (outputFunc: HtmlNodeOutput) => HtmlOutput
    export const inlineRegex: (regex: RegExp) => MatchFunction
    export const blockRegex: (regex: RegExp) => MatchFunction
    export const anyScopeRegex: (regex: RegExp) => MatchFunction
    export const parseInline: (
      parse: Parser,
      content: string,
      state: State,
    ) => ASTNode
    export const parseBlock: (
      parse: Parser,
      content: string,
      state: State,
    ) => ASTNode
    export const markdownToReact: (
      source: string,
      state?: State | null,
    ) => ReactElements
    export const markdownToHtml: (
      source: string,
      state?: State | null,
    ) => string
    export const ReactMarkdown: (props: {
      source: string
      [key: string]: any
    }) => ReactElement
    export const defaultRawParse: (
      source: string,
      state?: State | null,
    ) => Array<SingleASTNode>
    export const defaultBlockParse: (
      source: string,
      state?: State | null,
    ) => Array<SingleASTNode>
    export const defaultInlineParse: (
      source: string,
      state?: State | null,
    ) => Array<SingleASTNode>
    export const defaultImplicitParse: (
      source: string,
      state?: State | null,
    ) => Array<SingleASTNode>
    export const defaultReactOutput: ReactOutput
    export const defaultHtmlOutput: HtmlOutput
    export const preprocess: (source: string) => string
    export const sanitizeText: (text: Attr) => string
    export const sanitizeUrl: (url: string | null) => string | null
    export const unescapeUrl: (url: string) => string
    export const htmlTag: (
      tagName: string,
      content: string,
      attributes?: { [key: string]: Attr | null | undefined } | null,
      isClosed?: boolean | null,
    ) => string
    export const reactElement: (
      type: string,
      key: string | null,
      props: { [key: string]: any },
    ) => ReactElement
  }
  export = SimpleMarkdown
}
