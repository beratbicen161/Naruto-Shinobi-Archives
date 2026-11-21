
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

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const linkStyle = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
      isActive
        ? 'bg-orange-500/15 text-orange-400'
        : 'text-[#F1E3C6] hover:bg-white/10 hover:text-orange-400'
    }`

  return (
    <header className="relative z-50 w-full px-2 pt-2 sm:px-4">
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-7xl rounded-2xl bg-[#15191F] px-3 py-3 sm:px-4"
      >
        <div className="flex items-center justify-between gap-4">

          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-orange-600 text-xl text-orange-500">
              巻
            </div>

            <div>
              <div className="text-sm font-bold tracking-wide text-orange-400">
                SHINOBI ARCHIVES
              </div>

              <div className="text-[9px] text-[#F1E3C6]">
                HIDDEN LEAF RECORDS
              </div>
            </div>
          </NavLink>

          <div className="flex shrink-0 items-center gap-2">

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-700 text-xl text-orange-400 hover:bg-orange-500/10"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-700 text-xl text-orange-400 hover:bg-orange-500/10 lg:hidden"
            >
              {menuOpen ? '✕' : '☰'}
            </button>

          </div>
        </div>

        <div
          id="desktop-navigation"
          className="mt-4 hidden border-t border-orange-900/70 pt-4 lg:block"
        >
          <div className="flex flex-wrap items-center gap-2">
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
            className="mt-4 border-t border-orange-900/70 pt-4 lg:hidden"
          >
            <div className="flex flex-col gap-2">
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
