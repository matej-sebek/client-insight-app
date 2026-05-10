const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"

export async function request<TResponse>(
  path: string,
  options: RequestInit = {}
): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  })

  const data = await response.json()

  if (!response.ok) {
    throw data
  }

  return data as TResponse
}
