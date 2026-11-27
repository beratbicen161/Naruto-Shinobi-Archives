
import { useEffect, useRef, useState } from 'react'
import { getCharacters } from '../services/api'
import { useFavorites } from '../context/FavoritesContext'
import {
  getCharacterForms,
  getStrongestForm,
  getPowerTier,
  hasBattleData,
  normalizeBattleName,
} from '../data/battleStats'

const PAGE_SIZE = 18

function BattleCharacterPortrait({ character }) {
  const [imageIndex, setImageIndex] = useState(0)

  const images = Array.isArray(character.images)
    ? character.images.filter(Boolean)
    : []

  return (
    <div className="relative aspect-[3/4] overflow-hidden bg-[#10151D]">

      {images[imageIndex] ? (
        <img
          src={images[imageIndex]}
          alt={character.name}
          loading="lazy"
          onError={() =>
            setImageIndex(previous => previous + 1)
          }
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center text-gray-500">
          <span className="text-5xl">忍</span>

          <p className="mt-3 text-xs">
            No Image
          </p>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#10151D] via-transparent to-transparent" />

    </div>
  )
}

function BattleSelectionCard({
  character,
  onSelect,
  favorite,
}) {
  const forms = getCharacterForms(character.name)
  const strongest = getStrongestForm(character.name)
  const available = forms.length > 0

  const tier = strongest
    ? getPowerTier(strongest.power)
    : null

  return (
    <button
      type="button"
      disabled={!available}
      onClick={() => onSelect(character)}
      className={`group relative overflow-hidden rounded-xl border text-left transition-all duration-300 ${
        available
          ? 'border-orange-500/25 bg-[#202630] hover:-translate-y-1 hover:border-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]'
          : 'cursor-not-allowed border-white/10 bg-[#202630] opacity-50'
      }`}
    >

      <BattleCharacterPortrait
        key={character.id}
        character={character}
      />

      {favorite && (
        <span className="absolute right-2 top-2 rounded-full border border-yellow-500/40 bg-black/70 px-2 py-1 text-yellow-400">
          ★
        </span>
      )}

      <div className="p-3 sm:p-4">

        <h3 className="min-h-10 text-xs leading-5 text-[#F1E3C6] sm:text-sm">
          {character.name}
        </h3>

        {available ? (
          <>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">

              <span className="text-xs text-orange-400">
                {forms.length} {forms.length === 1 ? 'Form' : 'Forms'}
              </span>

              <span className="text-xs font-bold text-green-400">
                READY
              </span>

            </div>

            <div className="mt-3 border-t border-white/10 pt-3">

              <p className="text-[9px] uppercase tracking-wider text-gray-400">
                Maximum Power
              </p>

              <p className="mt-1 text-xl font-bold text-orange-400">
                {strongest.power}
              </p>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/50">

                <div
                  className="h-full rounded-full bg-linear-to-r from-orange-700 to-orange-400"
                  style={{
                    width: `${strongest.power / 10}%`,
                  }}
                />

              </div>

              <p
                className="mt-2 text-[10px] font-bold"
                style={{
                  color: tier?.color || '#9CA3AF',
                }}
              >
                {tier?.name}
              </p>

            </div>

          </>
        ) : (
          <p className="mt-3 text-[10px] leading-5 text-gray-400">
            Power Data Unavailable
          </p>
        )}

      </div>

    </button>
  )
}

function BattleCharacterSelector({
  side = 'first',
  onClose,
  onSelect,
}) {
  const { favorites } = useFavorites()

  const [characters, setCharacters] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)

  const readyCache = useRef(null)
  const searchInput = useRef(null)
  const dialogRef = useRef(null)
  const closeRef = useRef(onClose)

  const isFirst = side === 'first'

  const totalPages = Math.max(
    1,
    Math.ceil(total / PAGE_SIZE)
  )

  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow

    const previousFocus =
      document.activeElement

    document.body.style.overflow = 'hidden'

    searchInput.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeRef.current?.()
      }

      if (event.key === 'Tab') {
        const focusable = Array.from(
          dialogRef.current?.querySelectorAll(
            'button:not([disabled]), input:not([disabled]), a[href]'
          ) || []
        )

        if (!focusable.length) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault()
          last.focus()
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener(
      'keydown',
      handleKeyDown
    )

    return () => {
      document.body.style.overflow =
        previousOverflow

      document.removeEventListener(
        'keydown',
        handleKeyDown
      )

      previousFocus?.focus()
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(search.trim())
      setPage(1)
    }, 350)

    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    const controller = new AbortController()

    async function loadCharacters() {
      setLoading(true)
      setError('')

      try {
        if (filter === 'favorites') {
          const normalizedQuery =
            normalizeBattleName(query)

          const filtered = favorites.filter(
            character =>
              normalizeBattleName(
                character.name
              ).includes(normalizedQuery)
          )

          setTotal(filtered.length)

          setCharacters(
            filtered.slice(
              (page - 1) * PAGE_SIZE,
              page * PAGE_SIZE
            )
          )

          return
        }

        if (filter === 'ready') {
          let readyCharacters = readyCache.current

          if (!readyCharacters) {
            const allCharacters = []
            let currentPage = 1
            const batchSize = 100

            while (true) {
              const result = await getCharacters(
                currentPage,
                batchSize,
                '',
                controller.signal
              )

              const items =
                result.characters || []

              allCharacters.push(...items)

              if (
                items.length === 0 ||
                allCharacters.length >= result.total ||
                items.length < batchSize
              ) {
                break
              }

              currentPage += 1
            }

            readyCharacters = Array.from(
              new Map(
                allCharacters
                  .filter(character =>
                    hasBattleData(character.name)
                  )
                  .map(character => [
                    character.id,
                    character,
                  ])
              ).values()
            )

            if (controller.signal.aborted) return

            readyCache.current = readyCharacters
          }

          const normalizedQuery =
            normalizeBattleName(query)

          const filtered = readyCharacters.filter(
            character =>
              normalizeBattleName(
                character.name
              ).includes(normalizedQuery)
          )

          if (controller.signal.aborted) return

          setTotal(filtered.length)

          setCharacters(
            filtered.slice(
              (page - 1) * PAGE_SIZE,
              page * PAGE_SIZE
            )
          )

          return
        }

        const result = await getCharacters(
          page,
          PAGE_SIZE,
          query,
          controller.signal
        )

        if (controller.signal.aborted) return

        setCharacters(result.characters || [])
        setTotal(result.total || 0)

      } catch (err) {
        if (controller.signal.aborted) return

        setCharacters([])
        setTotal(0)

        setError(
          err.message ||
          'Unable to load shinobi records.'
        )

      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadCharacters()

    return () => controller.abort()

  }, [page, query, filter, favorites, retry])

  useEffect(() => {
    if (!loading && page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages, loading])

  function changeFilter(nextFilter) {
    setFilter(nextFilter)
    setPage(1)
  }

  function clearSearch() {
    setSearch('')
    setQuery('')
    setPage(1)
    setFilter('all')
  }

  function changePage(nextPage) {
    setPage(
      Math.max(
        1,
        Math.min(nextPage, totalPages)
      )
    )
  }

  const filters = [
    {
      id: 'all',
      label: 'All Shinobi',
    },
    {
      id: 'favorites',
      label: '★ Favorites',
    },
    {
      id: 'ready',
      label: 'Battle Ready',
    },
  ]

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >

      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="battle-selector-title"
        onClick={event => event.stopPropagation()}
        className="flex max-h-[92dvh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-orange-500/50 bg-[#15191F] text-[#F1E3C6] shadow-[0_0_60px_rgba(249,115,22,0.15)]"
      >

        <header className="shrink-0 border-b border-orange-500/20 p-4 sm:p-6">

          <div className="flex items-start justify-between gap-4">

            <div>

              <p className={`text-xs font-bold tracking-[0.25em] ${
                isFirst
                  ? 'text-orange-400'
                  : 'text-indigo-400'
              }`}>
                PLAYER {isFirst ? '01' : '02'}
              </p>

              <h2
                id="battle-selector-title"
                className="mt-3 text-xl leading-relaxed sm:text-3xl"
              >
                SELECT YOUR SHINOBI
              </h2>

              <p className="mt-2 text-xs leading-6 text-gray-400">
                Choose a character to enter the battle arena.
              </p>

            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close character selection"
              className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-orange-500/30 text-xl text-orange-400 hover:border-orange-500 hover:bg-orange-500/10"
            >
              ✕
            </button>

          </div>

          <div className="relative mt-6">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-orange-400"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M16 16 L21 21" />
            </svg>

            <input
              ref={searchInput}
              type="search"
              value={search}
              onChange={event =>
                setSearch(event.target.value)
              }
              aria-label="Search shinobi"
              placeholder="Search shinobi..."
              className="w-full rounded-xl border border-orange-500/30 bg-[#202630] py-4 pl-12 pr-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-orange-500"
            />

          </div>

          <div className="mt-4 flex flex-wrap gap-2">

            {filters.map(item => (

              <button
                key={item.id}
                type="button"
                aria-pressed={filter === item.id}
                onClick={() =>
                  changeFilter(item.id)
                }
                className={`rounded-lg border px-3 py-2 text-xs font-bold transition-all sm:px-5 sm:py-3 ${
                  filter === item.id
                    ? 'border-orange-500 bg-orange-600 text-white'
                    : 'border-white/10 bg-[#202630] text-gray-400 hover:border-orange-500/50 hover:text-orange-400'
                }`}
              >
                {item.label}
              </button>

            ))}

          </div>

        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">

          {loading ? (

            <div className="flex min-h-72 flex-col items-center justify-center">

              <div className="size-16 animate-spin rounded-full border-4 border-orange-500/20 border-t-orange-500 motion-reduce:animate-none" />

              <p className="mt-6 text-sm font-bold tracking-widest text-orange-400">
                LOADING SHINOBI
              </p>

              <p className="mt-3 text-xs text-gray-400">
                Retrieving character records...
              </p>

            </div>

          ) : error ? (

            <div className="flex min-h-72 flex-col items-center justify-center text-center">

              <p className="text-4xl text-orange-500">
                忍
              </p>

              <h3 className="mt-4 text-lg">
                Unable to Load Shinobi
              </h3>

              <p className="mt-3 text-sm text-gray-400">
                {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  setRetry(previous => previous + 1)
                }
                className="mt-6 rounded-lg bg-orange-600 px-6 py-3 text-sm font-bold text-white hover:bg-orange-500"
              >
                Try Again
              </button>

            </div>

          ) : characters.length === 0 ? (

            <div className="flex min-h-72 flex-col items-center justify-center text-center">

              <p className="text-5xl text-orange-500/50">
                巻
              </p>

              <h3 className="mt-5 text-lg">
                No Shinobi Found
              </h3>

              <p className="mt-3 text-sm text-gray-400">
                Try a different search or filter.
              </p>

              <button
                type="button"
                onClick={clearSearch}
                className="mt-6 rounded-lg border border-orange-500/40 px-6 py-3 text-sm text-orange-400 hover:bg-orange-500/10"
              >
                Clear Filters
              </button>

            </div>

          ) : (

            <>

              <p className="mb-5 text-xs text-gray-400">
                {total} shinobi found
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

                {characters.map(character => (

                  <BattleSelectionCard
                    key={character.id}
                    character={character}
                    favorite={favorites.some(
                      item => item.id === character.id
                    )}
                    onSelect={onSelect}
                  />

                ))}

              </div>

            </>

          )}

        </div>

        <footer className="shrink-0 border-t border-orange-500/20 bg-[#10151D] p-4">

          <div className="flex flex-wrap items-center justify-between gap-3">

            <p className="text-[10px] text-gray-400 sm:text-xs">
              Page {page} of {totalPages}
            </p>

            <div className="flex items-center gap-2">

              <button
                type="button"
                disabled={page === 1 || loading}
                onClick={() =>
                  changePage(page - 1)
                }
                className="rounded-lg border border-orange-500/30 px-4 py-2 text-xs text-orange-400 hover:bg-orange-500/10 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Previous
              </button>

              <span className="rounded-lg bg-orange-600 px-4 py-2 text-xs font-bold text-white">
                {page}
              </span>

              <button
                type="button"
                disabled={
                  page >= totalPages || loading
                }
                onClick={() =>
                  changePage(page + 1)
                }
                className="rounded-lg border border-orange-500/30 px-4 py-2 text-xs text-orange-400 hover:bg-orange-500/10 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Next
              </button>

            </div>

          </div>

        </footer>

      </section>

    </div>
  )
}

export default BattleCharacterSelector
