import serve from "koa-static"
import { BUILD_FOLDER } from "../constants"

export const serveStaticFiles = () =>
  serve(BUILD_FOLDER, {
    index: false,
    maxAge: 31536000,
    immutable: true,
  })
