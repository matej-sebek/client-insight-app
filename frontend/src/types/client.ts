export type Client = {
  id: string
  name: string
  industry: string
  web: string
  note: string
  createdAt: string
}

export type ClientDtoIn = {
  name: string
  industry?: string
  web?: string
  note?: string
}
