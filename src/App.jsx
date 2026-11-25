import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import Characters from './pages/Characters'
import CharacterDetail from './pages/CharacterDetail'
import Clans from './pages/Clans'
import ClanDetail from './pages/ClanDetail'
import Villages from './pages/Villages'
import VillageDetail from './pages/VillageDetail'
import JutsuExplorer from './pages/JutsuExplorer'
import BingoBook from './pages/BingoBook'
import Favorites from './pages/Favorites'

function App() {
  return (
    <>
      <Navbar />

      <PageTransition />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/characters"
          element={<Characters />}
        />

        <Route
          path="/characters/:id"
          element={<CharacterDetail />}
        />

        <Route
          path="/clans"
          element={<Clans />}
        />

        <Route
          path="/clans/:id"
          element={<ClanDetail />}
        />

        <Route
          path="/villages"
          element={<Villages />}
        />

        <Route
          path="/villages/:id"
          element={<VillageDetail />}
        />

        <Route
          path="/jutsus"
          element={<JutsuExplorer />}
        />

        <Route
          path="/bingo-book"
          element={<BingoBook />}
        />

        <Route
          path="/favorites"
          element={<Favorites />}
        />

      </Routes>
    </>
  )
}

export default App