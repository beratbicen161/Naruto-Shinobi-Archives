
import { Link } from 'react-router-dom'

const featuredCharacters = [
  {
    name: 'Naruto Uzumaki',
    subtitle: 'Hidden Leaf Village',
    image: '/images/naruto.png',
  },
  {
    name: 'Sasuke Uchiha',
    subtitle: 'Uchiha Clan',
    image: '/images/sasuke.png',
  },
  {
    name: 'Sakura Haruno',
    subtitle: 'Medical Ninja',
    image: '/images/sakura.png',
  },
  {
    name: 'Kakashi Hatake',
    subtitle: 'Copy Ninja',
    image: '/images/kakashi.png',
  },
]

function FeaturedShinobi() {
  return (
    <section className="bg-[#15191F] px-6 py-20">
      <div className="mx-auto max-w-6xl">

        <div className="mb-12 text-center">
          <p className="mb-3 text-sm tracking-[0.3em] text-orange-400">
            LEGENDS OF THE LEAF
          </p>

          <h2 className="text-3xl font-bold text-[#F1E3C6] md:text-4xl">
            Featured Shinobi
          </h2>

          <p className="mt-4 text-gray-400">
            Meet the ninjas who shaped the shinobi world.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {featuredCharacters.map((character) => (
            <div
              key={character.name}
              className="group overflow-hidden rounded-xl border border-orange-900/40 bg-[#303844] transition-all duration-300 hover:-translate-y-1 hover:border-orange-500"
            >
              <div className="aspect-[3/4] overflow-hidden bg-[#202630]">
                <img
                  src={character.image}
                  alt={character.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-[#F1E3C6]">
                  {character.name}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  {character.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/characters"
            className="inline-block rounded-lg border border-orange-500 px-8 py-3 font-semibold text-orange-400 transition-colors hover:bg-orange-500 hover:text-white"
          >
            View All Characters
          </Link>
        </div>

      </div>
    </section>
  )
}

export default FeaturedShinobi
