const villageThemes = [
  {
    keywords: ['akatsuki'],
    name: 'Akatsuki',
    symbol: '暁',
    color: '#EF4444',
    rgb: '239, 68, 68',
  },
  {
    keywords: ['konohagakure', 'hidden leaf', 'konoha'],
    name: 'Konohagakure',
    symbol: '火',
    color: '#F97316',
    rgb: '249, 115, 22',
  },
  {
    keywords: ['sunagakure', 'hidden sand', 'suna'],
    name: 'Sunagakure',
    symbol: '風',
    color: '#EAB308',
    rgb: '234, 179, 8',
  },
  {
    keywords: ['kirigakure', 'hidden mist', 'kiri'],
    name: 'Kirigakure',
    symbol: '水',
    color: '#38BDF8',
    rgb: '56, 189, 248',
  },
  {
    keywords: ['kumogakure', 'hidden cloud', 'kumo'],
    name: 'Kumogakure',
    symbol: '雷',
    color: '#A855F7',
    rgb: '168, 85, 247',
  },
  {
    keywords: ['iwagakure', 'hidden stone', 'iwa'],
    name: 'Iwagakure',
    symbol: '土',
    color: '#B77945',
    rgb: '183, 121, 69',
  },
]

const defaultTheme = {
  name: 'Independent Shinobi',
  symbol: '忍',
  color: '#94A3B8',
  rgb: '148, 163, 184',
}

export function getVillageTheme(character) {
  const affiliation = character.personal?.affiliation

  const affiliations = Array.isArray(affiliation)
    ? affiliation
    : [affiliation]

  const names = affiliations
    .filter(Boolean)
    .map((name) => String(name).toLowerCase())

  return (
    villageThemes.find((theme) =>
      theme.keywords.some((keyword) =>
        names.some((name) => name.includes(keyword))
      )
    ) ?? defaultTheme
  )
}