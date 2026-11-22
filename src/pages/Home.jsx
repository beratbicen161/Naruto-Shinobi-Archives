
import { Link } from 'react-router-dom'
import ExploreSection from '../components/ExploreSection'
import FeaturedShinobi from '../components/FeaturedShinobi'
import ShinobiBackground from '../components/ShinobiBackground'

function Home() {
  return (
    <main className="bg-[#15191F]">
      <section
        className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6 py-20"
        style={{
          backgroundImage: "url('/images/konoha-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#15191F] via-transparent to-[#15191F]/30" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">
            Hidden Leaf Records
          </p>

          <h1 className="hero-title text-4xl font-bold text-[#F1E3C6] sm:text-5xl lg:text-7xl">
            ENTER THE
            <span className="block text-orange-500">
              SHINOBI WORLD
            </span>
          </h1>

          <p className="hero-description mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-200 sm:text-lg">
            Discover legendary shinobi, ancient clans,
            hidden villages and powerful jutsus.
            Uncover the secrets of the Naruto universe.
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              to="/characters"
              className="rounded-lg border border-orange-400 bg-orange-600 px-8 py-4 font-semibold text-white shadow-lg shadow-orange-900/30 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500"
            >
              Explore Shinobi World
            </Link>
          </div>

          <p className="mt-8 text-xs uppercase tracking-[0.25em] text-gray-300">
            The Will of Fire Lives On
          </p>

        </div>
      </section>

      <div className="shinobi-animated-area">
        <ShinobiBackground />

        <div className="shinobi-animated-content">
          <ExploreSection />
          <FeaturedShinobi />
        </div>
      </div>

    </main>
  )
}

export default Home
