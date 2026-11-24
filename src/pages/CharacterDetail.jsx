import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCharacterById } from '../services/api'
import { formatValue } from '../utils/formatters'
import { getVillageTheme } from '../utils/villageThemes'

import CharacterGallery from '../components/CharacterGallery'
import InformationSection from '../components/InformationSection'
import RecordList from '../components/RecordList'
import LoadingScreen from '../components/LoadingScreen'
import ErrorScreen from '../components/ErrorScreen'

const tabs = [
  { id: 'overview', label: 'Overview', symbol: '忍' },
  { id: 'jutsu', label: 'Jutsu', symbol: '術' },
  { id: 'family', label: 'Family', symbol: '家' },
  { id: 'chakra', label: 'Chakra', symbol: '気' },
  { id: 'teams', label: 'Teams', symbol: '組' },
  { id: 'debut', label: 'Debut', symbol: '巻' },
]

function CharacterDetail() {
  const { id } = useParams()

  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchCharacter() {
      setLoading(true)
      setError('')
      setCharacter(null)
      setActiveTab('overview')

      try {
        const data = await getCharacterById(
          id,
          controller.signal
        )

        if (!controller.signal.aborted) {
          setCharacter(data)
        }
      } catch (err) {
        if (
          err.name !== 'AbortError' &&
          !controller.signal.aborted
        ) {
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchCharacter()
    window.scrollTo(0, 0)

    return () => controller.abort()
  }, [id, retryCount])

  if (loading) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-[#15191F] px-5">
        <LoadingScreen
          title="Accessing Classified Records"
          description="Retrieving shinobi information..."
        />
      </main>
    )
  }

  if (error || !character || !character.name) {
    return (
      <main className="min-h-screen bg-[#15191F] px-5 py-16">
        <ErrorScreen
          title="Archive Access Failed"
          description="The requested shinobi record could not be retrieved."
          message={error}
          onRetry={() => setRetryCount((count) => count + 1)}
        />

        <Link
          to="/characters"
          className="mt-6 block text-center text-orange-400 transition hover:text-orange-300"
        >
          ← Back to Archives
        </Link>
      </main>
    )
  }

  const theme = getVillageTheme(character)

  const personal = character.personal ?? {}

  const {
    affiliation,
    team,
    clan,
    ...otherPersonal
  } = personal

  const profileInformation = {
    ...otherPersonal,
    clan,
    affiliation,
  }

  const summaryItems = [
    { label: 'CLAN', value: clan, symbol: '族' },
    { label: 'BIRTHDAY', value: personal.birthdate, symbol: '日' },
    { label: 'AFFILIATION', value: affiliation, symbol: '里' },
    { label: 'STATUS', value: personal.status, symbol: '命' },
  ]

  function renderTab() {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <InformationSection
              title="PERSONAL INFORMATION"
              data={profileInformation}
            />

            <InformationSection
              title="SHINOBI RANK"
              data={character.rank}
            />
          </div>
        )

      case 'jutsu':
        return (
          <RecordList
            title="JUTSU TECHNIQUES"
            items={character.jutsu}
            symbol="術"
          />
        )

      case 'family':
        return (
          <InformationSection
            title="FAMILY RECORDS"
            data={character.family}
          />
        )

      case 'chakra':
        return (
          <RecordList
            title="CHAKRA NATURE TYPES"
            items={character.natureType}
            symbol="気"
          />
        )

      case 'teams':
        return (
          <div className="space-y-6">
            <RecordList
              title="SHINOBI TEAMS"
              items={team}
              symbol="組"
            />

            <RecordList
              title="AFFILIATIONS"
              items={affiliation}
              symbol="忍"
            />
          </div>
        )

      case 'debut':
        return (
          <div className="space-y-6">
            <InformationSection
              title="FIRST APPEARANCE"
              data={character.debut}
            />

            <InformationSection
              title="VOICE ACTORS"
              data={character.voiceActors}
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <main
      className="dossier-page relative min-h-screen overflow-hidden bg-[#15191F] px-5 py-12"
      style={{
        '--village-color': theme.color,
        '--village-rgb': theme.rgb,
      }}
    >
      <div className="dossier-background-symbol" aria-hidden="true">
        {theme.symbol}
      </div>

      <div className="dossier-background-grid" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl">

        <Link
          to="/characters"
          className="dossier-back-link mb-8 inline-flex items-center gap-2 text-sm font-semibold tracking-wider"
        >
          ← BACK TO SHINOBI ARCHIVES
        </Link>

        <section className="dossier-panel relative overflow-hidden rounded-2xl bg-[#252A33] p-6 md:p-10">

          <div className="dossier-corner dossier-corner-tl" />
          <div className="dossier-corner dossier-corner-tr" />
          <div className="dossier-corner dossier-corner-bl" />
          <div className="dossier-corner dossier-corner-br" />

          <div className="dossier-aura dossier-aura-one" />
          <div className="dossier-aura dossier-aura-two" />

          <div className="dossier-header relative mb-8 flex flex-wrap items-center justify-between gap-4 pb-5">

            <div className="flex items-center gap-4">

              <div className="dossier-village-emblem">
                {theme.symbol}
              </div>

              <div>
                <p className="dossier-accent text-xs tracking-[0.25em]">
                  SHINOBI INTELLIGENCE DIVISION
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  ARCHIVE RECORD #
                  {String(character.id ?? id).padStart(4, '0')}
                </p>

                <p className="dossier-accent mt-2 text-xs uppercase tracking-widest">
                  {theme.name}
                </p>
              </div>

            </div>

            <span className="dossier-classified">
              CLASSIFIED
            </span>

          </div>

          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[350px_1fr]">

            <div className="dossier-gallery-frame">

              <div className="dossier-gallery-label">
                <span>VISUAL IDENTIFICATION</span>
                <span className="dossier-live-dot" />
              </div>

              <div className="relative">

                <CharacterGallery
                  key={character.id ?? id}
                  character={character}
                />

                <div
                  className="dossier-scan-line"
                  aria-hidden="true"
                />

                <div
                  className="dossier-gallery-particles"
                  aria-hidden="true"
                >
                  {Array.from({ length: 14 }, (_, index) => (
                    <span
                      key={index}
                      style={{
                        '--particle-x': `${5 + index * 7}%`,
                        '--particle-delay': `${index * 0.3}s`,
                        '--particle-duration': `${3 + (index % 4) * 0.5}s`,
                      }}
                    />
                  ))}
                </div>

              </div>

              <div className="dossier-gallery-footer">
                <span>忍</span>
                SHINOBI ARCHIVE DATABASE
              </div>

            </div>

            <div className="flex min-w-0 flex-col justify-center">

              <p className="dossier-accent mb-4 text-sm tracking-[0.3em]">
                {theme.symbol} — SHINOBI DOSSIER
              </p>

              <h1 className="dossier-character-name break-words text-4xl font-bold text-[#F1E3C6] md:text-6xl">
                {character.name}
              </h1>

              <div className="dossier-energy-divider my-6" />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {summaryItems.map((item) => (
                  <div
                    key={item.label}
                    className="dossier-stat relative overflow-hidden rounded-lg bg-[#20252D] p-4"
                  >
                    <span
                      className="dossier-stat-symbol"
                      aria-hidden="true"
                    >
                      {item.symbol}
                    </span>

                    <p className="dossier-accent relative mb-2 text-xs tracking-widest">
                      {item.label}
                    </p>

                    <p className="relative break-words text-[#F1E3C6]">
                      {formatValue(item.value)}
                    </p>
                  </div>
                ))}

              </div>

              <button
                type="button"
                disabled
                className="dossier-favorite mt-6 w-full cursor-not-allowed rounded-lg px-6 py-4 font-bold opacity-60 sm:w-fit"
              >
                ☆ ADD TO FAVORITES — COMING SOON
              </button>

            </div>

          </div>

          <div className="dossier-security-footer mt-8 flex flex-wrap items-center justify-between gap-3 pt-4">
            <span>忍 — SHINOBI INTELLIGENCE NETWORK</span>
            <span>RESTRICTED ARCHIVE</span>
          </div>

        </section>

        <div
          aria-label="Character information"
          className="my-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={activeTab === tab.id}
              className={`dossier-tab relative flex items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-4 font-semibold ${
                activeTab === tab.id
                  ? 'dossier-tab-active'
                  : ''
              }`}
            >
              <span className="dossier-tab-symbol text-xl">
                {tab.symbol}
              </span>

              {tab.label}
            </button>
          ))}
        </div>

        <div
          key={activeTab}
          className="dossier-tab-content"
        >
          {renderTab()}
        </div>

        <div className="dossier-security-footer mt-12 pt-6 text-center">
          <div className="dossier-end-seal">
            封
          </div>

          <p className="mt-4 text-xs tracking-[0.25em]">
            SHINOBI ARCHIVES — END OF CLASSIFIED RECORD
          </p>
        </div>

      </div>
    </main>
  )
}

export default CharacterDetail