const excludedCharacters = new Set([
  'boruto uzumaki',
  'sarada uchiha',
  'mitsuki',
  'kawaki',
  'himawari uzumaki',
])

function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function isNarutoCharacter(character) {
  const name = normalize(character.name)
  const anime = normalize(character.debut?.anime)
  const manga = normalize(character.debut?.manga)
  const movie = normalize(character.debut?.movie)
  const novel = normalize(character.debut?.novel)

  if (excludedCharacters.has(name)) {
    return false
  }

  if (anime.includes('boruto')) {
    return false
  }

  if (manga.includes('boruto')) {
    return false
  }

  if (movie.includes('boruto')) {
    return false
  }

  if (novel.includes('boruto')) {
    return false
  }

  return true
}