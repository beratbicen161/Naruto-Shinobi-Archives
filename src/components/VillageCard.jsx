import { Link } from 'react-router-dom'
import { getTerritoryTheme } from '../utils/territoryThemes'

function VillageCard({ village }) {
  const theme = getTerritoryTheme(village)
  const characterCount = village.characters?.length ?? 0

  return (
    <article
      className="territory-card group relative flex h-full flex-col overflow-hidden"
      style={{
        '--territory-color': theme.color,
      }}
    >

      <div className="territory-paper-texture" />

      <div className="territory-corner territory-corner-tl" />
      <div className="territory-corner territory-corner-tr" />
      <div className="territory-corner territory-corner-bl" />
      <div className="territory-corner territory-corner-br" />

      <div className="territory-header">
        <span>TERRITORY ARCHIVE</span>

        <span>
          #{String(village.id).padStart(3, '0')}
        </span>
      </div>

      <div className="territory-map" aria-hidden="true">

        <div className="territory-map-grid" />

        <svg
          className="territory-map-svg"
          viewBox="0 0 300 180"
          preserveAspectRatio="none"
        >

          <g className="territory-contours">

            {Array.from({ length: 12 }, (_, index) => (
              <path
                key={index}
                d={`
                  M -30 ${index * 22 - 40}
                  Q 65 ${index * 22 - 75 + (village.id % 7) * 8}
                  135 ${index * 22}
                  T 330 ${index * 22 - 25}
                `}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.9"
                opacity="0.35"
              />
            ))}

            <path
              className="territory-boundary"
              d="
                M 25 85
                L 65 30
                L 125 18
                L 185 42
                L 260 30
                L 282 100
                L 230 155
                L 130 165
                L 48 140
                Z
              "
              fill="currentColor"
              fillOpacity="0.12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="5 4"
            />

            <path
              className="territory-route"
              d="
                M 25 140
                Q 85 100 110 120
                T 190 65
                T 280 45
              "
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="3 6"
            />

            <circle
              cx="65"
              cy="65"
              r="3"
              fill="currentColor"
            />

            <circle
              cx="240"
              cy="120"
              r="3"
              fill="currentColor"
            />

            <circle
              cx="205"
              cy="48"
              r="3"
              fill="currentColor"
            />

          </g>

        </svg>

        <div className="territory-compass">

          <span className="territory-compass-north">N</span>

          <svg viewBox="0 0 60 60">

            <circle
              cx="30"
              cy="30"
              r="25"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />

            <circle
              cx="30"
              cy="30"
              r="19"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />

            <path
              d="M30 3 L35 25 L57 30 L35 35 L30 57 L25 35 L3 30 L25 25 Z"
              fill="currentColor"
              opacity="0.8"
            />

            <circle
              cx="30"
              cy="30"
              r="4"
              fill="#E4D2A9"
            />

          </svg>

        </div>

        <div className="territory-seal">

          <div className="territory-seal-inner">

            <span>{theme.symbol}</span>

          </div>

        </div>

        <span className="territory-map-label">
          SHINOBI TERRITORY
        </span>

      </div>

      <div className="territory-content flex flex-1 flex-col">

        <p className="territory-category">
          CLASSIFIED TERRITORY
        </p>

        <h2 className="territory-name">
          {village.name}
        </h2>

        <p className="territory-land">
          {theme.territory}
        </p>

        <div className="territory-divider">
          <span>◆</span>
        </div>

        <div className="territory-members">

          <span className="territory-member-icon">
            忍
          </span>

          <div>

            <strong>{characterCount}</strong>

            <p>REGISTERED CHARACTERS</p>

          </div>

        </div>

        <Link
          to={`/villages/${village.id}`}
          className="territory-button mt-auto"
        >
          <span>EXPLORE TERRITORY</span>
          <span aria-hidden="true">→</span>
        </Link>

      </div>

      <div className="territory-footer">

        <span>木ノ葉</span>

        <span>HIDDEN LEAF RECORDS</span>

      </div>

    </article>
  )
}

export default VillageCard