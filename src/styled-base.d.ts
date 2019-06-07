import "@emotion/styled-base"
import { Interpolation } from "@emotion/styled-base"
import { Theme as _Theme } from "./themes"

type Overwrapped<T, U> = Pick<T, Extract<keyof T, keyof U>>
type ReactClassPropKeys = "ref" | "key"

declare module "@emotion/styled-base" {
  export interface CreateStyledComponentBase<
    InnerProps,
    ExtraProps,
    Theme extends object
  > {
    <
      StyleProps extends Omit<
        Overwrapped<InnerProps, StyleProps>,
        ReactClassPropKeys
      > = Omit<InnerProps & ExtraProps, ReactClassPropKeys>
    >(
      ...styles: Array<Interpolation<WithTheme<StyleProps, _Theme>>>
    ): StyledComponent<InnerProps, StyleProps, _Theme>
    <
      StyleProps extends Omit<
        Overwrapped<InnerProps, StyleProps>,
        ReactClassPropKeys
      > = Omit<InnerProps & ExtraProps, ReactClassPropKeys>
    >(
      template: TemplateStringsArray,
      ...styles: Array<Interpolation<WithTheme<StyleProps, _Theme>>>
    ): StyledComponent<InnerProps, StyleProps, _Theme>
  }
}
