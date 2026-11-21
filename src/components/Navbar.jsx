
import { NavLink } from 'react-router-dom'

function Navbar() {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Characters', path: '/characters' },
    { name: 'Clans', path: '/clans' },
    { name: 'Villages', path: '/villages' },
    { name: 'Jutsus', path: '/jutsus' },
    { name: 'Bingo Book', path: '/bingo-book' },
    { name: 'Favorites', path: '/favorites' },
  ]

  return (
    <nav className="bg-gray-900 border-b border-orange-600 px-6 py-4">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">

        <NavLink
          to="/"
          className="text-2xl font-bold text-orange-500"
        >
          SHINOBI ARCHIVES
        </NavLink>

        <div className="flex flex-wrap gap-5">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-orange-500'
                    : 'text-gray-300 hover:text-orange-400'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

      </div>
    </nav>
  )
}

export default Navbar
