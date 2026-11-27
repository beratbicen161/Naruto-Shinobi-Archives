
import { createContext, useContext, useEffect, useState } from 'react'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('shinobi-favorites')
      const data = saved ? JSON.parse(saved) : []
      return Array.isArray(data) ? data : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(
      'shinobi-favorites',
      JSON.stringify(favorites)
    )
  }, [favorites])

  function isFavorite(id) {
    return favorites.some(
      character => String(character.id) === String(id)
    )
  }

  function toggleFavorite(character) {
    setFavorites(current => {
      const exists = current.some(
        item => String(item.id) === String(character.id)
      )

      if (exists) {
        return current.filter(
          item => String(item.id) !== String(character.id)
        )
      }

      return [...current, character]
    })
  }

  function clearFavorites() {
    setFavorites([])
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        clearFavorites
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)

  if (!context) {
    throw new Error(
      'useFavorites must be used inside FavoritesProvider'
    )
  }

  return context
}
