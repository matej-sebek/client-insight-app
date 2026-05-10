export type Insight = {
  id: string
  clientId: string
  title: string
  description: string
  category: string
  createdAt: string
}

export type InsightDtoIn = {
  title: string
  description: string
  category: string
}

export type InsightFilters = {
  category?: string
  search?: string
}
