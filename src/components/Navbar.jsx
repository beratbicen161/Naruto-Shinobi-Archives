
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useFavorites } from '../context/FavoritesContext'

const links = [
  { name: 'Home', path: '/' },
  { name: 'Characters', path: '/characters' },
  { name: 'Clans', path: '/clans' },
  { name: 'Villages', path: '/villages' },
  { name: 'Bingo Book', path: '/bingo-book' },
  { name: 'Watch Guide', path: '/watch-guide' },
  { name: 'Favorites', path: '/favorites' },
]

const navbarParticles = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  left: `${(index * 31 + 7) % 100}%`,
  top: `${(index * 19 + 13) % 100}%`,
  delay: `${index * 0.65}s`,
  duration: `${5 + (index % 4)}s`,
  color: index % 3 === 0 ? '#38BDF8' : '#F97316',
}))

function BattleAreaButton({ onClick }) {
  return (
    <NavLink
      to="/battle-arena"
      onClick={onClick}
      className={({ isActive }) =>
        `group relative flex h-full min-h-[120px] flex-col items-center justify-center overflow-hidden rounded-xl border-2 px-5 py-5 text-center transition-all duration-300 ${
          isActive
            ? 'border-orange-400 bg-orange-600/25 shadow-[0_0_30px_rgba(249,115,22,0.4)]'
            : 'border-orange-600 bg-linear-to-br from-[#351B12] via-[#211B1B] to-[#15191F] shadow-[0_0_15px_rgba(249,115,22,0.15)] hover:border-orange-400 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]'
        }`
      }
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.18),transparent_75%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-8 -top-8 size-28 rounded-full bg-orange-500/10 blur-2xl motion-safe:animate-pulse"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -right-8 size-28 rounded-full bg-red-500/10 blur-2xl motion-safe:animate-pulse"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 bottom-0 select-none text-[100px] leading-none text-orange-500/5"
      >
        闘
      </span>

      <div className="relative flex size-14 items-center justify-center rounded-full border border-orange-500/40 bg-orange-500/10 transition-all duration-300 group-hover:scale-110 group-hover:border-orange-400 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]">

        <svg
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-9 text-orange-400"
          aria-hidden="true"
        >
          <path d="M10 7 L17 10 L48 41 L41 48 L10 17 Z" />

          <path d="M36 43 L43 36 L52 45 L45 52 Z" />

          <path d="M48 49 L55 56" />

          <path d="M54 7 L47 10 L16 41 L23 48 L54 17 Z" />

          <path d="M28 43 L21 36 L12 45 L19 52 Z" />

          <path d="M16 49 L9 56" />
        </svg>

      </div>

      <p className="shinobi-logo relative mt-3 whitespace-nowrap text-[27px] leading-none tracking-wider text-orange-400 transition-colors group-hover:text-orange-300">
        BATTLE AREA
      </p>

      <div className="relative my-2 h-px w-16 bg-linear-to-r from-transparent via-orange-500 to-transparent" />

      <p className="relative whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.18em] text-orange-300/80">
        Enter the Arena
      </p>

    </NavLink>
  )
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { favorites } = useFavorites()

  const linkStyle = ({ isActive }) =>
    `shinobi-nav-link navbar-chakra-link relative rounded-xl border px-5 py-3 text-[16px] transition-all duration-300 ${
      isActive
        ? 'navbar-chakra-active border-orange-500 bg-orange-500/15 text-orange-400'
        : 'border-transparent text-[#F1E3C6] hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-400'
    }`

  function renderLinkContent(link) {
    return (
      <span className="inline-flex items-center gap-2">
        {link.name}

        {link.path === '/favorites' && favorites.length > 0 && (
          <span
            aria-label={`${favorites.length} saved characters`}
            className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-yellow-500 px-1.5 text-xs font-bold text-[#15191F] shadow-[0_0_10px_rgba(234,179,8,0.35)]"
          >
            {favorites.length}
          </span>
        )}
      </span>
    )
  }

  return (
    <header className="relative z-50 w-full px-3 pt-3 sm:px-5">
      <nav
        aria-label="Main navigation"
        className="shinobi-navbar relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[#15191F] px-5 py-5 sm:px-7"
      >
        <div className="navbar-particles" aria-hidden="true">
          {navbarParticles.map((particle) => (
            <span
              key={particle.id}
              className="navbar-particle"
              style={{
                left: particle.left,
                top: particle.top,
                backgroundColor: particle.color,
                boxShadow: `0 0 10px ${particle.color}`,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 lg:grid lg:grid-cols-[minmax(0,1fr)_190px] lg:gap-5">

          <div className="min-w-0">

            <div className="relative flex items-center justify-between gap-3 sm:gap-5">
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex min-w-0 items-center gap-2 sm:gap-4"
              >
                <div className="navbar-logo-chakra flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-2 border-orange-600 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(249,115,22,0.35)] sm:h-14 sm:w-14">
                  <img
                    src="/images/konoha-logo.png"
                    alt="Hidden Leaf Village emblem"
                    className="relative z-10 h-8 w-8 object-contain sm:h-10 sm:w-10"
                  />
                </div>

                <div className="min-w-0">
                  <div className="shinobi-logo text-[22px] leading-none text-orange-400 sm:text-[32px]">
                    SHINOBI ARCHIVES
                  </div>

                  <div className="shinobi-subtitle mt-2 text-[9px] tracking-[0.16em] text-[#F1E3C6] sm:text-[12px]">
                    HIDDEN LEAF RECORDS
                  </div>
                </div>
              </NavLink>

              <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={
                    theme === 'dark'
                      ? 'Switch to light mode'
                      : 'Switch to dark mode'
                  }
                  title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  className="navbar-theme-button flex h-10 w-10 items-center justify-center rounded-xl border border-orange-600 text-orange-400 transition-all duration-300 hover:bg-orange-500/10 hover:shadow-[0_0_15px_rgba(249,115,22,0.25)] sm:h-12 sm:w-12"
                >
                  <span
                    key={theme}
                    className={`navbar-theme-icon chakra-seal-icon ${
                      theme === 'dark'
                        ? 'chakra-seal-dark'
                        : 'chakra-seal-light'
                    }`}
                  >
                    <svg
                      viewBox="0 0 64 64"
                      width="34"
                      height="34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <circle
                        cx="32"
                        cy="32"
                        r="25"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                        opacity="0.6"
                      />

                      <circle
                        cx="32"
                        cy="32"
                        r="19"
                        stroke="currentColor"
                        strokeWidth="2"
                      />

                      <path
                        d="
                          M32 13
                          A19 19 0 0 1 32 51
                          A9.5 9.5 0 0 0 32 32
                          A9.5 9.5 0 0 1 32 13
                          Z
                        "
                        fill="currentColor"
                        opacity="0.85"
                      />

                      <circle
                        cx="32"
                        cy="22.5"
                        r="3"
                        fill="currentColor"
                      />

                      <circle
                        cx="32"
                        cy="41.5"
                        r="3"
                        fill={theme === 'dark' ? '#15191F' : '#F5EBD7'}
                      />
                    </svg>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-navigation"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-600 text-2xl text-orange-400 transition-all duration-300 hover:bg-orange-500/10 sm:h-12 sm:w-12 lg:hidden"
                >
                  {menuOpen ? '✕' : '☰'}
                </button>
              </div>
            </div>

            <div
              id="desktop-navigation"
              className="relative mt-6 hidden border-t border-orange-900/70 pt-5 lg:block"
            >
              <div className="flex flex-wrap items-center gap-1 xl:gap-3">
                {links.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    className={linkStyle}
                  >
                    {renderLinkContent(link)}
                  </NavLink>
                ))}
              </div>
            </div>

          </div>

          <div className="hidden lg:block">
            <BattleAreaButton
              onClick={() => setMenuOpen(false)}
            />
          </div>

        </div>

        {menuOpen && (
          <div
            id="mobile-navigation"
            className="relative z-10 mt-6 border-t border-orange-900/70 pt-5 lg:hidden"
          >
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={linkStyle}
                >
                  {renderLinkContent(link)}
                </NavLink>
              ))}

              <div className="mt-3">
                <BattleAreaButton
                  onClick={() => setMenuOpen(false)}
                />
              </div>

            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
