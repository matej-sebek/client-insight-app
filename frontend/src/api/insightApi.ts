import { request } from "@/api/http"
import type { Insight, InsightDtoIn, InsightFilters } from "@/types/insight"

export function getInsightsByClient(clientId: string, filters: InsightFilters = {}) {
  const params = new URLSearchParams()

  if (filters.category) {
    params.set("category", filters.category)
  }

  if (filters.search) {
    params.set("search", filters.search)
  }

  const query = params.toString()
  return request<Insight[]>(`/clients/${clientId}/insights${query ? `?${query}` : ""}`)
}

export function createInsight(clientId: string, data: InsightDtoIn) {
  return request<Insight>(`/clients/${clientId}/insights`, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export function getInsight(id: string) {
  return request<Insight>(`/insights/${id}`)
}

export function updateInsight(id: string, data: InsightDtoIn) {
  return request<Insight>(`/insights/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export function deleteInsight(id: string) {
  return request<{ message: string }>(`/insights/${id}`, {
    method: "DELETE",
  })
}
