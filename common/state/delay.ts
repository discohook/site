export const delay = async (ms: number) =>
  new Promise(resolve => {
    setTimeout(resolve, ms)
  })
