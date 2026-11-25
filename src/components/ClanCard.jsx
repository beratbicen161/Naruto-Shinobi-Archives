import { Link } from 'react-router-dom'
import { getClanTheme } from '../utils/clanThemes'

function ClanCard({ clan }) {
  const theme = getClanTheme(clan)

  const memberCount = clan.characters?.length ?? 0

  return (
    <article
      className="clan-card group relative flex h-full flex-col overflow-hidden"
      style={{
        '--clan-color': theme.color,
        '--clan-rgb': theme.rgb,
      }}
    >
      <div className="clan-card-background" />

      <div className="clan-corner clan-corner-top-left" />
      <div className="clan-corner clan-corner-top-right" />
      <div className="clan-corner clan-corner-bottom-left" />
      <div className="clan-corner clan-corner-bottom-right" />

      <div className="clan-card-header">
        <span>BLOODLINE ARCHIVE</span>

        <span>
          #{String(clan.id).padStart(3, '0')}
        </span>
      </div>

      <div className="clan-chakra-core" aria-hidden="true">

        <div className="clan-core-aura" />

        <div className="clan-core-ring clan-core-ring-outer" />

        <div className="clan-core-ring clan-core-ring-middle" />

        <div className="clan-core-ring clan-core-ring-inner" />

        <div className="clan-core-orbit">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="clan-core-symbol">
          {theme.symbol}
        </div>

        <div className="clan-core-particles">
          {Array.from({ length: 12 }, (_, index) => (
            <span
              key={index}
              className="clan-core-particle"
              style={{
                '--particle-index': index,
                '--particle-angle': `${index * 30}deg`,
                '--particle-delay': `${index * -0.25}s`,
              }}
            />
          ))}
        </div>

      </div>

      <div className="clan-energy-divider" />

      <div className="clan-card-content flex flex-1 flex-col">

        <p className="clan-card-category">
          SHINOBI BLOODLINE
        </p>

        <h2 className="clan-card-name">
          {clan.name}
        </h2>

        <div className="clan-card-members">
          <span className="clan-member-icon">
            忍
          </span>

          <div>
            <p>REGISTERED MEMBERS</p>
            <strong>{memberCount}</strong>
          </div>
        </div>

        <Link
          to={`/clans/${clan.id}`}
          className="clan-card-button mt-auto"
        >
          <span>EXPLORE CLAN</span>
          <span aria-hidden="true">→</span>
        </Link>

      </div>

      <div className="clan-card-footer">
        <span>木ノ葉</span>
        <span>HIDDEN LEAF RECORDS</span>
      </div>

    </article>
  )
}

export default ClanCard