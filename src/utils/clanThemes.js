const clanThemes = [
  {
    name: 'Uchiha',
    symbol: '火',
    color: '#EF4444',
    rgb: '239, 68, 68',
  },
  {
    name: 'Uzumaki',
    symbol: '渦',
    color: '#F97316',
    rgb: '249, 115, 22',
  },
  {
    name: 'Hyuga',
    symbol: '白',
    color: '#A78BFA',
    rgb: '167, 139, 250',
  },
  {
    name: 'Senju',
    symbol: '森',
    color: '#22C55E',
    rgb: '34, 197, 94',
  },
  {
    name: 'Nara',
    symbol: '影',
    color: '#818CF8',
    rgb: '129, 140, 248',
  },
  {
    name: 'Akimichi',
    symbol: '蝶',
    color: '#EAB308',
    rgb: '234, 179, 8',
  },
  {
    name: 'Yamanaka',
    symbol: '心',
    color: '#F472B6',
    rgb: '244, 114, 182',
  },
  {
    name: 'Aburame',
    symbol: '虫',
    color: '#84CC16',
    rgb: '132, 204, 22',
  },
  {
    name: 'Inuzuka',
    symbol: '牙',
    color: '#F87171',
    rgb: '248, 113, 113',
  },
  {
    name: 'Sarutobi',
    symbol: '猿',
    color: '#D97706',
    rgb: '217, 119, 6',
  },
  {
    name: 'Kaguya',
    symbol: '骨',
    color: '#CBD5E1',
    rgb: '203, 213, 225',
  },
  {
    name: 'Hozuki',
    symbol: '水',
    color: '#38BDF8',
    rgb: '56, 189, 248',
  },
  {
    name: 'Hatake',
    symbol: '雷',
    color: '#60A5FA',
    rgb: '96, 165, 250',
  },
  {
    name: 'Hoshigaki',
    symbol: '鮫',
    color: '#06B6D4',
    rgb: '6, 182, 212',
  },
  {
    name: 'Otsutsuki',
    symbol: '月',
    color: '#E2E8F0',
    rgb: '226, 232, 240',
  },
  {
    name: 'Kurama',
    symbol: '幻',
    color: '#C084FC',
    rgb: '192, 132, 252',
  },
]

const defaultTheme = {
  symbol: '族',
  color: '#94A3B8',
  rgb: '148, 163, 184',
}

function normalizeName(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function getClanTheme(clan) {
  const clanName = normalizeName(clan?.name)

  return (
    clanThemes.find((theme) =>
      clanName.split(/\s+/).includes(
        normalizeName(theme.name)
      )
    ) ?? defaultTheme
  )
}