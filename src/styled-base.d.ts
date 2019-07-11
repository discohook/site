import "@emotion/styled-base"
import { Interpolation } from "@emotion/styled-base"
import { Theme } from "./themes"

declare module "@emotion/styled-base" {
  export interface CreateStyledComponentBase<
    InnerProps,
    ExtraProps,
    StyledInstanceTheme extends object
  > {
    <
      StyleProps extends Omit<
        Omit<InnerProps, keyof StyleProps>,
        "ref" | "key"
      > = Omit<InnerProps & ExtraProps, "ref" | "key">
    >(
      ...styles: Array<Interpolation<WithTheme<StyleProps, Theme>>>
    ): StyledComponent<InnerProps, StyleProps, Theme>

    <
      StyleProps extends Omit<
        Omit<InnerProps, keyof StyleProps>,
        "ref" | "key"
      > = Omit<InnerProps & ExtraProps, "ref" | "key">
    >(
      template: TemplateStringsArray,
      ...styles: Array<Interpolation<WithTheme<StyleProps, Theme>>>
    ): StyledComponent<InnerProps, StyleProps, Theme>
  }
}
