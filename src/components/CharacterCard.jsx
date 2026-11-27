
import { Link } from 'react-router-dom'
import CharacterImage from './CharacterImage'
import { getVillageTheme } from '../utils/villageThemes'
import { formatValue } from '../utils/formatters'
import { useFavorites } from '../context/FavoritesContext'

function CharacterCard({ character }) {
  const theme = getVillageTheme(character)

  const { isFavorite, toggleFavorite } = useFavorites()

  const favorite = isFavorite(character.id)

  const affiliation = character.personal?.affiliation

  const primaryAffiliation = Array.isArray(affiliation)
    ? affiliation[0]
    : affiliation

  const rank = character.rank?.ninjaRank

  function handleMouseMove(event) {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()

    card.style.setProperty(
      '--mouse-x',
      `${event.clientX - rect.left}px`
    )

    card.style.setProperty(
      '--mouse-y',
      `${event.clientY - rect.top}px`
    )
  }

  return (
    <article
      onMouseMove={handleMouseMove}
      style={{
        '--village-color': theme.color,
        '--village-rgb': theme.rgb,
      }}
      className="shinobi-card group relative flex h-full flex-col overflow-hidden rounded-xl bg-[#303844]"
    >
      <div className="shinobi-card-glow" />

      <div className="shinobi-corner shinobi-corner-top-left" />
      <div className="shinobi-corner shinobi-corner-top-right" />
      <div className="shinobi-corner shinobi-corner-bottom-left" />
      <div className="shinobi-corner shinobi-corner-bottom-right" />

      <div className="shinobi-card-header relative flex items-center justify-between px-4 py-3">
        <span className="shinobi-village-text text-xs font-bold tracking-widest">
          忍 SHINOBI RECORD
        </span>

        <span className="text-xs text-gray-400">
          #{String(character.id).padStart(4, '0')}
        </span>
      </div>

      <div className="relative overflow-hidden">

        <CharacterImage
          key={character.id}
          character={character}
        />

        <div className="shinobi-image-overlay" />

        <button
          type="button"
          onClick={() => toggleFavorite(character)}
          aria-pressed={favorite}
          aria-label={
            favorite
              ? `Remove ${character.name} from favorites`
              : `Add ${character.name} to favorites`
          }
          title={
            favorite
              ? 'Remove from favorites'
              : 'Add to favorites'
          }
          className={`absolute right-3 top-3 z-30 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 ${
            favorite
              ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400 shadow-[0_0_18px_rgba(250,204,21,0.5)]'
              : 'border-white/30 bg-black/60 text-white hover:border-yellow-400 hover:text-yellow-400'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={favorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path d="m12 3 2.8 5.7 6.3.9-4.55 4.45 1.07 6.28L12 17.36l-5.62 2.97 1.07-6.28L2.9 9.6l6.3-.9L12 3Z" />
          </svg>
        </button>

        <div className="shinobi-village-symbol">
          {theme.symbol}
        </div>

        <div
          className="shinobi-card-particles"
          aria-hidden="true"
        >
          {Array.from({ length: 12 }, (_, index) => (
            <span
              key={index}
              style={{
                '--particle-x': `${8 + index * 7}%`,
                '--particle-delay': `${index * 0.23}s`,
                '--particle-duration': `${2 + (index % 4) * 0.4}s`,
              }}
            />
          ))}
        </div>

        <div className="shinobi-image-seal">
          {theme.symbol}
        </div>

      </div>

      <div className="shinobi-card-energy-line" />

      <div className="relative flex flex-1 flex-col p-5">

        <div className="mb-4 flex items-center gap-3">

          <div className="shinobi-village-emblem">
            {theme.symbol}
          </div>

          <div className="min-w-0">
            <p className="shinobi-village-text mb-1 text-xs font-semibold uppercase tracking-wider">
              {theme.name}
            </p>

            <h2 className="break-words text-xl font-bold text-[#F1E3C6]">
              {character.name}
            </h2>
          </div>

        </div>

        <div className="shinobi-card-divider" />

        <div className="mb-4 space-y-3 py-3">

          <div>
            <p className="mb-1 text-[10px] tracking-widest text-gray-400">
              AFFILIATION
            </p>

            <p className="text-sm text-gray-300">
              {formatValue(
                primaryAffiliation ??
                character.personal?.clan
              )}
            </p>
          </div>

          <div>
            <p className="mb-1 text-[10px] tracking-widest text-gray-400">
              NINJA RANK
            </p>

            <p className="text-sm text-gray-300">
              {formatValue(rank)}
            </p>
          </div>

        </div>

        <Link
          to={`/characters/${character.id}`}
          className="shinobi-dossier-button mt-auto"
        >
          <span>VIEW DOSSIER</span>
          <span className="shinobi-button-arrow">→</span>
        </Link>

      </div>
    </article>
  )
}

export default CharacterCard
