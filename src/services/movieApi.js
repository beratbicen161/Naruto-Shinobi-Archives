
const BASE_URL = 'https://kitsu.io/api/edge'

const movieKitsuIds = {
  1: '405',
  2: '833',
  3: '1941',
  4: '2245',
  5: '3606',
  6: '4520',
  7: '5266',
  8: '6256',
  9: '7008',
}

let movieCache = null

export async function getNarutoMovies(signal) {
  if (movieCache) {
    return movieCache
  }

  const params = new URLSearchParams({
    'filter[text]': 'naruto',
    'filter[subtype]': 'movie',
    'page[limit]': '20',
  })

  let nextUrl = `${BASE_URL}/anime?${params}`

  const allMovies = []

  while (nextUrl) {
    const response = await fetch(nextUrl, { signal })

    if (!response.ok) {
      throw new Error(
        `Movie API request failed: ${response.status}`
      )
    }

    const result = await response.json()

    allMovies.push(...result.data)

    nextUrl = result.links?.next || null
  }

  const movies = {}

  function formatMovie(movie) {
    const attributes = movie.attributes

    return {
      kitsuId: movie.id,
      image:
        attributes.posterImage?.large ||
        attributes.posterImage?.original ||
        attributes.posterImage?.medium ||
        null,
      score: attributes.averageRating
        ? Number(attributes.averageRating) / 10
        : null,
      duration: attributes.episodeLength
        ? `${attributes.episodeLength} min`
        : null,
      synopsis: attributes.synopsis,
      rating: attributes.ageRating,
      releaseDate: attributes.startDate,
      url: `https://kitsu.io/anime/${attributes.slug}`,
    }
  }

  Object.entries(movieKitsuIds).forEach(([id, kitsuId]) => {
    const movie = allMovies.find(
      item => item.id === kitsuId
    )

    if (movie) {
      movies[id] = formatMovie(movie)
    }
  })

  const lastMovie = allMovies.find(movie => {
    const attributes = movie.attributes

    const titles = [
      attributes.canonicalTitle,
      ...Object.values(attributes.titles || {}),
    ]

    return (
      attributes.startDate?.startsWith('2014') &&
      titles.some(title =>
        title?.toLowerCase().includes('the last')
      )
    )
  })

  if (lastMovie) {
    movies[10] = formatMovie(lastMovie)
  }

  if (Object.keys(movies).length === 10) {
    movieCache = movies
  }

  return movies
}
