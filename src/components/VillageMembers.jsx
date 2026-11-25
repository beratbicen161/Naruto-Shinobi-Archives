import { useEffect, useMemo, useState } from 'react'
import { getCharacterById } from '../services/api'
import CharacterCard from './CharacterCard'
import LoadingScreen from './LoadingScreen'
import ErrorScreen from './ErrorScreen'

const PAGE_SIZE = 20
const BATCH_SIZE = 5

function VillageMembers({ village }) {
  const [members, setMembers] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [failedMembers, setFailedMembers] = useState(0)
  const [retryCount, setRetryCount] = useState(0)

  const characterIds = useMemo(() => {
    return [
      ...new Set(
        (village.characters ?? []).filter(
          id => id !== null && id !== undefined
        )
      ),
    ]
  }, [village.characters])

  const totalPages = Math.max(
    1,
    Math.ceil(characterIds.length / PAGE_SIZE)
  )

  const startIndex = (page - 1) * PAGE_SIZE

  useEffect(() => {
    const controller = new AbortController()

    async function loadMembers() {
      setLoading(true)
      setMembers([])
      setFailedMembers(0)

      const pageIds = characterIds.slice(
        startIndex,
        startIndex + PAGE_SIZE
      )

      const loadedMembers = []
      let failedCount = 0

      try {
        for (
          let index = 0;
          index < pageIds.length;
          index += BATCH_SIZE
        ) {
          if (controller.signal.aborted) return

          const batch = pageIds.slice(
            index,
            index + BATCH_SIZE
          )

          const results = await Promise.allSettled(
            batch.map(id =>
              getCharacterById(
                id,
                controller.signal
              )
            )
          )

          if (controller.signal.aborted) return

          results.forEach(result => {
            if (
              result.status === 'fulfilled' &&
              result.value?.id != null
            ) {
              loadedMembers.push(result.value)
            } else {
              failedCount++
            }
          })

          setMembers([...loadedMembers])
          setFailedMembers(failedCount)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadMembers()

    return () => controller.abort()

  }, [characterIds, startIndex, retryCount])

  function changePage(nextPage) {
    if (
      nextPage < 1 ||
      nextPage > totalPages
    ) {
      return
    }

    setPage(nextPage)

    document
      .getElementById('village-personnel')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
  }

  function retryMembers() {
    setRetryCount(count => count + 1)
  }

  if (characterIds.length === 0) {
    return (
      <div className="mt-8 rounded-xl border border-orange-500/20 bg-[#252A33] px-6 py-12 text-center">

        <span className="text-6xl text-orange-400/40">
          忍
        </span>

        <h3 className="mt-5 text-2xl font-bold">
          No Registered Shinobi
        </h3>

        <p className="mt-3 text-sm text-gray-400">
          There are currently no character records
          associated with this territory.
        </p>

      </div>
    )
  }

  return (
    <div className="mt-8">

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <p className="text-sm text-gray-400">

          Showing records{' '}

          <span className="font-bold text-orange-400">
            {startIndex + 1}
            {' - '}
            {Math.min(
              startIndex + PAGE_SIZE,
              characterIds.length
            )}
          </span>

          {' of '}
          {characterIds.length}

        </p>

        <span className="rounded border border-orange-500/30 px-3 py-2 text-xs font-bold tracking-widest text-orange-400">
          PAGE {page} / {totalPages}
        </span>

      </div>

      {loading && members.length === 0 && (
        <LoadingScreen
          title="Retrieving Shinobi Records"
          description="Accessing village personnel archives..."
        />
      )}

      {!loading &&
        members.length === 0 &&
        failedMembers > 0 && (
          <ErrorScreen
            title="Personnel Archives Unavailable"
            message="Character records could not be retrieved."
            onRetry={retryMembers}
          />
        )}

      {members.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {members.map(character => (
            <CharacterCard
              key={character.id}
              character={character}
            />
          ))}

        </div>
      )}

      {loading && members.length > 0 && (
        <div
          role="status"
          className="mt-8 flex items-center justify-center gap-3 text-sm text-orange-400"
        >

          <div className="h-5 w-5 animate-spin rounded-full border-2 border-orange-500/20 border-t-orange-500 motion-reduce:animate-none" />

          Retrieving additional shinobi records...

        </div>
      )}

      {!loading &&
        failedMembers > 0 &&
        members.length > 0 && (
          <div className="mt-8 rounded-lg border border-orange-500/30 bg-orange-500/5 p-5 text-center">

            <p className="text-sm text-orange-400">
              {failedMembers} character records
              could not be loaded.
            </p>

            <button
              type="button"
              onClick={retryMembers}
              className="mt-4 rounded border border-orange-500/40 px-5 py-2 text-sm font-bold text-orange-400 transition hover:bg-orange-500 hover:text-black"
            >
              RETRY RECORDS
            </button>

          </div>
        )}

      {totalPages > 1 && (
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">

          <button
            type="button"
            onClick={() => changePage(page - 1)}
            disabled={page === 1}
            className="rounded-lg border border-orange-500/40 px-5 py-2 transition hover:bg-orange-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
          >
            Previous
          </button>

          <span className="text-sm font-bold text-orange-400">
            Page {page} / {totalPages}
          </span>

          <button
            type="button"
            onClick={() => changePage(page + 1)}
            disabled={page >= totalPages}
            className="rounded-lg border border-orange-500/40 px-5 py-2 transition hover:bg-orange-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
          >
            Next
          </button>

        </div>
      )}

    </div>
  )
}

export default VillageMembers