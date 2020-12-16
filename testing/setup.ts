import "@testing-library/jest-dom/extend-expect"
import "fake-indexeddb/auto"
import { useStaticRendering } from "mobx-react-lite"

// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(true)
