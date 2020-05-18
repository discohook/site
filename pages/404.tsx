import React from "react"
import { ErrorPage } from "../common/ErrorPage"

export default function NotFound() {
  return <ErrorPage statusCode={404} />
}
