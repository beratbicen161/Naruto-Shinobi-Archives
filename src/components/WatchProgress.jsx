
import { useEffect, useState } from 'react'
import {
  watchSeries,
  watchMovies,
  allEpisodes,
} from '../data/watchGuide'

const STORAGE_KEY = 'shinobi-watch-progress'

const episodeColors = {
  canon: 'border-green-500/30 text-green-500',
  filler: 'border-red-500/30 text-red-500',
  mixed: 'border-amber-500/30 text-amber-500',
  'anime-canon': 'border-blue-500/30 text-blue-500',
}

function loadProgress() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    )

    return {
      episodes: Array.isArray(saved?.episodes)
        ? [...new Set(saved.episodes)].filter(id =>
            allEpisodes.some(episode => episode.id === id)
          )
        : [],
      movies: Array.isArray(saved?.movies)
        ? [...new Set(saved.movies)].filter(id =>
            watchMovies.some(movie => movie.id === id)
          )
        : [],
    }
  } catch {
    return {
      episodes: [],
      movies: [],
    }
  }
}

function getPercentage(current, total) {
  return total > 0
    ? Math.round((current / total) * 100)
    : 0
}

function ProgressBar({ label, current, total }) {
  const percentage = getPercentage(current, total)

  return (
    <div>

      <div className="mb-3 flex items-center justify-between gap-3">

        <p className="text-sm font-semibold">
          {label}
        </p>

        <p className="text-xs text-(--text-secondary)">
          {current} / {total} · {percentage}%
        </p>

      </div>

      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
        className="h-3 overflow-hidden rounded-full bg-(--card-bg)"
      >

        <div
          className="h-full rounded-full bg-linear-to-r from-orange-700 to-orange-400 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />

      </div>

    </div>
  )
}

