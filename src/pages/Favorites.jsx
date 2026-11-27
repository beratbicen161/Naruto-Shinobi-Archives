
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import CharacterCard from '../components/CharacterCard'

function Favorites() {
  const { favorites, clearFavorites } = useFavorites()

  const [search, setSearch] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  const filteredFavorites = favorites.filter(character =>
    character.name
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  )

  function handleClearFavorites() {
    clearFavorites()
    setSearch('')
    setShowConfirm(false)
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-(--page-bg) px-5 py-12 text-(--text-primary)">

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.12),transparent_60%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-20 -z-10 select-none text-[300px] text-yellow-500/5 md:text-[500px]"
      >
        忍
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 bottom-10 -z-10 select-none text-[300px] text-yellow-500/5"
      >
        封
      </div>

      <div className="mx-auto max-w-7xl">

        <header className="mb-12 text-center">

          <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-full border border-yellow-500/40 bg-yellow-500/10 text-4xl text-yellow-500 shadow-[0_0_35px_rgba(234,179,8,0.15)]">
            忍
          </div>

          <p className="mb-4 text-xs font-bold tracking-[0.3em] text-yellow-600">
            PERSONAL SHINOBI ARCHIVE
          </p>

          <h1 className="text-3xl font-bold md:text-5xl lg:text-6xl">
            MY SHINOBI COLLECTION
          </h1>

          <div className="mx-auto my-6 h-px max-w-md bg-linear-to-r from-transparent via-yellow-500 to-transparent" />

          <p className="text-sm text-(--text-secondary) md:text-base">
            Your legendary shinobi, all in one place.
          </p>

        </header>

        <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-xl border border-yellow-500/30 bg-(--card-bg) p-6 text-center">

            <p className="mb-2 text-4xl font-bold text-yellow-500">
              {String(favorites.length).padStart(2, '0')}
            </p>

            <p className="text-xs tracking-widest text-(--text-secondary)">
              SAVED SHINOBI
            </p>

          </div>

          <div className="rounded-xl border border-yellow-500/30 bg-(--card-bg) p-6 text-center">

            <p className="mb-2 text-4xl font-bold text-yellow-500">
              封
            </p>

            <p className="text-xs tracking-widest text-(--text-secondary)">
              PERSONAL ARCHIVE
            </p>

          </div>

          <div className="rounded-xl border border-yellow-500/30 bg-(--card-bg) p-6 text-center">

            <p className="mb-2 text-4xl font-bold text-yellow-500">
              ★
            </p>

            <p className="text-xs tracking-widest text-(--text-secondary)">
              FAVORITE RECORDS
            </p>

          </div>

        </section>

        {favorites.length > 0 ? (
          <>

            <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="relative w-full sm:max-w-md">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-yellow-500"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m16 16 5 5" />
                </svg>

                <input
                  type="search"
                  value={search}
                  onChange={event => setSearch(event.target.value)}
                  placeholder="Search your collection..."
                  aria-label="Search favorite characters"
                  className="w-full rounded-lg border border-yellow-500/25 bg-(--card-bg) py-4 pl-12 pr-4 text-(--text-primary) outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                />

              </div>

              <button
                type="button"
                onClick={() => setShowConfirm(true)}
                className="rounded-lg border border-red-500/40 bg-red-500/10 px-6 py-4 text-sm font-bold text-red-500 transition hover:bg-red-500/20"
              >
                CLEAR ALL FAVORITES
              </button>

            </section>

            <div className="mb-6 flex items-center justify-between gap-4">

              <h2 className="text-xl font-bold md:text-2xl">
                SAVED RECORDS
              </h2>

              <span className="text-sm text-(--text-secondary)">
                {filteredFavorites.length} / {favorites.length} Shinobi
              </span>

            </div>

            {filteredFavorites.length > 0 ? (

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {filteredFavorites.map(character => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                  />
                ))}

              </div>

            ) : (

              <section className="rounded-2xl border border-yellow-500/20 bg-(--card-bg) px-6 py-16 text-center">

                <div className="mb-5 text-5xl text-yellow-500">
                  巻
                </div>

                <h2 className="mb-3 text-2xl">
                  NO MATCHING RECORDS
                </h2>

                <p className="mb-6 text-(--text-secondary)">
                  No saved shinobi matches your search.
                </p>

                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="rounded-lg border border-yellow-500/50 px-6 py-3 font-bold text-yellow-600 transition hover:bg-yellow-500/10"
                >
                  CLEAR SEARCH
                </button>

              </section>

            )}

          </>
        ) : (

          <section className="relative overflow-hidden rounded-2xl border border-yellow-500/25 bg-(--card-bg) px-6 py-20 text-center">

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.08),transparent_70%)]"
            />

            <div className="relative">

              <div className="mx-auto mb-8 flex size-28 items-center justify-center rounded-full border border-yellow-500/30 bg-yellow-500/5 text-7xl text-yellow-500 motion-safe:animate-pulse">
                ☆
              </div>

              <p className="mb-4 text-xs tracking-[0.3em] text-yellow-600">
                ARCHIVE STATUS: EMPTY
              </p>

              <h2 className="mb-4 text-2xl font-bold md:text-4xl">
                YOUR COLLECTION AWAITS
              </h2>

              <p className="mx-auto mb-8 max-w-lg text-(--text-secondary)">
                Explore the Shinobi Archives and save your favorite
                characters to build your own legendary collection.
              </p>

              <Link
                to="/characters"
                className="inline-flex items-center gap-3 rounded-lg border border-yellow-500 bg-yellow-500/10 px-8 py-4 font-bold text-yellow-600 transition hover:bg-yellow-500/20"
              >
                EXPLORE SHINOBI
                <span>→</span>
              </Link>

            </div>

          </section>

        )}

        <footer className="mt-14 border-t border-yellow-500/20 pt-8 text-center">

          <p className="mb-3 text-3xl text-yellow-500">
            封
          </p>

          <p className="text-xs tracking-[0.2em] text-(--text-secondary)">
            SHINOBI ARCHIVES — PERSONAL COLLECTION
          </p>

        </footer>

      </div>

      {showConfirm && (

        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/75 p-5 backdrop-blur-sm"
          onClick={() => setShowConfirm(false)}
        >

          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="clear-favorites-title"
            onClick={event => event.stopPropagation()}
            onKeyDown={event => {
              if (event.key === 'Escape') {
                setShowConfirm(false)
              }
            }}
            className="w-full max-w-md rounded-2xl border border-red-500/40 bg-(--card-bg) p-8 text-center shadow-2xl"
          >

            <div className="mb-5 text-5xl text-red-500">
              !
            </div>

            <h2
              id="clear-favorites-title"
              className="mb-4 text-2xl font-bold"
            >
              CLEAR COLLECTION?
            </h2>

            <p className="mb-8 text-(--text-secondary)">
              All saved shinobi will be removed from your personal
              archive. This action cannot be undone.
            </p>

            <div className="grid grid-cols-2 gap-3">

              <button
                autoFocus
                type="button"
                onClick={() => setShowConfirm(false)}
                className="rounded-lg border border-yellow-500/30 px-4 py-3 font-bold transition hover:bg-yellow-500/10"
              >
                CANCEL
              </button>

              <button
                type="button"
                onClick={handleClearFavorites}
                className="rounded-lg border border-red-500/50 bg-red-500/15 px-4 py-3 font-bold text-red-500 transition hover:bg-red-500/25"
              >
                CLEAR ALL
              </button>

            </div>

          </section>

        </div>

      )}

    </main>
  )
}

export default Favorites
