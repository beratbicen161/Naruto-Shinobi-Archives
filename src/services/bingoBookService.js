import { getCharacters } from './api'

const characterCache = new Map()

function normalizeName(name) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export async function getBingoCharacter(name, signal) {
  const normalizedName = normalizeName(name)

  if (characterCache.has(normalizedName)) {
    return characterCache.get(normalizedName)
  }

  const searchNames = [
    ...new Set([name, normalizedName]),
  ]

  for (const searchName of searchNames) {
    const data = await getCharacters(
      1,
      100,
      searchName,
      signal
    )

    const character = (data.characters ?? []).find(
      (item) =>
        normalizeName(item.name) === normalizedName
    )

    if (character) {
      characterCache.set(normalizedName, character)
      return character
    }
  }

  return null
}