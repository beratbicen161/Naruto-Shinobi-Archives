
import { useState } from 'react'
import { watchSeries, watchMovies } from '../data/watchGuide'

function createTimeline(series) {
  const movies = watchMovies
    .filter(movie => movie.seriesId === series.id)
    .sort((a, b) => a.afterEpisode - b.afterEpisode)

  const timeline = []
  let startEpisode = 1

  movies.forEach(movie => {
    if (startEpisode <= movie.afterEpisode) {
      timeline.push({
        id: `${series.id}-${startEpisode}-${movie.afterEpisode}`,
        type: 'episodes',
        start: startEpisode,
        end: movie.afterEpisode,
      })
    }

    timeline.push({
      ...movie,
      id: `movie-${movie.id}`,
      type: 'movie',
    })

    startEpisode = movie.afterEpisode + 1
  })

  if (startEpisode <= series.totalEpisodes) {
    timeline.push({
      id: `${series.id}-${startEpisode}-${series.totalEpisodes}`,
      type: 'episodes',
      start: startEpisode,
      end: series.totalEpisodes,
    })
  }

  return timeline
}

function EpisodeStep({ item, series }) {
  const episodes = series.episodes.filter(
    episode =>
      episode.number >= item.start &&
      episode.number <= item.end
  )

  const fillerCount = episodes.filter(
    episode => episode.type === 'filler'
  ).length

  const recommendedCount = episodes.length - fillerCount

  return (
    <article className="relative rounded-xl border border-orange-500/20 bg-(--page-bg) p-5 transition-all duration-300 hover:border-orange-500/60 md:p-6">

      <div className="absolute -left-12 top-6 flex size-8 items-center justify-center rounded-full border-2 border-orange-500 bg-(--page-bg) text-orange-500">
        ▶
      </div>

      <p className="text-xs font-bold tracking-[0.2em] text-(--accent)">
        CONTINUE WATCHING
      </p>

      <h4 className="mt-3 text-lg md:text-2xl">
        {item.start === item.end
          ? `Episode ${item.start}`
          : `Episodes ${item.start} – ${item.end}`}
      </h4>

      <p className="mt-2 text-sm text-(--text-secondary)">
        {series.title}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">

        <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600">
          {recommendedCount} Recommended
        </span>

        {fillerCount > 0 && (
          <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-500">
            {fillerCount} Filler
          </span>
        )}

        <span className="rounded-full border border-orange-500/20 px-3 py-1 text-xs text-(--text-secondary)">
          {episodes.length} Episodes
        </span>

      </div>

      <div className="mt-5 flex h-2 overflow-hidden rounded-full bg-gray-500/20">

        <div
          className="bg-green-500"
          style={{
            width: `${(recommendedCount / episodes.length) * 100}%`,
          }}
        />

        <div
          className="bg-red-500"
          style={{
            width: `${(fillerCount / episodes.length) * 100}%`,
          }}
        />

      </div>

    </article>
  )
}

function MovieStep({ item }) {
  return (
    <article className={`group relative overflow-visible rounded-xl border p-5 transition-all duration-300 md:p-6 ${
      item.canon
        ? 'border-orange-500/50 bg-orange-500/10 hover:border-orange-500'
        : 'border-yellow-600/30 bg-yellow-500/5 hover:border-yellow-500/70'
    }`}>

      <div className={`absolute -left-12 top-6 flex size-8 items-center justify-center rounded-full border-2 bg-(--page-bg) ${
        item.canon
          ? 'border-orange-500 text-orange-500'
          : 'border-yellow-500 text-yellow-500'
      }`}>
        映
      </div>

      <div className="flex items-start gap-4">

        <div className="hidden size-20 shrink-0 items-center justify-center rounded-xl border border-yellow-500/30 bg-yellow-500/10 text-4xl text-yellow-600 transition-transform duration-300 group-hover:scale-105 sm:flex">
          映
        </div>

        <div className="min-w-0 flex-1">

          <p className={`text-xs font-bold tracking-[0.2em] ${
            item.canon
              ? 'text-(--accent)'
              : 'text-yellow-600'
          }`}>
            {item.canon ? 'CANON MOVIE' : 'OPTIONAL MOVIE'}
          </p>

          <h4 className="mt-3 text-lg leading-relaxed md:text-xl">
            {item.title}
          </h4>

          <p className="mt-2 text-sm text-(--text-secondary)">
            Released in {item.year}
          </p>

          <div className="mt-4 inline-flex rounded-lg border border-orange-500/20 bg-(--page-bg) px-3 py-2 text-xs font-semibold text-(--accent)">
            Watch after episode {item.afterEpisode}
          </div>

        </div>

      </div>

    </article>
  )
}

