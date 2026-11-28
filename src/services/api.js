import { isNarutoCharacter } from '../data/characterScope'

const BASE_URL = 'https://dattebayo-api.onrender.com'

let characterCache = null
let characterRequest = null

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

function normalizeName(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

async function loadAllCharacters() {
  const characters = []
  const seenIds = new Set()

  let page = 1
  const limit = 100

  while (true) {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    })

    const data = await request(
      `/characters?${params.toString()}`
    )

    const results = data.characters || []

    if (results.length === 0) {
      break
    }

    let addedCount = 0

    for (const character of results) {
      if (!seenIds.has(character.id)) {
        seenIds.add(character.id)
        characters.push(character)
        addedCount++
      }
    }

    if (addedCount === 0) {
      break
    }

    if (
      Number.isFinite(data.total) &&
      characters.length >= data.total
    ) {
      break
    }

    page++
  }

  return characters.filter(isNarutoCharacter)
}

async function getFilteredCharacters() {
  if (characterCache !== null) {
    return characterCache
  }

  if (!characterRequest) {
    characterRequest = loadAllCharacters()
      .then(characters => {
        characterCache = characters
        return characters
      })
      .finally(() => {
        characterRequest = null
      })
  }

  return characterRequest
}

function checkAbort(signal) {
  if (signal?.aborted) {
    throw new DOMException(
      'Request aborted',
      'AbortError'
    )
  }
}

export async function getCharacters(
  page = 1,
  limit = 20,
  name = '',
  signal
) {
  checkAbort(signal)

  const characters = await getFilteredCharacters()

  checkAbort(signal)

  const searchTerm = normalizeName(name)

  const filteredCharacters = searchTerm
    ? characters.filter(character =>
        normalizeName(character.name)
          .includes(searchTerm)
      )
    : characters

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  return {
    characters: filteredCharacters.slice(
      startIndex,
      endIndex
    ),
    currentPage: page,
    pageSize: limit,
    total: filteredCharacters.length,
  }
}

export async function getCharacterById(id, signal) {
  const character = await request(
    `/characters/${encodeURIComponent(id)}`,
    signal
  )

  if (!isNarutoCharacter(character)) {
    throw new Error(
      'This character is outside the Naruto and Naruto Shippuden archive.'
    )
  }

  return character
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