
import { useEffect, useState } from 'react'

const PAGE_SIZE = 20

function CharacterImage({ character }) {
  const images = character.images ?? []

  const imageSources =
    character.name === 'Jiraiya'
      ? [images[1], images[0]].filter(Boolean)
      : images.filter(Boolean)

  const [imageIndex, setImageIndex] = useState(0)
  const currentImage = imageSources[imageIndex]

  return (
    <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#20252D]">
      {currentImage ? (
        <img
          src={currentImage}
          alt={character.name}
          loading="lazy"
          onError={() => setImageIndex((index) => index + 1)}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <span className="text-6xl text-orange-400/40">
          忍
        </span>
      )}
    </div>
  )
}

function LoadingScreen() {
  return (
    <div
      role="status"
      className="flex min-h-[350px] flex-col items-center justify-center"
    >
      <div className="relative flex h-28 w-28 items-center justify-center">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-orange-500/15 border-t-orange-500 border-r-orange-400 shadow-[0_0_30px_rgba(249,115,22,0.2)]" />

        <div className="absolute inset-4 animate-pulse rounded-full border-2 border-orange-400/50" />

        <span className="text-4xl font-bold text-orange-400">
          忍
        </span>
      </div>

      <h2 className="mt-8 text-xl font-bold text-[#F1E3C6]">
        Searching the Shinobi Archives
      </h2>

      <p className="mt-3 text-sm text-gray-400">
        Gathering classified ninja records...
      </p>
    </div>
  )
}

function ErrorScreen({ message, onRetry }) {
  return (
    <div
      role="alert"
      className="mx-auto flex min-h-[350px] max-w-xl flex-col items-center justify-center rounded-2xl border border-red-900/40 bg-[#252A33] px-6 py-12 text-center"
    >
      <span className="text-6xl text-red-400">
        封
      </span>

      <h2 className="mt-6 text-2xl font-bold text-[#F1E3C6]">
        Archive Connection Lost
      </h2>

      <p className="mt-4 text-gray-400">
        The shinobi records are temporarily unavailable.
        Please try reconnecting.
      </p>

      <p className="mt-3 text-xs text-red-300">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-8 rounded-xl bg-orange-600 px-8 py-3 font-bold text-white transition hover:bg-orange-500"
      >
        TRY AGAIN
      </button>
    </div>
  )
}

function EmptySearch({ onClear }) {
  return (
    <div className="mx-auto flex min-h-[350px] max-w-xl flex-col items-center justify-center rounded-2xl border border-orange-900/30 bg-[#252A33] px-6 py-12 text-center">
      <span className="text-7xl text-orange-400/50">
        忍
      </span>

      <h2 className="mt-6 text-2xl font-bold text-[#F1E3C6]">
        No Shinobi Found
      </h2>

      <p className="mt-4 text-gray-400">
        No ninja records match your search.
        Try another name or return to the archives.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-8 rounded-xl border border-orange-500/50 bg-orange-950/40 px-7 py-3 font-semibold text-orange-200 transition hover:bg-orange-900/50"
      >
        BACK TO ARCHIVES
      </button>
    </div>
  )
}

