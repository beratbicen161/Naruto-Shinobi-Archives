const BASE_URL = 'https://dattebayo-api.onrender.com'

async function request(endpoint, signal) {
  const response = await fetch(
    `${BASE_URL}${endpoint}`,
    { signal }
  )

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status}`
    )
  }

  return response.json()
}

export function getCharacters(
  page = 1,
  limit = 20,
  name = '',
  signal
) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  })

  if (name.trim()) {
    params.set('name', name.trim())
  }

  return request(
    `/characters?${params.toString()}`,
    signal
  )
}

export function getCharacterById(id, signal) {
  return request(
    `/characters/${encodeURIComponent(id)}`,
    signal
  )
}

export function getClans(
  page = 1,
  limit = 20,
  name = '',
  signal
) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  })

  if (name.trim()) {
    params.set('name', name.trim())
  }

  return request(
    `/clans?${params.toString()}`,
    signal
  )
}

export function getClanById(id, signal) {
  return request(
    `/clans/${encodeURIComponent(id)}`,
    signal
  )
}

export function getVillages(
  page = 1,
  limit = 20,
  name = '',
  signal
) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  })

  if (name.trim()) {
    params.set('name', name.trim())
  }

  return request(
    `/villages?${params.toString()}`,
    signal
  )
}

export function getVillageById(id, signal) {
  return request(
    `/villages/${encodeURIComponent(id)}`,
    signal
  )
}