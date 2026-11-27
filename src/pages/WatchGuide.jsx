
import { useState } from 'react'
import { watchStatistics, episodeTypes } from '../data/watchGuide'
import WatchOrder from '../components/WatchOrder'
import FillerGuide from '../components/FillerGuide'
import MovieGuide from '../components/MovieGuide'
import WatchProgress from '../components/WatchProgress'

const tabs = [
  { id: 'order', label: 'Watch Order', symbol: '巻' },
  { id: 'episodes', label: 'Filler Guide', symbol: '忍' },
  { id: 'movies', label: 'Movies', symbol: '映' },
  { id: 'progress', label: 'My Progress', symbol: '印' },
]

const typeStyles = {
  canon: {
    card: 'border-green-500/30 bg-green-500/5',
    text: 'text-green-500',
    dot: 'bg-green-500',
  },
  filler: {
    card: 'border-red-500/30 bg-red-500/5',
    text: 'text-red-500',
    dot: 'bg-red-500',
  },
  mixed: {
    card: 'border-amber-500/30 bg-amber-500/5',
    text: 'text-amber-500',
    dot: 'bg-amber-500',
  },
  'anime-canon': {
    card: 'border-blue-500/30 bg-blue-500/5',
    text: 'text-blue-500',
    dot: 'bg-blue-500',
  },
}

