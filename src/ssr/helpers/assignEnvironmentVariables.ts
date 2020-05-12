export const assignEnvironmentVariables = () => {
  const ENV = process.env.NODE_ENV ?? "production"

  return Object.assign(global, {
    ENV,
    PROD: ENV === "production",
    DEV: ENV === "development",
    TEST: ENV === "test",
    SERVER: true,
  })
}
