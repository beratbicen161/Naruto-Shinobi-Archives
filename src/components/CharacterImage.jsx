import { useState } from 'react'

function CharacterImage({ character }) {
  const imageSources = (character.images ?? []).filter(Boolean)

  const [imageIndex, setImageIndex] = useState(0)
  const currentImage = imageSources[imageIndex]

  return (
    <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#20252D]">
      {currentImage ? (
        <img
          src={currentImage}
          alt={character.name}
          loading="lazy"
          onError={() => setImageIndex((index) => index + 1)}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <span className="text-6xl text-orange-400/40">
          忍
        </span>
      )}
    </div>
  )
}

export default CharacterImage