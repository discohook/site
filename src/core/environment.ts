export const DEV = process.env.NODE_ENV === "development"
export const PROD = process.env.NODE_ENV === "production"
export const TEST = process.env.NODE_ENV === "test"

export const SERVER = TEST || Boolean(process.env.SERVER)
