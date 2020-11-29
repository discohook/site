import React from "react"
import { ErrorPage } from "../common/page/ErrorPage"

export default function NotFound() {
  return <ErrorPage statusCode={404} />
}
