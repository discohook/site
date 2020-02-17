import { Middleware } from "koa"

const middleware: Middleware = async (context, next) => {
  try {
    await next()
  } catch (error) {
    console.error(error)

    context.status = 500
    context.body = "Internal server error"
  }
}

export const logErrors = () => middleware
