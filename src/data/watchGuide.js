
function expandRanges(ranges) {
  return ranges.flatMap(range => {
    if (typeof range === 'number') {
      return [range]
    }

    const [start, end] = range

    return Array.from(
      { length: end - start + 1 },
      (_, index) => start + index
    )
  })
}

const narutoFiller = expandRanges([
  26,
  97,
  [101, 106],
  [136, 140],
  [143, 219],
])

const narutoMixed = expandRanges([
  7,
  9,
  [14, 16],
  [18, 21],
  [23, 24],
  [27, 30],
  [37, 41],
  [43, 47],
  49,
  [52, 60],
  63,
  66,
  [69, 72],
  74,
  83,
  [98, 100],
  [112, 114],
  [126, 127],
  [130, 131],
  [141, 142],
  220,
])

const shippudenFiller = expandRanges([
  [57, 71],
  [91, 112],
  [144, 151],
  [170, 171],
  [176, 196],
  [223, 242],
  [257, 260],
  271,
  [279, 281],
  [284, 295],
  [303, 320],
  [347, 361],
  [376, 377],
  [388, 390],
  [394, 413],
  [416, 417],
  [422, 423],
  [427, 450],
  [464, 468],
  [480, 483],
])

const shippudenMixed = expandRanges([
  [1, 19],
  [24, 25],
  45,
  [49, 50],
  54,
  56,
  [89, 90],
  113,
  115,
  [127, 128],
  213,
  254,
  296,
  324,
  [327, 328],
  [330, 331],
  338,
  346,
  362,
  [385, 386],
  415,
  419,
  426,
  [451, 458],
  [460, 462],
  469,
  [471, 472],
  [478, 479],
])

function createEpisodes(
  seriesId,
  total,
  filler,
  mixed,
  animeCanon = []
) {
  return Array.from({ length: total }, (_, index) => {
    const number = index + 1

    let type = 'canon'

    if (filler.includes(number)) {
      type = 'filler'
    } else if (mixed.includes(number)) {
      type = 'mixed'
    } else if (animeCanon.includes(number)) {
      type = 'anime-canon'
    }

    return {
      id: `${seriesId}-${number}`,
      seriesId,
      number,
      type,
    }
  })
}

export const watchSeries = [
  {
    id: 'naruto',
    title: 'Naruto',
    japaneseTitle: 'ナルト',
    years: '2002 – 2007',
    totalEpisodes: 220,
    description:
      'Begin your journey with Naruto Uzumaki and discover the world of shinobi.',
    episodes: createEpisodes(
      'naruto',
      220,
      narutoFiller,
      narutoMixed
    ),
  },
  {
    id: 'shippuden',
    title: 'Naruto Shippuden',
    japaneseTitle: 'ナルト 疾風伝',
    years: '2007 – 2017',
    totalEpisodes: 500,
    description:
      'Continue the journey as Naruto returns to the Hidden Leaf Village.',
    episodes: createEpisodes(
      'shippuden',
      500,
      shippudenFiller,
      shippudenMixed,
      [28]
    ),
  },
]

export const episodeTypes = [
  {
    id: 'canon',
    label: 'Canon',
    description:
      'Episodes that follow the main story and should be watched.',
    recommendation: 'Watch',
    color: 'green',
  },
  {
    id: 'filler',
    label: 'Filler',
    description:
      'Anime-original side stories that can generally be skipped without missing the main plot.',
    recommendation: 'Optional',
    color: 'red',
  },
  {
    id: 'mixed',
    label: 'Mixed',
    description:
      'Episodes containing both canon story and anime-original scenes.',
    recommendation: 'Watch',
    color: 'amber',
  },
  {
    id: 'anime-canon',
    label: 'Anime Canon',
    description:
      'Anime-original material classified as part of the anime continuity.',
    recommendation: 'Watch',
    color: 'blue',
  },
]

export const watchMovies = [
  {
    id: 1,
    title: 'Ninja Clash in the Land of Snow',
    year: 2004,
    seriesId: 'naruto',
    afterEpisode: 101,
    canon: false,
  },
  {
    id: 2,
    title: 'Legend of the Stone of Gelel',
    year: 2005,
    seriesId: 'naruto',
    afterEpisode: 160,
    canon: false,
  },
  {
    id: 3,
    title: 'Guardians of the Crescent Moon Kingdom',
    year: 2006,
    seriesId: 'naruto',
    afterEpisode: 196,
    canon: false,
  },
  {
    id: 4,
    title: 'Naruto Shippuden the Movie',
    year: 2007,
    seriesId: 'shippuden',
    afterEpisode: 32,
    canon: false,
  },
  {
    id: 5,
    title: 'Naruto Shippuden the Movie: Bonds',
    year: 2008,
    seriesId: 'shippuden',
    afterEpisode: 53,
    canon: false,
  },
  {
    id: 6,
    title: 'Naruto Shippuden the Movie: The Will of Fire',
    year: 2009,
    seriesId: 'shippuden',
    afterEpisode: 196,
    canon: false,
  },
  {
    id: 7,
    title: 'Naruto Shippuden the Movie: The Lost Tower',
    year: 2010,
    seriesId: 'shippuden',
    afterEpisode: 135,
    canon: false,
  },
  {
    id: 8,
    title: 'Naruto Shippuden the Movie: Blood Prison',
    year: 2011,
    seriesId: 'shippuden',
    afterEpisode: 176,
    canon: false,
  },
  {
    id: 9,
    title: 'Road to Ninja: Naruto the Movie',
    year: 2012,
    seriesId: 'shippuden',
    afterEpisode: 311,
    canon: false,
  },
  {
    id: 10,
    title: 'The Last: Naruto the Movie',
    year: 2014,
    seriesId: 'shippuden',
    afterEpisode: 493,
    canon: true,
  },
]

export const allEpisodes = watchSeries.flatMap(
  series => series.episodes
)

export const watchStatistics = {
  totalEpisodes: allEpisodes.length,
  totalMovies: watchMovies.length,
  totalSeries: watchSeries.length,

  canon: allEpisodes.filter(
    episode => episode.type === 'canon'
  ).length,

  filler: allEpisodes.filter(
    episode => episode.type === 'filler'
  ).length,

  mixed: allEpisodes.filter(
    episode => episode.type === 'mixed'
  ).length,

  animeCanon: allEpisodes.filter(
    episode => episode.type === 'anime-canon'
  ).length,
}

export const watchGuideSources = [
  {
    title: 'Naruto Episode Classification',
    url: 'https://www.animefillerlist.com/shows/naruto',
  },
  {
    title: 'Naruto Shippuden Episode Classification',
    url: 'https://www.animefillerlist.com/shows/naruto-shippuden',
  },
  {
    title: 'Suggested Movie Watch Order',
    url: 'https://docs.jonasbirkelof.se/media/naruto-movies-episodes/',
  },
]
