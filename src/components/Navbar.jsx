
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const links = [
  { name: 'Home', path: '/' },
  { name: 'Characters', path: '/characters' },
  { name: 'Clans', path: '/clans' },
  { name: 'Villages', path: '/villages' },
  { name: 'Jutsus', path: '/jutsus' },
  { name: 'Bingo Book', path: '/bingo-book' },
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

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const linkStyle = ({ isActive }) =>
    `shinobi-nav-link navbar-chakra-link relative rounded-xl border px-5 py-3 text-[16px] transition-all duration-300 ${
      isActive
        ? 'navbar-chakra-active border-orange-500 bg-orange-500/15 text-orange-400'
        : 'border-transparent text-[#F1E3C6] hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-400'
    }`

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

        <div className="relative z-10 flex items-center justify-between gap-5">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex min-w-0 items-center gap-4"
          >
            <div className="navbar-logo-chakra flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-orange-600 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(249,115,22,0.35)]">
              <img
                src="/images/konoha-logo.png"
                alt="Hidden Leaf Village emblem"
                className="relative z-10 h-10 w-10 object-contain"
              />
            </div>

            <div>
              <div className="shinobi-logo text-[28px] leading-none text-orange-400 sm:text-[32px]">
                SHINOBI ARCHIVES
              </div>

              <div className="shinobi-subtitle mt-2 text-[12px] tracking-[0.16em] text-[#F1E3C6]">
                HIDDEN LEAF RECORDS
              </div>
            </div>
          </NavLink>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              className="navbar-theme-button flex h-12 w-12 items-center justify-center rounded-xl border border-orange-600 text-orange-400 transition-all duration-300 hover:bg-orange-500/10 hover:shadow-[0_0_15px_rgba(249,115,22,0.25)]"
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
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-600 text-2xl text-orange-400 transition-all duration-300 hover:bg-orange-500/10 lg:hidden"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        <div
          id="desktop-navigation"
          className="relative z-10 mt-6 hidden border-t border-orange-900/70 pt-5 lg:block"
        >
          <div className="flex flex-wrap items-center gap-3">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={linkStyle}
              >
                {link.name}
              </NavLink>
            ))}
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
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