function Characters() {
  const [characters, setCharacters] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  const totalPages = Math.ceil(total / PAGE_SIZE)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchCharacters() {
      setLoading(true)
      setError('')

      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(PAGE_SIZE)
        })

        if (searchQuery) {
          params.set('name', searchQuery)
        }

        const response = await fetch(
          `https://dattebayo-api.onrender.com/characters?${params.toString()}`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch characters.')
        }

        const data = await response.json()

        if (!controller.signal.aborted) {
          setCharacters(data.characters ?? [])
          setTotal(data.total ?? 0)
        }
      } catch (err) {
        if (err.name !== 'AbortError' && !controller.signal.aborted) {
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchCharacters()

    return () => controller.abort()
  }, [page, searchQuery, retryCount])

  function handleSearch(event) {
    event.preventDefault()
    setPage(1)
    setSearchQuery(search.trim())
  }

  function clearSearch() {
    setSearch('')
    setSearchQuery('')
    setPage(1)
  }

  function retryFetch() {
    setRetryCount((count) => count + 1)
  }

  function changePage(nextPage) {
    if (nextPage < 1 || nextPage > totalPages || loading) {
      return
    }

    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-[#15191F] px-5 py-16">
      <div className="mx-auto max-w-7xl">

        <div className="mb-12 text-center">
          <p className="mb-3 text-sm tracking-[0.3em] text-orange-400">
            HIDDEN LEAF ARCHIVES
          </p>

          <h1 className="text-4xl font-bold text-[#F1E3C6] md:text-5xl">
            Shinobi Database
          </h1>

          <p className="mt-4 text-gray-400">
            Discover the legendary shinobi of the Naruto universe.
          </p>

          {!loading && !error && (
            <p className="mt-3 text-sm text-orange-400">
              {total} Shinobi Records
            </p>
          )}
        </div>

        <form
          onSubmit={handleSearch}
          className="mx-auto mb-12 flex max-w-2xl flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search for a shinobi..."
            aria-label="Search shinobi by name"
            className="w-full rounded-xl border border-orange-700/40 bg-[#303844] px-5 py-4 text-[#F1E3C6] outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:shadow-[0_0_15px_rgba(249,115,22,0.15)]"
          />

          <button
            type="submit"
            className="rounded-xl bg-orange-600 px-8 py-4 font-semibold text-white transition hover:bg-orange-500"
          >
            SEARCH
          </button>

          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="rounded-xl border border-orange-700/40 bg-[#303844] px-6 py-4 font-semibold text-[#F1E3C6] transition hover:border-orange-500"
            >
              CLEAR
            </button>
          )}
        </form>

        {searchQuery && !loading && !error && (
          <p className="mb-8 text-center text-sm text-gray-300">
            Search results for{' '}
            <span className="font-semibold text-orange-400">
              "{searchQuery}"
            </span>
          </p>
        )}

        {loading && <LoadingScreen />}

        {!loading && error && (
          <ErrorScreen
            message={error}
            onRetry={retryFetch}
          />
        )}

        {!loading && !error && characters.length === 0 && (
          <EmptySearch onClear={clearSearch} />
        )}

        {!loading && !error && characters.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {characters.map((character) => (
                <article
                  key={character.id}
                  className="group overflow-hidden rounded-xl border border-orange-900/30 bg-[#303844] transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/70 hover:shadow-[0_0_25px_rgba(249,115,22,0.2)]"
                >
                  <CharacterImage
                    key={character.id}
                    character={character}
                  />

                  <div className="p-5">
                    <p className="mb-2 text-xs tracking-[0.2em] text-orange-400">
                      SHINOBI RECORD
                    </p>

                    <h2 className="mb-3 text-xl font-bold text-[#F1E3C6]">
                      {character.name}
                    </h2>

                    <p className="mb-4 text-sm text-gray-300">
                      {character.personal?.affiliation?.[0] ??
                        character.personal?.clan ??
                        'Unknown Affiliation'}
                    </p>

                    <button
                      type="button"
                      disabled
                      className="w-full rounded-lg border border-orange-600/40 bg-orange-950/50 px-4 py-3 text-sm font-semibold text-orange-200 opacity-70"
                    >
                      VIEW PROFILE — COMING SOON
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <nav
                aria-label="Character pagination"
                className="mt-14 flex flex-wrap items-center justify-center gap-4"
              >
                <button
                  type="button"
                  onClick={() => changePage(page - 1)}
                  disabled={page === 1}
                  className="rounded-lg border border-orange-600/40 bg-[#303844] px-5 py-3 text-[#F1E3C6] transition hover:border-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ← Previous
                </button>

                <span className="text-sm font-semibold text-orange-400">
                  Page {page} of {totalPages}
                </span>

                <button
                  type="button"
                  onClick={() => changePage(page + 1)}
                  disabled={page === totalPages}
                  className="rounded-lg border border-orange-600/40 bg-[#303844] px-5 py-3 text-[#F1E3C6] transition hover:border-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next →
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </main>
  )
}

export default Characters
