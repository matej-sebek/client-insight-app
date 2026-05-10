import { request } from "@/api/http"
import type { Client, ClientDtoIn } from "@/types/client"

export function getClients() {
  return request<Client[]>("/clients")
}

export function getClient(id: string) {
  return request<Client>(`/clients/${id}`)
}

export function createClient(data: ClientDtoIn) {
  return request<Client>("/clients", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export function updateClient(id: string, data: ClientDtoIn) {
  return request<Client>(`/clients/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export function deleteClient(id: string) {
  return request<{ message: string }>(`/clients/${id}`, {
    method: "DELETE",
  })
}
