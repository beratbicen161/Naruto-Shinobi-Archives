import { useState } from 'react'

function BingoPortrait({ character, name, loading }) {
  const [imageIndex, setImageIndex] = useState(0)

  const images = (character?.images ?? []).filter(Boolean)
  const currentImage = images[imageIndex]

  return (
    <div className="bingo-portrait">
      {loading ? (
        <div className="bingo-portrait-loading">
          <span>忍</span>
          <small>RETRIEVING RECORD...</small>
        </div>
      ) : currentImage ? (
        <img
          src={currentImage}
          alt={name}
          className="bingo-character-image"
          onError={() =>
            setImageIndex((index) => index + 1)
          }
        />
      ) : (
        <div className="bingo-portrait-loading">
          <span>忍</span>
          <small>IMAGE UNAVAILABLE</small>
        </div>
      )}

      <div className="bingo-portrait-stamp">
        CLASSIFIED
      </div>
    </div>
  )
}

export default BingoPortrait