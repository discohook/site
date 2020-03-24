/* eslint-disable @typescript-eslint/naming-convention */

export const assignEnvironmentVariables = () =>
  Object.assign(global, {
    ENV: process.env.NODE_ENV ?? "production",
    PROD: process.env.NODE_ENV === "production",
    DEV: process.env.NODE_ENV === "development",
    TEST: process.env.NODE_ENV === "test",
    SERVER: true,
  })