function WatchProgress() {
  const [progress, setProgress] = useState(loadProgress)

  const [seriesId, setSeriesId] = useState('naruto')
  const [episodeFilter, setEpisodeFilter] = useState('all')
  const [skipFiller, setSkipFiller] = useState(false)
  const [lastEpisode, setLastEpisode] = useState('')
  const [showReset, setShowReset] = useState(false)
  const [storageError, setStorageError] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(progress)
      )

      setStorageError(false)
    } catch {
      setStorageError(true)
    }
  }, [progress])

  const selectedSeries = watchSeries.find(
    series => series.id === seriesId
  )

  const watchedEpisodes = new Set(progress.episodes)
  const watchedMovies = new Set(progress.movies)

  const recommendedEpisodes = allEpisodes.filter(
    episode => episode.type !== 'filler'
  )

  const watchedRecommended = recommendedEpisodes.filter(
    episode => watchedEpisodes.has(episode.id)
  ).length

  const totalWatched = watchedEpisodes.size

  const overallPercentage = getPercentage(
    totalWatched,
    allEpisodes.length
  )

  const recommendedPercentage = getPercentage(
    watchedRecommended,
    recommendedEpisodes.length
  )

  const visibleEpisodes = selectedSeries.episodes.filter(
    episode => {
      if (skipFiller && episode.type === 'filler') {
        return false
      }

      if (episodeFilter === 'watched') {
        return watchedEpisodes.has(episode.id)
      }

      if (episodeFilter === 'unwatched') {
        return !watchedEpisodes.has(episode.id)
      }

      return true
    }
  )

  function toggleEpisode(id) {
    setProgress(previous => ({
      ...previous,
      episodes: previous.episodes.includes(id)
        ? previous.episodes.filter(item => item !== id)
        : [...previous.episodes, id],
    }))
  }

  function toggleMovie(id) {
    setProgress(previous => ({
      ...previous,
      movies: previous.movies.includes(id)
        ? previous.movies.filter(item => item !== id)
        : [...previous.movies, id],
    }))
  }

  function markUntilEpisode() {
    const number = Number(lastEpisode)

    if (
      !Number.isInteger(number) ||
      number < 1 ||
      number > selectedSeries.totalEpisodes
    ) {
      return
    }

    const episodeIds = selectedSeries.episodes
      .filter(episode =>
        episode.number <= number &&
        (!skipFiller || episode.type !== 'filler')
      )
      .map(episode => episode.id)

    setProgress(previous => ({
      ...previous,
      episodes: [
        ...new Set([
          ...previous.episodes,
          ...episodeIds,
        ]),
      ],
    }))

    setLastEpisode('')
  }

  function markVisibleEpisodes() {
    const ids = visibleEpisodes.map(
      episode => episode.id
    )

    setProgress(previous => ({
      ...previous,
      episodes: [
        ...new Set([...previous.episodes, ...ids]),
      ],
    }))
  }

  function clearVisibleEpisodes() {
    const ids = new Set(
      visibleEpisodes.map(episode => episode.id)
    )

    setProgress(previous => ({
      ...previous,
      episodes: previous.episodes.filter(
        id => !ids.has(id)
      ),
    }))
  }

  function resetProgress() {
    setProgress({
      episodes: [],
      movies: [],
    })

    setLastEpisode('')
    setShowReset(false)
  }

  function filterStyle(active) {
    return `rounded-lg border px-4 py-3 text-xs font-bold transition-all duration-300 ${
      active
        ? 'border-orange-500 bg-orange-600 text-white'
        : 'border-orange-500/20 bg-(--page-bg) text-(--text-secondary) hover:border-orange-500'
    }`
  }

  return (
    <div className="mx-auto max-w-6xl">

      <header className="mb-10 text-center">

        <p className="text-5xl text-(--accent)">
          印
        </p>

        <p className="mt-5 text-xs font-bold tracking-[0.3em] text-(--accent)">
          YOUR PERSONAL SHINOBI RECORD
        </p>

        <h3 className="mt-4 text-2xl md:text-4xl">
          MY WATCH PROGRESS
        </h3>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-(--text-secondary)">
          Record your watched episodes and movies.
          Continue your journey whenever you return
          to the Shinobi Archives.
        </p>

      </header>

      <section className="relative overflow-hidden rounded-2xl border border-orange-500/30 bg-(--page-bg) p-6 md:p-8">

        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-5 -top-10 select-none text-[220px] text-orange-500/5"
        >
          忍
        </span>

        <div className="relative grid items-center gap-8 md:grid-cols-2">

          <div>

            <p className="text-xs font-bold tracking-widest text-(--accent)">
              OVERALL PROGRESS
            </p>

            <p className="mt-4 text-5xl font-bold text-(--accent)">
              {overallPercentage}%
            </p>

            <p className="mt-3 text-sm text-(--text-secondary)">
              {totalWatched} of {allEpisodes.length}
              {' '}episodes watched
            </p>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-(--card-bg)">

              <div
                className="h-full rounded-full bg-linear-to-r from-orange-700 to-orange-400 transition-all duration-500"
                style={{
                  width: `${overallPercentage}%`,
                }}
              />

            </div>

          </div>

          <div className="flex justify-center">

            <div className="relative flex size-40 items-center justify-center">

              <svg
                viewBox="0 0 120 120"
                className="absolute inset-0 size-full -rotate-90"
                aria-hidden="true"
              >

                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-orange-500/15"
                />

                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 52}
                  strokeDashoffset={
                    2 * Math.PI * 52 *
                    (1 - overallPercentage / 100)
                  }
                  className="text-orange-500 transition-all duration-500"
                />

              </svg>

              <div className="text-center">

                <p className="text-4xl text-(--accent)">
                  忍
                </p>

                <p className="mt-2 text-xs font-bold tracking-widest text-(--text-secondary)">
                  SHINOBI
                </p>

              </div>

            </div>

          </div>

        </div>

        <div className="relative mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">

          {[
            {
              label: 'Episodes Watched',
              value: totalWatched,
            },
            {
              label: 'Episodes Remaining',
              value: allEpisodes.length - totalWatched,
            },
            {
              label: 'Movies Watched',
              value: `${watchedMovies.size}/${watchMovies.length}`,
            },
            {
              label: 'Main Story Progress',
              value: `${recommendedPercentage}%`,
            },
          ].map(stat => (

            <article
              key={stat.label}
              className="rounded-xl border border-orange-500/20 bg-(--card-bg) p-4 text-center"
            >

              <p className="text-2xl font-bold text-(--accent)">
                {stat.value}
              </p>

              <p className="mt-3 text-xs text-(--text-secondary)">
                {stat.label}
              </p>

            </article>

          ))}

        </div>

      </section>

      <section className="mt-8 space-y-7 rounded-2xl border border-orange-500/20 bg-(--page-bg) p-6">

        <h4 className="text-xl">
          SERIES PROGRESS
        </h4>

        {watchSeries.map(series => (

          <ProgressBar
            key={series.id}
            label={series.title}
            current={
              series.episodes.filter(
                episode => watchedEpisodes.has(episode.id)
              ).length
            }
            total={series.totalEpisodes}
          />

        ))}

        <ProgressBar
          label="Main Story — Without Filler"
          current={watchedRecommended}
          total={recommendedEpisodes.length}
        />

        <ProgressBar
          label="Movies"
          current={watchedMovies.size}
          total={watchMovies.length}
        />

      </section>

      <section className="mt-10 rounded-2xl border border-orange-500/20 bg-(--page-bg) p-4 sm:p-6">

        <header className="mb-6">

          <p className="text-xs font-bold tracking-widest text-(--accent)">
            EPISODE RECORDS
          </p>

          <h4 className="mt-3 text-xl">
            MARK YOUR EPISODES
          </h4>

          <p className="mt-3 text-sm leading-7 text-(--text-secondary)">
            Select an episode to mark it as watched.
            Select it again to undo.
          </p>

        </header>

        <div className="grid grid-cols-2 gap-3">

          {watchSeries.map(series => (

            <button
              key={series.id}
              type="button"
              aria-pressed={seriesId === series.id}
              onClick={() => {
                setSeriesId(series.id)
                setLastEpisode('')
              }}
              className={filterStyle(
                seriesId === series.id
              )}
            >
              {series.title}
            </button>

          ))}

        </div>

        <div className="mt-6 rounded-xl border border-orange-500/20 bg-(--card-bg) p-4">

          <p className="text-sm font-semibold">
            Quick Progress
          </p>

          <p className="mt-2 text-xs leading-6 text-(--text-secondary)">
            Enter your last watched episode to mark
            all eligible episodes up to that number.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">

            <input
              type="number"
              min="1"
              max={selectedSeries.totalEpisodes}
              value={lastEpisode}
              onChange={event =>
                setLastEpisode(event.target.value)
              }
              aria-label="Last watched episode"
              placeholder={`1 - ${selectedSeries.totalEpisodes}`}
              className="min-w-0 flex-1 rounded-lg border border-orange-500/30 bg-(--page-bg) px-4 py-3 text-sm outline-none focus:border-orange-500"
            />

            <button
              type="button"
              onClick={markUntilEpisode}
              disabled={
                !lastEpisode ||
                !Number.isInteger(Number(lastEpisode)) ||
                Number(lastEpisode) < 1 ||
                Number(lastEpisode) >
                  selectedSeries.totalEpisodes
              }
              className="rounded-lg bg-orange-600 px-5 py-3 text-xs font-bold text-white hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Mark Watched
            </button>

          </div>

        </div>

        <div className="mt-6 flex flex-wrap gap-2">

          {[
            { id: 'all', label: 'All Episodes' },
            { id: 'watched', label: 'Watched' },
            { id: 'unwatched', label: 'Unwatched' },
          ].map(filter => (

            <button
              key={filter.id}
              type="button"
              aria-pressed={episodeFilter === filter.id}
              onClick={() => setEpisodeFilter(filter.id)}
              className={filterStyle(
                episodeFilter === filter.id
              )}
            >
              {filter.label}
            </button>

          ))}

        </div>

        <label className="mt-5 flex cursor-pointer items-center gap-3">

          <input
            type="checkbox"
            checked={skipFiller}
            onChange={event =>
              setSkipFiller(event.target.checked)
            }
            className="size-4 accent-orange-600"
          />

          <span className="text-sm text-(--text-secondary)">
            Exclude filler episodes
          </span>

        </label>

        <div className="my-6 flex flex-wrap items-center justify-between gap-3">

          <p className="text-xs text-(--text-secondary)">
            Showing {visibleEpisodes.length} episodes
          </p>

          <div className="flex flex-wrap gap-2">

            <button
              type="button"
              onClick={markVisibleEpisodes}
              disabled={visibleEpisodes.length === 0}
              className="rounded-lg border border-green-500/30 bg-green-500/5 px-3 py-2 text-xs font-bold text-green-500 hover:bg-green-500/15 disabled:opacity-40"
            >
              Mark All Visible
            </button>

            <button
              type="button"
              onClick={clearVisibleEpisodes}
              disabled={visibleEpisodes.length === 0}
              className="rounded-lg border border-red-500/30 bg-red-500/5 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-500/15 disabled:opacity-40"
            >
              Clear Visible
            </button>

          </div>

        </div>

        <div className="mb-5 flex flex-wrap gap-4 text-xs">

          {[
            ['Canon', 'bg-green-500'],
            ['Filler', 'bg-red-500'],
            ['Mixed', 'bg-amber-500'],
            ['Anime Canon', 'bg-blue-500'],
          ].map(([label, color]) => (

            <div
              key={label}
              className="flex items-center gap-2"
            >

              <span
                className={`size-2 rounded-full ${color}`}
              />

              <span className="text-(--text-secondary)">
                {label}
              </span>

            </div>

          ))}

        </div>

        {visibleEpisodes.length > 0 ? (

          <div className="grid max-h-[480px] grid-cols-5 gap-2 overflow-y-auto p-1 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12">

            {visibleEpisodes.map(episode => {
              const watched = watchedEpisodes.has(
                episode.id
              )

              return (
                <button
                  key={episode.id}
                  type="button"
                  aria-pressed={watched}
                  aria-label={`Episode ${episode.number}, ${episode.type}, ${watched ? 'watched' : 'unwatched'}`}
                  title={`Episode ${episode.number} — ${episode.type}`}
                  onClick={() =>
                    toggleEpisode(episode.id)
                  }
                  className={`relative flex min-h-12 flex-col items-center justify-center rounded-lg border text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 ${
                    watched
                      ? 'border-green-500/50 bg-green-500/15 text-green-500'
                      : `bg-(--card-bg) ${episodeColors[episode.type]}`
                  }`}
                >

                  {episode.number}

                  {watched && (
                    <span className="text-[10px]">
                      ✓
                    </span>
                  )}

                </button>
              )
            })}

          </div>

        ) : (

          <div className="rounded-xl border border-dashed border-orange-500/20 py-12 text-center">

            <p className="text-4xl text-orange-500/40">
              巻
            </p>

            <p className="mt-4 text-sm text-(--text-secondary)">
              No episodes match your filters.
            </p>

          </div>

        )}

      </section>

      <section className="mt-10 rounded-2xl border border-orange-500/20 bg-(--page-bg) p-4 sm:p-6">

        <header className="mb-6">

          <p className="text-xs font-bold tracking-widest text-(--accent)">
            CINEMA RECORDS
          </p>

          <h4 className="mt-3 text-xl">
            MARK YOUR MOVIES
          </h4>

          <p className="mt-3 text-sm text-(--text-secondary)">
            {watchedMovies.size} of {watchMovies.length}
            {' '}movies watched
          </p>

        </header>

        <div className="grid gap-3 md:grid-cols-2">

          {watchMovies.map(movie => {
            const watched = watchedMovies.has(movie.id)

            return (
              <button
                key={movie.id}
                type="button"
                aria-pressed={watched}
                onClick={() => toggleMovie(movie.id)}
                className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-300 ${
                  watched
                    ? 'border-green-500/40 bg-green-500/10'
                    : 'border-orange-500/20 bg-(--card-bg) hover:border-orange-500'
                }`}
              >

                <span className={`flex size-10 shrink-0 items-center justify-center rounded-lg border text-xl ${
                  watched
                    ? 'border-green-500/40 text-green-500'
                    : 'border-orange-500/30 text-(--accent)'
                }`}>
                  {watched ? '✓' : '映'}
                </span>

                <div className="min-w-0 flex-1">

                  <p className="text-sm font-semibold">
                    {movie.title}
                  </p>

                  <p className="mt-2 text-xs text-(--text-secondary)">
                    {movie.year} · {movie.canon
                      ? 'Canon'
                      : 'Non-canon'}
                  </p>

                </div>

                <span className={`text-xs ${
                  watched
                    ? 'text-green-500'
                    : 'text-(--text-secondary)'
                }`}>
                  {watched ? 'Watched' : 'Unwatched'}
                </span>

              </button>
            )
          })}

        </div>

      </section>

      <section className="mt-10 rounded-xl border border-orange-500/20 bg-(--page-bg) p-6 text-center">

        <p className="text-3xl text-(--accent)">
          封
        </p>

        <h4 className="mt-4 text-xl">
          YOUR JOURNEY IS RECORDED
        </h4>

        <p
          role="status"
          className={`mt-4 text-sm ${
            storageError
              ? 'text-red-500'
              : 'text-green-500'
          }`}
        >
          {storageError
            ? 'Progress could not be saved on this device.'
            : 'Your progress is automatically saved on this device.'}
        </p>

        <p className="mx-auto mt-3 max-w-lg text-xs leading-6 text-(--text-secondary)">
          No account is required. Your records are stored
          locally in your browser.
        </p>

        <button
          type="button"
          onClick={() => setShowReset(true)}
          className="mt-6 rounded-lg border border-red-500/30 px-5 py-3 text-xs font-bold text-red-500 hover:bg-red-500/10"
        >
          Reset All Progress
        </button>

      </section>

      {showReset && (

        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm">

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-progress-title"
            className="w-full max-w-md rounded-2xl border border-red-500/40 bg-(--card-bg) p-8 text-center"
          >

            <p className="text-5xl text-red-500">
              印
            </p>

            <h4
              id="reset-progress-title"
              className="mt-5 text-xl"
            >
              RESET YOUR JOURNEY?
            </h4>

            <p className="mt-4 text-sm leading-7 text-(--text-secondary)">
              All watched episodes and movies will be
              cleared. This action cannot be undone.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">

              <button
                type="button"
                autoFocus
                onClick={() => setShowReset(false)}
                className="rounded-lg border border-orange-500/30 px-4 py-3 text-sm font-bold hover:bg-orange-500/10"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={resetProgress}
                className="rounded-lg bg-red-600 px-4 py-3 text-sm font-bold text-white hover:bg-red-500"
              >
                Reset
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default WatchProgress
