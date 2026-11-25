import { useEffect, useState } from 'react'
import { getClans } from '../services/api'
import ClanCard from '../components/ClanCard'
import LoadingScreen from '../components/LoadingScreen'
import ErrorScreen from '../components/ErrorScreen'
import EmptySearch from '../components/EmptySearch'

const PAGE_SIZE = 20

function Clans() {
  const [clans, setClans] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)
  const [search, setSearch] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  useEffect(() => {
    const controller = new AbortController()

    async function loadClans() {
      setLoading(true)
      setError(null)

      try {
        const data = await getClans(
          page,
          PAGE_SIZE,
          searchQuery,
          controller.signal
        )

        if (controller.signal.aborted) return

        setClans(data.clans ?? [])
        setTotal(data.total ?? 0)
      } catch (err) {
        if (!controller.signal.aborted && err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadClans()

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

  function changePage(nextPage) {
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-[#15191F] px-5 py-16 text-[#F1E3C6]">

      <div className="mx-auto max-w-7xl">

        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold tracking-[0.4em] text-orange-500">
            HIDDEN LEAF ARCHIVES
          </p>

          <h1 className="text-4xl font-bold md:text-6xl">
            Shinobi Clans
          </h1>

          <p className="mt-4 text-gray-400">
            Discover the legendary bloodlines of the shinobi world.
          </p>

          {!loading && !error && (
            <p className="mt-4 text-orange-400">
              {total} clan records available
            </p>
          )}
        </div>

        <form
          onSubmit={handleSearch}
          className="mx-auto mb-10 flex max-w-2xl flex-col gap-3 sm:flex-row"
        >
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search for a clan..."
            aria-label="Search for a clan"
            className="min-w-0 flex-1 rounded-lg border border-orange-500/30 bg-[#252A33] px-5 py-3 text-[#F1E3C6] outline-none transition placeholder:text-gray-500 focus:border-orange-500"
          />

          <button
            type="submit"
            className="rounded-lg bg-orange-500 px-6 py-3 font-bold text-black transition hover:bg-orange-400"
          >
            SEARCH
          </button>

          {(search || searchQuery) && (
            <button
              type="button"
              onClick={clearSearch}
              className="rounded-lg border border-orange-500/40 px-5 py-3 text-orange-400 transition hover:bg-orange-500 hover:text-black"
            >
              CLEAR
            </button>
          )}
        </form>

        {searchQuery && !loading && !error && (
          <p className="mb-6 text-center text-sm text-gray-400">
            Search results for: "{searchQuery}"
          </p>
        )}

        {loading ? (
          <LoadingScreen
            title="Searching Clan Archives"
            description="Retrieving classified clan records..."
          />
        ) : error ? (
          <ErrorScreen
            message={error}
            onRetry={() => setRetryCount((count) => count + 1)}
          />
        ) : clans.length === 0 ? (
          <EmptySearch
            title="No Clans Found"
            description="No clan records match your search. Try another clan name."
            buttonText="BACK TO CLAN ARCHIVES"
            onClear={clearSearch}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {clans.map((clan) => (
                <ClanCard
                  key={clan.id}
                  clan={clan}
                />
              ))}

            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">

              <button
                onClick={() => changePage(page - 1)}
                disabled={page === 1}
                className="rounded-lg border border-orange-500/40 px-5 py-2 transition hover:bg-orange-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
              >
                Previous
              </button>

              <span className="text-sm text-orange-400">
                Page {page} / {totalPages}
              </span>

              <button
                onClick={() => changePage(page + 1)}
                disabled={page >= totalPages}
                className="rounded-lg border border-orange-500/40 px-5 py-2 transition hover:bg-orange-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
              >
                Next
              </button>

            </div>
          </>
        )}

      </div>

    </main>
  )
}

export default Clans