import { readFileSync } from "fs"
import { resolve } from "path"
import { createDeflate, createGzip } from "zlib"
import { createPassthroughTransform } from "./helpers/createPassthroughTransform"

export const BUILD_FOLDER = resolve(__dirname, "../../dist")

export const RAW_TEMPLATE = readFileSync(
  resolve(BUILD_FOLDER, "index.html"),
  "utf8",
)

export const SUPPORTED_ENCODINGS = {
  gzip: createGzip,
  deflate: createDeflate,
  identity: createPassthroughTransform,
} as const
