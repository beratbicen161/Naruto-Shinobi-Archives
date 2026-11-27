
import { useState } from 'react'
import { watchSeries, episodeTypes } from '../data/watchGuide'

const episodeStyles = {
  canon: {
    button: 'border-green-500/40 bg-green-500/10 text-green-500 hover:bg-green-500/25',
    dot: 'bg-green-500',
    text: 'text-green-500',
  },
  filler: {
    button: 'border-red-500/40 bg-red-500/10 text-red-500 hover:bg-red-500/25',
    dot: 'bg-red-500',
    text: 'text-red-500',
  },
  mixed: {
    button: 'border-amber-500/40 bg-amber-500/10 text-amber-500 hover:bg-amber-500/25',
    dot: 'bg-amber-500',
    text: 'text-amber-500',
  },
  'anime-canon': {
    button: 'border-blue-500/40 bg-blue-500/10 text-blue-500 hover:bg-blue-500/25',
    dot: 'bg-blue-500',
    text: 'text-blue-500',
  },
}

const filters = [
  { id: 'all', label: 'All Episodes' },
  ...episodeTypes,
]

function FillerGuide() {
  const [selectedSeries, setSelectedSeries] = useState('naruto')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedEpisode, setSelectedEpisode] = useState(null)

  const series = watchSeries.find(
    item => item.id === selectedSeries
  )

  const filteredEpisodes = series.episodes.filter(episode => {
    const matchesFilter =
      selectedFilter === 'all' ||
      episode.type === selectedFilter

    const matchesSearch =
      search === '' ||
      episode.number === Number(search)

    return matchesFilter && matchesSearch
  })

  const fillerCount = series.episodes.filter(
    episode => episode.type === 'filler'
  ).length

  const recommendedCount =
    series.totalEpisodes - fillerCount

  const fillerPercentage = (
    fillerCount / series.totalEpisodes * 100
  ).toFixed(1)

  const selectedType = selectedEpisode
    ? episodeTypes.find(
        type => type.id === selectedEpisode.type
      )
    : null

  function changeSeries(id) {
    setSelectedSeries(id)
    setSelectedFilter('all')
    setSearch('')
    setSelectedEpisode(null)
  }

  function changeFilter(id) {
    setSelectedFilter(id)
    setSelectedEpisode(null)
  }

  function clearFilters() {
    setSelectedFilter('all')
    setSearch('')
    setSelectedEpisode(null)
  }

  return (
    <div>

      <header className="mb-10 text-center">

        <p className="mb-3 text-xs font-bold tracking-[0.3em] text-(--accent)">
          SHINOBI EPISODE ARCHIVES
        </p>

        <h3 className="text-2xl md:text-4xl">
          FILLER GUIDE
        </h3>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-(--text-secondary)">
          Explore every episode of Naruto and Naruto Shippuden.
          Discover which episodes follow the main story
          and which ones are optional adventures.
        </p>

      </header>

      <div className="grid gap-4 sm:grid-cols-2">

        {watchSeries.map(item => (
          <button
            key={item.id}
            type="button"
            aria-pressed={selectedSeries === item.id}
            onClick={() => changeSeries(item.id)}
            className={`group relative overflow-hidden rounded-xl border p-6 text-left transition-all duration-300 ${
              selectedSeries === item.id
                ? 'border-orange-500 bg-orange-600 text-white shadow-[0_0_25px_rgba(249,115,22,0.2)]'
                : 'border-orange-500/20 bg-(--page-bg) hover:border-orange-500'
            }`}
          >

            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-8 right-0 select-none text-[130px] opacity-10"
            >
              忍
            </span>

            <div className="relative">

              <p className="text-xs font-bold tracking-widest opacity-80">
                {item.years}
              </p>

              <h4 className="mt-3 text-xl md:text-2xl">
                {item.title}
              </h4>

              <p className="mt-2 text-sm opacity-80">
                {item.totalEpisodes} Episodes
              </p>

              <p className="mt-4 text-lg tracking-widest opacity-80">
                {item.japaneseTitle}
              </p>

            </div>

          </button>
        ))}

      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">

        <div className="rounded-xl border border-orange-500/20 bg-(--page-bg) p-4 text-center">

          <p className="text-2xl font-bold text-(--accent)">
            {series.totalEpisodes}
          </p>

          <p className="mt-2 text-xs text-(--text-secondary)">
            Total Episodes
          </p>

        </div>

        <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-4 text-center">

          <p className="text-2xl font-bold text-green-500">
            {recommendedCount}
          </p>

          <p className="mt-2 text-xs text-(--text-secondary)">
            Recommended
          </p>

        </div>

        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-center">

          <p className="text-2xl font-bold text-red-500">
            {fillerCount}
          </p>

          <p className="mt-2 text-xs text-(--text-secondary)">
            Filler Episodes
          </p>

        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-center">

          <p className="text-2xl font-bold text-amber-500">
            {fillerPercentage}%
          </p>

          <p className="mt-2 text-xs text-(--text-secondary)">
            Filler Ratio
          </p>

        </div>

      </div>

      <div className="mt-6 rounded-xl border border-orange-500/20 bg-(--page-bg) p-5">

        <div className="mb-3 flex justify-between gap-3 text-xs font-semibold">

          <span className="text-green-500">
            Recommended
          </span>

          <span className="text-red-500">
            Filler
          </span>

        </div>

        <div className="flex h-3 overflow-hidden rounded-full bg-gray-500/20">

          <div
            className="bg-green-500 transition-all duration-500"
            style={{
              width: `${recommendedCount / series.totalEpisodes * 100}%`,
            }}
          />

          <div
            className="bg-red-500 transition-all duration-500"
            style={{
              width: `${fillerCount / series.totalEpisodes * 100}%`,
            }}
          />

        </div>

      </div>

      <section className="mt-10">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <h4 className="text-xl">
            EPISODE DATABASE
          </h4>

          <button
            type="button"
            onClick={clearFilters}
            className="rounded-lg border border-orange-500/30 px-4 py-2 text-xs font-semibold text-(--accent) hover:bg-orange-500/10"
          >
            Reset Filters
          </button>

        </div>

        <div className="relative mt-5">

          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-(--accent)"
          >
            ⌕
          </span>

          <input
            type="text"
            inputMode="numeric"
            value={search}
            aria-label="Search episode number"
            onChange={event => {
              setSearch(
                event.target.value.replace(/\D/g, '')
              )
              setSelectedEpisode(null)
            }}
            placeholder="Search episode number..."
            className="w-full rounded-xl border border-orange-500/30 bg-(--page-bg) py-4 pl-10 pr-5 text-sm text-(--text-primary) outline-none placeholder:text-(--text-secondary) focus:border-orange-500"
          />

        </div>

        <div className="mt-5 flex flex-wrap gap-2">

          {filters.map(filter => {
            const count = filter.id === 'all'
              ? series.totalEpisodes
              : series.episodes.filter(
                  episode => episode.type === filter.id
                ).length

            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={selectedFilter === filter.id}
                onClick={() => changeFilter(filter.id)}
                className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-xs font-semibold transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? 'border-orange-500 bg-orange-600 text-white'
                    : 'border-orange-500/20 bg-(--page-bg) text-(--text-secondary) hover:border-orange-500'
                }`}
              >

                {filter.id !== 'all' && (
                  <span className={`size-2 rounded-full ${episodeStyles[filter.id].dot}`} />
                )}

                {filter.label}

                <span className="opacity-70">
                  ({count})
                </span>

              </button>
            )
          })}

        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">

          <p className="text-sm text-(--text-secondary)">
            Showing {filteredEpisodes.length} of{' '}
            {series.totalEpisodes} episodes
          </p>

          <p className="text-xs text-(--accent)">
            Select an episode to inspect
          </p>

        </div>

        {selectedEpisode && selectedType && (
          <article className="relative mt-6 overflow-hidden rounded-xl border border-orange-500/40 bg-(--page-bg) p-6">

            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-12 right-0 select-none text-[160px] text-orange-500/10"
            >
              {selectedEpisode.number}
            </span>

            <button
              type="button"
              aria-label="Close episode details"
              onClick={() => setSelectedEpisode(null)}
              className="absolute right-4 top-4 z-10 rounded-lg border border-orange-500/20 px-3 py-1 text-(--accent) hover:bg-orange-500/10"
            >
              ✕
            </button>

            <div className="relative">

              <p className="text-xs font-bold tracking-[0.2em] text-(--accent)">
                EPISODE RECORD
              </p>

              <h4 className="mt-3 text-2xl">
                Episode {selectedEpisode.number}
              </h4>

              <p className="mt-2 text-sm text-(--text-secondary)">
                {series.title}
              </p>

              <div className={`mt-4 inline-flex items-center gap-2 rounded-lg border border-current px-3 py-2 text-xs font-bold ${episodeStyles[selectedEpisode.type].text}`}>

                <span className={`size-2 rounded-full ${episodeStyles[selectedEpisode.type].dot}`} />

                {selectedType.label}

              </div>

              <p className="mt-4 max-w-xl text-sm leading-7 text-(--text-secondary)">
                {selectedType.description}
              </p>

              <p className={`mt-4 text-sm font-bold ${
                selectedEpisode.type === 'filler'
                  ? 'text-red-500'
                  : 'text-green-500'
              }`}>
                {selectedEpisode.type === 'filler'
                  ? 'Recommendation: Optional'
                  : 'Recommendation: Watch'}
              </p>

            </div>

          </article>
        )}

        {filteredEpisodes.length > 0 ? (

          <div className="mt-6 grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12">

            {filteredEpisodes.map(episode => (
              <button
                key={episode.id}
                type="button"
                aria-label={`Episode ${episode.number}, ${episode.type}`}
                aria-pressed={selectedEpisode?.id === episode.id}
                title={`Episode ${episode.number} - ${episode.type}`}
                onClick={() => setSelectedEpisode(episode)}
                className={`relative flex aspect-square items-center justify-center rounded-lg border text-sm font-bold transition-all duration-200 hover:-translate-y-1 ${
                  episodeStyles[episode.type].button
                } ${
                  selectedEpisode?.id === episode.id
                    ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-(--card-bg)'
                    : ''
                }`}
              >

                {episode.number}

              </button>
            ))}

          </div>

        ) : (

          <div className="mt-6 rounded-xl border border-dashed border-orange-500/30 bg-(--page-bg) px-6 py-16 text-center">

            <p className="text-5xl text-orange-500/50">
              巻
            </p>

            <h4 className="mt-5 text-xl">
              NO EPISODES FOUND
            </h4>

            <p className="mt-3 text-sm text-(--text-secondary)">
              Try another episode number or change your filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-500"
            >
              Clear Filters
            </button>

          </div>

        )}

      </section>

      <div className="mt-10 rounded-xl border border-orange-500/20 bg-(--page-bg) p-5">

        <p className="mb-5 text-center text-xs font-bold tracking-[0.2em] text-(--accent)">
          EPISODE CLASSIFICATION LEGEND
        </p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

          {episodeTypes.map(type => (
            <div
              key={type.id}
              className="flex items-center justify-center gap-2"
            >

              <span className={`size-3 rounded-full ${episodeStyles[type.id].dot}`} />

              <span className="text-xs font-semibold text-(--text-secondary)">
                {type.label}
              </span>

            </div>
          ))}

        </div>

      </div>

    </div>
  )
}

export default FillerGuide
