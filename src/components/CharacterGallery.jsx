import { useState } from 'react'

function CharacterGallery({ character }) {
  const images = (character.images ?? []).filter(Boolean)

  const [selectedImage, setSelectedImage] = useState(0)
  const [failedImages, setFailedImages] = useState([])

  const availableImages = images.filter(
    (image) => !failedImages.includes(image)
  )

  const currentImage =
    availableImages[selectedImage] ?? availableImages[0]

  return (
    <div>
      <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-xl border-2 border-orange-600/40 bg-[#20252D] shadow-[0_0_30px_rgba(249,115,22,0.12)]">

        {currentImage ? (
          <img
            src={currentImage}
            alt={character.name}
            onError={() => {
              setFailedImages((previous) => [
                ...previous,
                currentImage,
              ])
              setSelectedImage(0)
            }}
            className="h-[350px] w-full object-contain"
          />
        ) : (
          <span className="text-8xl text-orange-500/30">
            忍
          </span>
        )}

        <div className="absolute left-3 top-3 rounded border border-orange-500/40 bg-black/70 px-3 py-2 text-xs tracking-widest text-orange-400">
          ARCHIVE PHOTO
        </div>
      </div>

      {availableImages.length > 1 && (
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {availableImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedImage(index)}
              aria-label={`View character image ${index + 1}`}
              aria-pressed={currentImage === image}
              className={`h-16 w-20 overflow-hidden rounded-lg border-2 bg-[#20252D] transition ${
                currentImage === image
                  ? 'border-orange-500'
                  : 'border-orange-900/30 hover:border-orange-400'
              }`}
            >
              <img
                src={image}
                alt={`${character.name} ${index + 1}`}
                onError={() =>
                  setFailedImages((previous) =>
                    previous.includes(image)
                      ? previous
                      : [...previous, image]
                  )
                }
                className="h-full w-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default CharacterGallery