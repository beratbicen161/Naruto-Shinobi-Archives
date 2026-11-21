
function Home() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white">
      <h1 className="text-6xl font-bold text-orange-500">
        NARUTO WIKI
      </h1>

      <p className="mt-4 text-xl text-gray-300">
        Welcome to the Shinobi World
      </p>

      <p className="mt-2 text-gray-400">
        Explore characters, clans, villages and legendary jutsus.
      </p>

      <button className="mt-8 rounded-lg bg-orange-600 px-6 py-3 font-semibold hover:bg-orange-700 transition-colors">
        Explore Shinobi World
      </button>
    </div>
  )
}

export default Home
