
import { useEffect, useState } from 'react'
import { watchMovies, watchSeries } from '../data/watchGuide'
import { getNarutoMovies } from '../services/movieApi'

const seriesFilters = [
  { id: 'all', label: 'All Movies' },
  { id: 'naruto', label: 'Naruto' },
  { id: 'shippuden', label: 'Naruto Shippuden' },
]

const canonFilters = [
  { id: 'all', label: 'All Types' },
  { id: 'canon', label: 'Canon' },
  { id: 'non-canon', label: 'Non-canon' },
]

function MovieCard({ movie, apiMovie, loading }) {
  const [failedImage, setFailedImage] = useState(null)

  const series = watchSeries.find(
    item => item.id === movie.seriesId
  )

  const image = apiMovie?.image

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-orange-500/20 bg-(--page-bg) transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/70 hover:shadow-[0_0_25px_rgba(249,115,22,0.15)]">

      <div className="relative h-[300px] overflow-hidden bg-[#15191F]">

        {loading ? (

          <div className="flex h-full animate-pulse flex-col items-center justify-center bg-[#303844]">

            <span className="text-7xl text-orange-500/30">
              映
            </span>

            <p className="mt-4 text-xs tracking-widest text-orange-400">
              LOADING POSTER
            </p>

          </div>

        ) : image && failedImage !== image ? (

          <img
            src={image}
            alt={`${movie.title} poster`}
            loading="lazy"
            onError={() => setFailedImage(image)}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />

        ) : (

          <div className="flex h-full flex-col items-center justify-center bg-linear-to-br from-[#15191F] via-[#303844] to-[#442718]">

            <span className="text-8xl text-orange-500/30">
              映
            </span>

            <p className="mt-4 text-xs tracking-widest text-orange-400">
              SHINOBI CINEMA
            </p>

          </div>

        )}

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-black/30" />

        <div className="absolute left-3 top-3 flex size-9 items-center justify-center rounded-lg border border-orange-500/50 bg-black/70 text-xs font-bold text-orange-400 backdrop-blur-md">
          {String(movie.id).padStart(2, '0')}
        </div>

        <div className={`absolute right-3 top-3 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
          movie.canon
            ? 'border-green-500/50 bg-green-950/80 text-green-400'
            : 'border-yellow-500/50 bg-black/70 text-yellow-400'
        }`}>
          {movie.canon ? 'Canon' : 'Non-canon'}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">

          <p className="text-xs font-bold tracking-widest text-orange-400">
            {movie.year}
          </p>

          <h4 className="mt-2 text-sm leading-relaxed text-white md:text-base">
            {movie.title}
          </h4>

        </div>

      </div>

      <div className="flex flex-1 flex-col p-4">

        <p className="text-xs font-bold uppercase tracking-widest text-(--accent)">
          {series?.title}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">

          <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3 text-center">

            <p className="text-[10px] text-(--text-secondary)">
              Kitsu Rating
            </p>

            <p className="mt-2 text-sm font-bold text-yellow-500">
              ★ {apiMovie?.score != null
                ? `${apiMovie.score.toFixed(1)}/10`
                : '—'}
            </p>

          </div>

          <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-3 text-center">

            <p className="text-[10px] text-(--text-secondary)">
              Duration
            </p>

            <p className="mt-2 text-sm font-bold text-(--accent)">
              {apiMovie?.duration || '—'}
            </p>

          </div>

        </div>

        <div className="my-4 h-px bg-linear-to-r from-orange-500/40 to-transparent" />

        <p className="text-[10px] font-semibold text-(--text-secondary)">
          RECOMMENDED WATCHING POINT
        </p>

        <div className="mt-3 rounded-lg border border-orange-500/30 bg-orange-500/5 p-3">

          <p className="text-xs text-(--text-secondary)">
            Watch after
          </p>

          <p className="mt-1 text-lg font-bold text-(--accent)">
            Episode {movie.afterEpisode}
          </p>

        </div>

        <p className={`mt-4 text-xs leading-6 ${
          movie.canon
            ? 'text-green-500'
            : 'text-(--text-secondary)'
        }`}>
          {movie.canon
            ? 'Recommended as part of the main story.'
            : 'Optional movie. Enjoy as an additional adventure.'}
        </p>

        {apiMovie?.url && (

          <a
            href={apiMovie.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto pt-4 text-center"
          >

            <span className="block rounded-lg border border-orange-500/30 px-3 py-3 text-[10px] font-bold tracking-wider text-(--accent) transition-all duration-300 hover:border-orange-500 hover:bg-orange-600 hover:text-white">
              VIEW ON KITSU ↗
            </span>

          </a>

        )}

      </div>

    </article>
  )
}

