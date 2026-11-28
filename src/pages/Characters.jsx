import { useEffect, useState } from 'react'
import { getCharacters } from '../services/api'

import CharacterCard from '../components/CharacterCard'
import LoadingScreen from '../components/LoadingScreen'
import ErrorScreen from '../components/ErrorScreen'
import EmptySearch from '../components/EmptySearch'
import CharacterChakraBackground from '../components/CharacterChakraBackground'

const PAGE_SIZE = 20

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
        const data = await getCharacters(
          page,
          PAGE_SIZE,
          searchQuery,
          controller.signal
        )

        if (!controller.signal.aborted) {
          setCharacters(data.characters ?? [])
          setTotal(data.total ?? 0)
        }
      } catch (err) {
        if (
          err.name !== 'AbortError' &&
          !controller.signal.aborted
        ) {
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
    <main className="relative isolate min-h-screen overflow-hidden bg-[#15191F] px-5 py-16">

      <CharacterChakraBackground />

      <div className="relative z-10 mx-auto max-w-7xl">

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
                <CharacterCard
                  key={character.id}
                  character={character}
                />
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