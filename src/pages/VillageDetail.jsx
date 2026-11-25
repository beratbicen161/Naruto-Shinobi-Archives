import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getVillageById } from '../services/api'
import { getTerritoryTheme } from '../utils/territoryThemes'
import LoadingScreen from '../components/LoadingScreen'
import ErrorScreen from '../components/ErrorScreen'
import VillageMembers from '../components/VillageMembers'

function VillageDetail() {
  const { id } = useParams()

  const [village, setVillage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    window.scrollTo(0, 0)

    async function loadVillage() {
      setLoading(true)
      setError(null)
      setVillage(null)

      try {
        const data = await getVillageById(
          id,
          controller.signal
        )

        if (controller.signal.aborted) return

        setVillage(data)

      } catch (err) {
        if (
          !controller.signal.aborted &&
          err.name !== 'AbortError'
        ) {
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadVillage()

    return () => controller.abort()

  }, [id, retryCount])

  if (loading) {
    return (
      <LoadingScreen
        title="Accessing Territory Archives"
        description="Retrieving classified village records..."
      />
    )
  }

  if (error || !village) {
    return (
      <ErrorScreen
        message={error || 'Village not found.'}
        onRetry={() =>
          setRetryCount(count => count + 1)
        }
      />
    )
  }

  const theme = getTerritoryTheme(village)

  const characterCount =
    village.characters?.length ?? 0

  return (
    <main className="min-h-screen bg-[#15191F] px-5 py-12 text-[#F1E3C6]">

      <div className="mx-auto max-w-7xl">

        <Link
          to="/villages"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold tracking-widest text-orange-400 transition hover:text-orange-300"
        >
          ← BACK TO VILLAGE ARCHIVES
        </Link>

        <section
          className="territory-card village-detail-hero"
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

            <span>CLASSIFIED TERRITORY DOSSIER</span>

            <span>
              #{String(village.id).padStart(3, '0')}
            </span>

          </div>

          <div
            className="territory-map village-detail-map"
            aria-hidden="true"
          >

            <div className="territory-map-grid" />

            <svg
              className="territory-map-svg"
              viewBox="0 0 800 300"
              preserveAspectRatio="none"
            >

              <g className="territory-contours">

                {Array.from(
                  { length: 18 },
                  (_, index) => (
                    <path
                      key={index}
                      d={`
                        M -50 ${index * 26 - 70}
                        Q 180 ${index * 26 - 130}
                        380 ${index * 26}
                        T 850 ${index * 26 - 45}
                      `}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      opacity="0.35"
                    />
                  )
                )}

                <path
                  className="territory-boundary"
                  d="
                    M 40 120
                    L 130 45
                    L 260 25
                    L 400 60
                    L 610 30
                    L 750 95
                    L 720 230
                    L 520 280
                    L 240 250
                    L 80 220
                    Z
                  "
                  fill="currentColor"
                  fillOpacity="0.12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="6 5"
                />

                <path
                  className="territory-route"
                  d="
                    M 0 260
                    Q 180 120 300 190
                    T 550 100
                    T 800 40
                  "
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />

              </g>

            </svg>

            <div className="territory-compass">

              <span className="territory-compass-north">
                N
              </span>

              <svg viewBox="0 0 60 60">

                <circle
                  cx="30"
                  cy="30"
                  r="25"
                  fill="none"
                  stroke="currentColor"
                />

                <path
                  d="M30 3 L35 25 L57 30 L35 35 L30 57 L25 35 L3 30 L25 25 Z"
                  fill="currentColor"
                />

              </svg>

            </div>

            <div className="territory-seal">

              <div className="territory-seal-inner">
                <span>{theme.symbol}</span>
              </div>

            </div>

            <span className="territory-map-label">
              SHINOBI TERRITORY MAP
            </span>

          </div>

          <div className="village-detail-content">

            <p className="territory-land">
              {theme.territory}
            </p>

            <h1 className="village-detail-name">
              {village.name}
            </h1>

            <p className="territory-category">
              HIDDEN LEAF ARCHIVES
            </p>

            <div className="territory-divider">
              <span>◆</span>
            </div>

            <div className="village-detail-stats">

              <div className="village-detail-stat">

                <strong>
                  #{String(village.id).padStart(3, '0')}
                </strong>

                <span>VILLAGE ID</span>

              </div>

              <div className="village-detail-stat">

                <strong>{theme.symbol}</strong>

                <span>TERRITORY SEAL</span>

              </div>

              <div className="village-detail-stat">

                <strong>{characterCount}</strong>

                <span>REGISTERED SHINOBI</span>

              </div>

            </div>

          </div>

          <div className="territory-footer">

            <span>木ノ葉</span>

            <span>HIDDEN LEAF RECORDS</span>

          </div>

        </section>

        <section
          id="village-personnel"
          className="mt-14 scroll-mt-32"
        >

          <p className="mb-3 text-xs font-bold tracking-[0.3em] text-orange-400">
            PERSONNEL ARCHIVES
          </p>

          <h2 className="text-3xl font-bold md:text-4xl">
            Registered Shinobi
          </h2>

          <p className="mt-3 text-gray-400">
            {characterCount} character records associated
            with {village.name}.
          </p>

          <VillageMembers
            key={village.id}
            village={village}
          />

        </section>

      </div>

    </main>
  )
}

export default VillageDetail