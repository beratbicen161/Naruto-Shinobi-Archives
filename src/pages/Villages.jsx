import { useEffect, useState } from 'react'
import { getVillages } from '../services/api'
import VillageCard from '../components/VillageCard'
import LoadingScreen from '../components/LoadingScreen'
import ErrorScreen from '../components/ErrorScreen'
import EmptySearch from '../components/EmptySearch'
import VillageHeadbandBackground from '../components/VillageHeadbandBackground'

const PAGE_SIZE = 20

function Villages() {
  const [villages, setVillages] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)
  const [search, setSearch] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const totalPages = Math.max(
    1,
    Math.ceil(total / PAGE_SIZE)
  )

  useEffect(() => {
    const controller = new AbortController()

    async function loadVillages() {
      setLoading(true)
      setError(null)

      try {
        const data = await getVillages(
          page,
          PAGE_SIZE,
          searchQuery,
          controller.signal
        )

        if (controller.signal.aborted) return

        setVillages(data.villages ?? [])
        setTotal(data.total ?? 0)

      } catch (err) {
        if (
          !controller.signal.aborted &&
          err.name !== 'AbortError'
        ) {
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadVillages()

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

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#15191F] px-5 py-16 text-[#F1E3C6]">

      <VillageHeadbandBackground />

      <div className="relative z-10 mx-auto max-w-7xl">

        <div className="mb-12 text-center">

          <p className="mb-3 text-sm font-bold tracking-[0.4em] text-orange-500">
            HIDDEN LEAF ARCHIVES
          </p>

          <h1 className="text-4xl font-bold md:text-6xl">
            Shinobi Villages
          </h1>

          <p className="mt-4 text-gray-400">
            Explore the hidden villages and legendary
            territories of the shinobi world.
          </p>

          {!loading && !error && (
            <p className="mt-4 text-orange-400">
              {total} village records available
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
            onChange={event =>
              setSearch(event.target.value)
            }
            placeholder="Search for a village..."
            aria-label="Search for a village"
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
            title="Searching Village Archives"
            description="Retrieving hidden village records..."
          />

        ) : error ? (

          <ErrorScreen
            message={error}
            onRetry={() =>
              setRetryCount(count => count + 1)
            }
          />

        ) : villages.length === 0 ? (

          <EmptySearch
            title="No Villages Found"
            description="No village records match your search. Try another village name."
            buttonText="BACK TO VILLAGE ARCHIVES"
            onClear={clearSearch}
          />

        ) : (

          <>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {villages.map(village => (
                <VillageCard
                  key={village.id}
                  village={village}
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

export default Villages