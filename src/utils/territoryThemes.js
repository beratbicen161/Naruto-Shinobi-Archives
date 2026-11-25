const territoryThemes = {
  0: {
    symbol: '雨',
    color: '#416C75',
    territory: 'Land of Rain',
  },
  1: {
    symbol: '竹',
    color: '#52734D',
  },
  2: {
    symbol: '陶',
    color: '#A16D48',
  },
  3: {
    symbol: '幕',
    color: '#75647F',
  },
  4: {
    symbol: '橙',
    color: '#B66B32',
  },
  5: {
    symbol: '幻',
    color: '#77548D',
  },
  6: {
    symbol: '波',
    color: '#477C91',
  },
  7: {
    symbol: '星',
    color: '#8260A3',
  },
  8: {
    symbol: '狼',
    color: '#666B70',
  },
  9: {
    symbol: '稲',
    color: '#A08A42',
  },
  10: {
    symbol: '石',
    color: '#77716A',
  },
  11: {
    symbol: '岩',
    color: '#795039',
    territory: 'Land of Earth',
  },
  12: {
    symbol: '鍵',
    color: '#706B80',
  },
  13: {
    symbol: '陽',
    color: '#AE7138',
  },
  14: {
    symbol: '霧',
    color: '#35677A',
    territory: 'Land of Water',
  },
  15: {
    symbol: '月',
    color: '#72638B',
  },
  16: {
    symbol: '火',
    color: '#963B25',
    territory: 'Land of Fire',
  },
  17: {
    symbol: '雷',
    color: '#675083',
    territory: 'Land of Lightning',
  },
  18: {
    symbol: '草',
    color: '#55734A',
  },
  19: {
    symbol: '山',
    color: '#80664B',
  },
  20: {
    symbol: '蛙',
    color: '#668044',
  },
  21: {
    symbol: '花',
    color: '#A85D79',
  },
  22: {
    symbol: '音',
    color: '#75518A',
  },
  23: {
    symbol: '蛇',
    color: '#657342',
  },
  24: {
    symbol: '楽',
    color: '#9B8049',
  },
  25: {
    symbol: '森',
    color: '#42664E',
  },
  26: {
    symbol: '霜',
    color: '#65889B',
  },
  27: {
    symbol: '杉',
    color: '#4E7049',
  },
  28: {
    symbol: '砂',
    color: '#947021',
    territory: 'Land of Wind',
  },
  29: {
    symbol: '滝',
    color: '#387D91',
  },
  30: {
    symbol: '匠',
    color: '#766653',
  },
  31: {
    symbol: '谷',
    color: '#6B7850',
  },
  32: {
    symbol: '里',
    color: '#A46F4B',
  },
  33: {
    symbol: '蜘蛛',
    color: '#78565A',
  },
  34: {
    symbol: '月',
    color: '#687B9A',
  },
  35: {
    symbol: '渦',
    color: '#A64B36',
  },
  36: {
    symbol: '湯',
    color: '#53847D',
  },
  37: {
    symbol: '雪',
    color: '#608CA5',
  },
  38: {
    symbol: '夢',
    color: '#85639C',
  },
}

const defaultTheme = {
  symbol: '里',
  color: '#795A36',
  territory: 'Shinobi Territory',
}

export function getTerritoryTheme(village) {
  return {
    ...defaultTheme,
    ...territoryThemes[village?.id],
  }
}