function WatchGuide() {
  const [activeTab, setActiveTab] = useState('order')

  const statistics = [
    {
      label: 'Total Episodes',
      value: watchStatistics.totalEpisodes,
      symbol: '忍',
    },
    {
      label: 'Anime Series',
      value: watchStatistics.totalSeries,
      symbol: '巻',
    },
    {
      label: 'Movies',
      value: watchStatistics.totalMovies,
      symbol: '映',
    },
    {
      label: 'Filler Episodes',
      value: watchStatistics.filler,
      symbol: '印',
    },
  ]

  return (
    <main className="min-h-screen bg-(--page-bg) text-(--text-primary)">

      <section
        className="relative flex min-h-[480px] items-center justify-center overflow-hidden bg-cover bg-center px-6 py-20"
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}images/konoha-bg.png')`,
        }}
      >

        <div className="absolute inset-0 bg-black/65" />

        <div className="absolute inset-0 bg-linear-to-t from-[#15191F] via-transparent to-black/30" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">

          <p className="mb-5 text-xs font-bold uppercase tracking-[0.4em] text-orange-400">
            Hidden Leaf Archives
          </p>

          <p className="mb-6 text-4xl tracking-[0.4em] text-orange-500">
            忍 巻 映
          </p>

          <h1 className="text-4xl leading-relaxed text-[#F1E3C6] sm:text-5xl lg:text-7xl">
            HOW TO WATCH

            <span className="mt-3 block text-orange-500">
              NARUTO
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-gray-200 sm:text-base">
            Begin your shinobi journey with the complete
            Naruto and Naruto Shippuden watching guide.
            Discover the correct viewing order, filler
            episodes and cinematic adventures.
          </p>

          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-orange-300">
            Every Shinobi Has a Beginning
          </p>

        </div>

      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

          {statistics.map(stat => (
            <article
              key={stat.label}
              className="rounded-xl border border-orange-500/30 bg-(--card-bg) p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-orange-500"
            >

              <p className="text-3xl text-(--accent)">
                {stat.symbol}
              </p>

              <p className="mt-4 text-3xl font-bold text-(--accent) sm:text-4xl">
                {stat.value}
              </p>

              <p className="mt-3 text-xs uppercase tracking-wider text-(--text-secondary)">
                {stat.label}
              </p>

            </article>
          ))}

        </div>

        <section className="mt-16">

          <div className="mb-8 text-center">

            <p className="text-xs font-bold tracking-[0.3em] text-(--accent)">
              KNOW BEFORE YOU WATCH
            </p>

            <h2 className="mt-4 text-2xl sm:text-4xl">
              WHAT IS FILLER?
            </h2>

          </div>

          <div className="relative mx-auto max-w-5xl px-3 sm:px-6">

            <div className="absolute inset-y-0 left-0 z-10 w-5 rounded-full border border-[#50321D] bg-linear-to-r from-[#402617] via-[#A77946] to-[#402617] shadow-lg sm:w-8" />

            <div className="absolute inset-y-0 right-0 z-10 w-5 rounded-full border border-[#50321D] bg-linear-to-r from-[#402617] via-[#A77946] to-[#402617] shadow-lg sm:w-8" />

            <div className="relative overflow-hidden border-y-4 border-[#A77946] bg-linear-to-br from-[#F1E3C6] via-[#D8C7A3] to-[#C7AA7A] px-8 py-10 text-[#38291D] shadow-xl sm:px-14">

              <div className="pointer-events-none absolute right-8 top-4 text-8xl text-[#795536]/10">
                巻
              </div>

              <p className="text-center text-4xl text-[#A33D20]">
                忍
              </p>

              <h3 className="mt-4 text-center text-2xl text-[#57351F]">
                THE SHINOBI SCROLL
              </h3>

              <div className="mx-auto my-6 h-px max-w-xs bg-[#795536]/40" />

              <p className="text-sm leading-8 sm:text-base">
                Filler episodes are anime-original stories
                that are not directly adapted from the
                original Naruto manga. They often explore
                additional missions, characters and adventures
                outside the main storyline.
              </p>

              <p className="mt-5 text-sm leading-8 sm:text-base">
                You can generally skip filler episodes
                without missing the main plot. However,
                some filler stories provide additional
                character development and enjoyable moments.
              </p>

              <p className="mt-5 text-sm font-bold leading-8 text-[#A33D20] sm:text-base">
                For the main story, watch Canon, Mixed
                and Anime Canon episodes. Filler episodes
                are optional.
              </p>

            </div>

          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {episodeTypes.map(type => (
              <article
                key={type.id}
                className={`rounded-xl border p-5 ${typeStyles[type.id].card}`}
              >

                <div className="flex items-center gap-3">

                  <span
                    className={`size-3 rounded-full ${typeStyles[type.id].dot}`}
                  />

                  <h3 className={`text-lg ${typeStyles[type.id].text}`}>
                    {type.label}
                  </h3>

                </div>

                <p className="mt-4 text-sm leading-7 text-(--text-secondary)">
                  {type.description}
                </p>

                <p className={`mt-4 text-xs font-bold uppercase tracking-wider ${typeStyles[type.id].text}`}>
                  {type.recommendation}
                </p>

              </article>
            ))}

          </div>

        </section>

        <section className="mt-20">

          <div className="mb-10 text-center">

            <p className="text-xs font-bold tracking-[0.3em] text-(--accent)">
              CHOOSE YOUR PATH
            </p>

            <h2 className="mt-4 text-2xl sm:text-4xl">
              YOUR SHINOBI JOURNEY
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-(--text-secondary)">
              Explore the watching order, discover filler
              episodes, browse movies and track your journey.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

            {tabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                aria-pressed={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex flex-col items-center justify-center rounded-xl border px-4 py-5 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-orange-500 bg-orange-600 text-white shadow-[0_0_20px_rgba(249,115,22,0.25)]'
                    : 'border-orange-500/25 bg-(--card-bg) text-(--text-secondary) hover:-translate-y-1 hover:border-orange-500'
                }`}
              >

                <span className={`text-3xl ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-(--accent)'
                }`}>
                  {tab.symbol}
                </span>

                <span className="mt-3 text-xs font-bold sm:text-sm">
                  {tab.label}
                </span>

              </button>
            ))}

          </div>

          <div className="mt-6 min-w-0 rounded-2xl border border-orange-500/20 bg-(--card-bg) p-4 sm:p-6 lg:p-8">

            {activeTab === 'order' && (
              <WatchOrder />
            )}

            {activeTab === 'episodes' && (
              <FillerGuide />
            )}

            {activeTab === 'movies' && (
              <MovieGuide />
            )}

            {activeTab === 'progress' && (
              <WatchProgress />
            )}

          </div>

        </section>

        <footer className="mt-16 border-t border-orange-500/20 py-12 text-center">

          <p className="text-4xl text-(--accent)">
            火の意志
          </p>

          <h3 className="mt-5 text-xl sm:text-2xl">
            THE WILL OF FIRE LIVES ON
          </h3>

          <p className="mt-4 text-sm text-(--text-secondary)">
            Every episode is another step on your shinobi path.
          </p>

        </footer>

      </section>

    </main>
  )
}

export default WatchGuide