function MovieGuide() {
  const [seriesFilter, setSeriesFilter] = useState('all')
  const [canonFilter, setCanonFilter] = useState('all')
  const [search, setSearch] = useState('')

  const [apiMovies, setApiMovies] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadMovies() {
      setLoading(true)
      setError('')

      try {
        const movies = await getNarutoMovies(
          controller.signal
        )

        if (controller.signal.aborted) return

        setApiMovies(movies)

        if (Object.keys(movies).length < watchMovies.length) {
          setError(
            'Some movie information could not be retrieved.'
          )
        }

      } catch (err) {
        if (controller.signal.aborted) return

        setError(
          'Movie information could not be loaded. Please try again.'
        )

      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadMovies()

    return () => controller.abort()
  }, [retryCount])

  const filteredMovies = watchMovies.filter(movie => {
    const matchesSeries =
      seriesFilter === 'all' ||
      movie.seriesId === seriesFilter

    const matchesCanon =
      canonFilter === 'all' ||
      (canonFilter === 'canon' && movie.canon) ||
      (canonFilter === 'non-canon' && !movie.canon)

    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.trim().toLowerCase())

    return matchesSeries && matchesCanon && matchesSearch
  })

  function resetFilters() {
    setSeriesFilter('all')
    setCanonFilter('all')
    setSearch('')
  }

  function filterStyle(isActive) {
    return `rounded-lg border px-4 py-3 text-xs font-semibold transition-all duration-300 ${
      isActive
        ? 'border-orange-500 bg-orange-600 text-white'
        : 'border-orange-500/20 bg-(--page-bg) text-(--text-secondary) hover:border-orange-500'
    }`
  }

  return (
    <div className="mx-auto w-full max-w-6xl">

      <header className="mb-10 text-center">

        <p className="mb-3 text-xs font-bold tracking-[0.3em] text-(--accent)">
          SHINOBI CINEMA ARCHIVES
        </p>

        <h3 className="text-2xl md:text-4xl">
          THE MOVIE COLLECTION
        </h3>

        <p className="mt-4 text-2xl text-(--accent)">
          映画
        </p>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-(--text-secondary)">
          Discover ten cinematic adventures from the
          Naruto universe. Explore their release dates,
          canon status and recommended watching points.
        </p>

      </header>

      <div className="grid grid-cols-3 gap-3">

        <div className="rounded-xl border border-orange-500/30 bg-(--page-bg) p-4 text-center">

          <p className="text-3xl font-bold text-(--accent)">
            {watchMovies.length}
          </p>

          <p className="mt-2 text-xs text-(--text-secondary)">
            Total Movies
          </p>

        </div>

        <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-4 text-center">

          <p className="text-3xl font-bold text-green-500">
            {watchMovies.filter(movie => movie.canon).length}
          </p>

          <p className="mt-2 text-xs text-(--text-secondary)">
            Canon
          </p>

        </div>

        <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4 text-center">

          <p className="text-3xl font-bold text-yellow-500">
            {watchMovies.filter(movie => !movie.canon).length}
          </p>

          <p className="mt-2 text-xs text-(--text-secondary)">
            Non-canon
          </p>

        </div>

      </div>

      {loading && (

        <div
          role="status"
          className="mt-6 flex items-center justify-center gap-3 rounded-xl border border-orange-500/20 bg-orange-500/5 p-4"
        >

          <span className="size-5 animate-spin rounded-full border-2 border-orange-500/20 border-t-orange-500" />

          <p className="text-sm text-(--accent)">
            Retrieving movie information from Kitsu...
          </p>

        </div>

      )}

      {error && !loading && (

        <div
          role="alert"
          className="mt-6 rounded-xl border border-red-500/30 bg-red-500/5 p-5 text-center"
        >

          <p className="text-sm text-red-500">
            {error}
          </p>

          <button
            type="button"
            onClick={() => setRetryCount(count => count + 1)}
            className="mt-4 rounded-lg border border-orange-500/30 bg-orange-600 px-5 py-2 text-xs font-bold text-white hover:bg-orange-500"
          >
            Retry
          </button>

        </div>

      )}

      <section className="mt-8 rounded-xl border border-orange-500/20 bg-(--page-bg) p-5">

        <div className="flex flex-wrap items-center justify-between gap-3">

          <h4 className="text-lg">
            EXPLORE MOVIES
          </h4>

          <button
            type="button"
            onClick={resetFilters}
            className="rounded-lg border border-orange-500/30 px-4 py-2 text-xs font-semibold text-(--accent) hover:bg-orange-500/10"
          >
            Reset Filters
          </button>

        </div>

        <input
          type="search"
          value={search}
          onChange={event => setSearch(event.target.value)}
          aria-label="Search movies"
          placeholder="Search movie title..."
          className="mt-5 w-full rounded-xl border border-orange-500/30 bg-(--card-bg) px-5 py-4 text-sm text-(--text-primary) outline-none placeholder:text-(--text-secondary) focus:border-orange-500"
        />

        <p className="mb-3 mt-6 text-xs font-bold tracking-widest text-(--accent)">
          ANIME SERIES
        </p>

        <div className="flex flex-wrap gap-2">

          {seriesFilters.map(filter => (
            <button
              key={filter.id}
              type="button"
              aria-pressed={seriesFilter === filter.id}
              onClick={() => setSeriesFilter(filter.id)}
              className={filterStyle(seriesFilter === filter.id)}
            >
              {filter.label}
            </button>
          ))}

        </div>

        <p className="mb-3 mt-6 text-xs font-bold tracking-widest text-(--accent)">
          MOVIE TYPE
        </p>

        <div className="flex flex-wrap gap-2">

          {canonFilters.map(filter => (
            <button
              key={filter.id}
              type="button"
              aria-pressed={canonFilter === filter.id}
              onClick={() => setCanonFilter(filter.id)}
              className={filterStyle(canonFilter === filter.id)}
            >
              {filter.label}
            </button>
          ))}

        </div>

      </section>

      <div className="my-6 flex flex-wrap items-center justify-between gap-3">

        <p className="text-sm text-(--text-secondary)">
          Showing {filteredMovies.length} of{' '}
          {watchMovies.length} movies
        </p>

        <p className="text-xs text-(--accent)">
          Release Order
        </p>

      </div>

      {filteredMovies.length > 0 ? (

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {filteredMovies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              apiMovie={apiMovies[movie.id]}
              loading={loading}
            />
          ))}

        </div>

      ) : (

        <div className="rounded-xl border border-dashed border-orange-500/30 bg-(--page-bg) px-6 py-16 text-center">

          <p className="text-5xl text-orange-500/50">
            映
          </p>

          <h4 className="mt-5 text-xl">
            NO MOVIES FOUND
          </h4>

          <p className="mt-3 text-sm text-(--text-secondary)">
            Try another movie title or change your filters.
          </p>

          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-500"
          >
            Clear Filters
          </button>

        </div>

      )}

      <div className="mt-10 rounded-xl border border-orange-500/30 bg-orange-500/5 p-6 text-center">

        <p className="text-3xl text-(--accent)">
          巻
        </p>

        <h4 className="mt-4 text-xl">
          A NOTE FOR EVERY SHINOBI
        </h4>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-(--text-secondary)">
          Most Naruto movies are optional adventures.
          The Last: Naruto the Movie is connected to
          the main storyline. Movie placements are
          suggested viewing points rather than an
          official chronological timeline.
        </p>

      </div>

      <footer className="mt-8 text-center">

        <p className="text-xs tracking-wider text-(--text-secondary)">
          Movie posters and information provided by{' '}

          <a
            href="https://kitsu.io"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-(--accent) hover:underline"
          >
            Kitsu API
          </a>

        </p>

      </footer>

    </div>
  )
}

export default MovieGuide
