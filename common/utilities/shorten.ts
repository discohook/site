export type ShortenResponse = {
  id: string
  url: string
  expires: Date
}

export const shorten = async (url: string) => {
  const response = await fetch("https://share.discohook.app/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  })

  if (!response.ok) throw new Error("Could not get short URL.")

  const data = await response.json()

  return {
    ...data,
    expires: new Date(data.expires),
  } as ShortenResponse
}
