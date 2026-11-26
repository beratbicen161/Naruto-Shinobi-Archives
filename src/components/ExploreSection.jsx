import { Link } from 'react-router-dom'

const archives = [
  {
    title: 'Characters',
    description: 'Discover legendary shinobi.',
    path: '/characters',
    symbol: '忍',
    image: '/images/scroll-characters.png',
    emblem: '/images/emblem-characters.png',
    color: '#F97316',
    effect: 'characters',
  },
  {
    title: 'Clans',
    description: 'Explore powerful bloodlines.',
    path: '/clans',
    symbol: '族',
    image: '/images/scroll-clans.png',
    emblem: '/images/emblem-clans.png',
    color: '#DC2626',
    effect: 'clans',
  },
  {
    title: 'Villages',
    description: 'Visit the hidden villages.',
    path: '/villages',
    symbol: '里',
    image: '/images/scroll-villages.png',
    emblem: '/images/emblem-villages.png',
    color: '#65A30D',
    effect: 'villages',
  },
  {
    title: 'Bingo Book',
    description: 'Investigate wanted shinobi.',
    path: '/bingo-book',
    symbol: '書',
    image: '/images/scroll-bingo.png',
    emblem: '/images/emblem-bingo.png',
    color: '#9333EA',
    effect: 'bingo',
  },
]

function ExploreSection() {
  return (
    <section className="relative overflow-hidden bg-[#15191F] px-5 py-24">
      <div className="relative z-10 mx-auto max-w-7xl">

        <div className="mb-14 text-center">
          <p className="mb-3 text-sm tracking-[0.3em] text-orange-400">
            EXPLORE THE ARCHIVES
          </p>

          <h2 className="text-3xl font-bold text-[#F1E3C6] md:text-5xl">
            Discover the Shinobi World
          </h2>

          <p className="mt-4 text-gray-400">
            Choose your path through the hidden records.
          </p>
        </div>

        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
          {archives.map((archive, index) => (
            <Link
              key={archive.path}
              to={archive.path}
              aria-label={`Explore ${archive.title}`}
              className="ninja-scroll group relative block aspect-[2/3] w-full max-w-[270px]"
              style={{
                '--scroll-delay': `${index * 0.15}s`,
                '--chakra-color': archive.color,
              }}
            >

              <img
                src={archive.image}
                alt=""
                className="absolute inset-0 h-full w-full object-fill"
              />

              <div className="chakra-particles" aria-hidden="true">
                {Array.from({ length: 8 }, (_, i) => (
                  <span
                    key={i}
                    className="chakra-particle"
                    style={{
                      '--particle-index': i,
                      '--particle-delay': `${i * -0.45}s`,
                      '--particle-duration': `${2.8 + (i % 3) * 0.6}s`,
                    }}
                  />
                ))}
              </div>

              <div className="absolute inset-0 flex flex-col items-center px-[14%] pb-[16%] pt-[22%] text-center text-[#321B12]">

                <span className="text-3xl font-black leading-none">
                  {archive.symbol}
                </span>

                <div className="mt-3 flex min-h-0 flex-1 items-center justify-center">

                  <div className={`chakra-emblem chakra-emblem--${archive.effect}`}>

                    <span
                      className="chakra-emblem-ring"
                      aria-hidden="true"
                    />

                    <img
                      src={archive.emblem}
                      alt=""
                      className="chakra-emblem-image"
                    />

                  </div>

                </div>

                <div className="flex flex-col items-center">
                  <h3 className="font-serif text-[clamp(17px,1.7vw,26px)] font-bold italic leading-tight">
                    {archive.title}
                  </h3>

                  <div className="my-2 h-[2px] w-16 bg-[#9B3C23]/60" />

                  <p className="max-w-[160px] text-xs leading-relaxed">
                    {archive.description}
                  </p>

                  <span className="mt-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#B56B35] bg-[#542719] text-xl text-[#F6D7A6] transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>

              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}

export default ExploreSection