function WatchOrder() {
  const [showOptionalMovies, setShowOptionalMovies] = useState(true)

  return (
    <div>

      <header className="mb-10 text-center">

        <p className="mb-3 text-xs font-bold tracking-[0.3em] text-(--accent)">
          FOLLOW THE SHINOBI PATH
        </p>

        <h3 className="text-2xl md:text-4xl">
          THE WATCHING ORDER
        </h3>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-(--text-secondary)">
          Follow the recommended viewing order from the
          beginning of Naruto to the end of Naruto Shippuden.
          Discover when to watch each movie without unnecessary
          spoilers.
        </p>

      </header>

      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-orange-500/20 bg-(--page-bg) p-4">

        <div>
          <p className="text-sm font-bold">
            Include Optional Movies
          </p>

          <p className="mt-1 text-xs text-(--text-secondary)">
            Show non-canon movies in your journey.
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={showOptionalMovies}
          aria-label="Include optional movies"
          onClick={() => setShowOptionalMovies(value => !value)}
          className={`relative h-7 w-14 shrink-0 rounded-full border transition-colors duration-300 ${
            showOptionalMovies
              ? 'border-orange-500 bg-orange-600'
              : 'border-gray-500 bg-gray-500/30'
          }`}
        >
          <span className={`absolute left-1 top-0.5 size-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
            showOptionalMovies ? 'translate-x-7' : 'translate-x-0'
          }`} />
        </button>

      </div>

      {watchSeries.map((series, index) => {
        const timeline = createTimeline(series)

        return (
          <section key={series.id} className="mb-14">

            <header className="relative overflow-hidden rounded-2xl border border-orange-500/30 bg-(--page-bg) p-6 md:p-8">

              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-12 right-0 select-none text-[180px] text-orange-500/10"
              >
                忍
              </span>

              <div className="relative">

                <p className="text-xs font-bold tracking-[0.3em] text-(--accent)">
                  CHAPTER 0{index + 1}
                </p>

                <h3 className="mt-3 text-2xl uppercase md:text-4xl">
                  {series.title}
                </h3>

                <p className="mt-3 text-lg tracking-widest text-(--accent)">
                  {series.japaneseTitle}
                </p>

                <div className="mt-4 flex flex-wrap gap-3 text-sm text-(--text-secondary)">

                  <span>{series.years}</span>

                  <span>•</span>

                  <span>{series.totalEpisodes} Episodes</span>

                </div>

                <p className="mt-4 max-w-xl text-sm leading-7 text-(--text-secondary)">
                  {series.description}
                </p>

              </div>

            </header>

            <div className="relative ml-4 mt-8 space-y-5 border-l-2 border-orange-500/30 pl-8">

              {timeline.map(item => {
                if (item.type === 'movie') {
                  if (!showOptionalMovies && !item.canon) {
                    return null
                  }

                  return (
                    <MovieStep
                      key={item.id}
                      item={item}
                    />
                  )
                }

                return (
                  <EpisodeStep
                    key={item.id}
                    item={item}
                    series={series}
                  />
                )
              })}

              <div className="relative py-5">

                <div className="absolute -left-12 top-5 flex size-8 items-center justify-center rounded-full border-2 border-green-500 bg-(--page-bg) text-green-500">
                  ✓
                </div>

                <p className="font-bold text-green-600">
                  {series.title} Completed
                </p>

                <p className="mt-2 text-sm text-(--text-secondary)">
                  {index === 0
                    ? 'Your next destination is Naruto Shippuden.'
                    : 'You have reached the end of the shinobi journey.'}
                </p>

              </div>

            </div>

          </section>
        )
      })}

      <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-6 text-center">

        <p className="text-3xl text-(--accent)">
          火の意志
        </p>

        <h4 className="mt-4 text-xl">
          THE WILL OF FIRE
        </h4>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-(--text-secondary)">
          Every shinobi has their own journey.
          Watch every adventure or follow the essential
          storyline. The choice is yours.
        </p>

      </div>

      <p className="mt-6 text-center text-xs leading-6 text-(--text-secondary)">
        Movie placement is a suggested viewing order.
        Most Naruto movies are optional side stories and
        do not have an official chronological placement.
      </p>

    </div>
  )
}

export default WatchOrder
