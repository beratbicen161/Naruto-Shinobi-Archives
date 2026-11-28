import { useState } from 'react'

function CharacterPortrait({ character }) {
  const imageSources = [
    ...new Set((character.images ?? []).filter(Boolean))
  ]

  const [imageIndex, setImageIndex] = useState(0)
  const currentImage = imageSources[imageIndex]

  function handleImageError() {
    setImageIndex((index) => index + 1)
  }

  function handleImageLoad(event) {
    const image = event.currentTarget

    const isFandomImage = image.src.includes(
      'static.wikia.nocookie.net'
    )

    const width = image.naturalWidth
    const height = image.naturalHeight

    const isPlaceholder =
      (width === 300 && height === 171) ||
      (width === 200 && height === 114)

    if (isFandomImage && isPlaceholder) {
      handleImageError()
    }
  }

  return (
    <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#20252D]">
      {currentImage ? (
        <img
          key={currentImage}
          src={currentImage}
          alt={character.name}
          loading="lazy"
          decoding="async"
          onLoad={handleImageLoad}
          onError={handleImageError}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-linear-to-b from-[#303844] to-[#15191F] px-3">

          <div className="pointer-events-none absolute inset-3 rounded-lg border border-orange-500/20" />

          <div className="pointer-events-none absolute h-40 w-40 rounded-full border border-orange-500/10" />

          <div className="pointer-events-none absolute h-32 w-32 rounded-full border border-orange-500/20" />

          <span className="absolute right-5 top-4 text-[9px] font-bold tracking-widest text-orange-400/60">
            ARCHIVE
          </span>

          <img
            src={`${import.meta.env.BASE_URL}images/konoha-logo.png`}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="relative mb-4 h-16 w-20 object-contain opacity-40"
          />

          <span className="relative text-5xl text-orange-400/60">
            忍
          </span>

          <div className="relative mt-5 rotate-[-8deg] rounded-sm border-2 border-red-500/70 px-3 py-1 text-center">
            <span className="text-xs font-bold tracking-[0.2em] text-red-400">
              CLASSIFIED
            </span>
          </div>

          <p className="relative mt-4 text-center text-[10px] font-semibold tracking-widest text-[#A8A29E]">
            IMAGE UNAVAILABLE
          </p>

          <p className="absolute bottom-5 text-center text-[9px] tracking-widest text-orange-400/40">
            SHINOBI ARCHIVES
          </p>

        </div>
      )}
    </div>
  )
}

function CharacterImage({ character }) {
  return (
    <CharacterPortrait
      key={character.id ?? character.name}
      character={character}
    />
  )
}

export default CharacterImage