import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getClanById, getCharacterById } from '../services/api'
import { getClanTheme } from '../utils/clanThemes'
import LoadingScreen from '../components/LoadingScreen'
import ErrorScreen from '../components/ErrorScreen'
import CharacterCard from '../components/CharacterCard'

function ClanDetail() {
  const { id } = useParams()

  const [clan, setClan] = useState(null)
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [membersLoading, setMembersLoading] = useState(true)
  const [failedMembers, setFailedMembers] = useState(0)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    window.scrollTo(0, 0)

    async function loadClan() {
      setLoading(true)
      setMembersLoading(true)
      setError(null)
      setClan(null)
      setMembers([])
      setFailedMembers(0)

      try {
        const data = await getClanById(
          id,
          controller.signal
        )

        if (controller.signal.aborted) return

        setClan(data)
        setLoading(false)

        const characterIds = [
          ...new Set(data.characters ?? [])
        ]

        const loadedMembers = []
        let failed = 0

        const batchSize = 5

        for (
          let index = 0;
          index < characterIds.length;
          index += batchSize
        ) {
          if (controller.signal.aborted) return

          const batch = characterIds.slice(
            index,
            index + batchSize
          )

          const results = await Promise.allSettled(
            batch.map(characterId =>
              getCharacterById(
                characterId,
                controller.signal
              )
            )
          )

          if (controller.signal.aborted) return

          results.forEach(result => {
            if (
              result.status === 'fulfilled' &&
              result.value?.id != null
            ) {
              loadedMembers.push(result.value)
            } else {
              failed++
            }
          })

          setMembers([...loadedMembers])
          setFailedMembers(failed)
        }

      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
          setMembersLoading(false)
        }
      }
    }

    loadClan()

    return () => controller.abort()
  }, [id, retryCount])

  if (loading) {
    return (
      <LoadingScreen
        title="Accessing Clan Records"
        description="Retrieving classified bloodline information..."
      />
    )
  }

  if (error || !clan) {
    return (
      <ErrorScreen
        message={error || 'Clan not found'}
        onRetry={() => setRetryCount(count => count + 1)}
      />
    )
  }

  const theme = getClanTheme(clan)

  return (
    <main
      className="min-h-screen bg-[#15191F] px-5 py-12 text-[#F1E3C6]"
      style={{
        '--clan-color': theme.color,
        '--clan-rgb': theme.rgb,
      }}
    >
      <div className="mx-auto max-w-7xl">

        <Link
          to="/clans"
          className="mb-8 inline-block font-bold"
          style={{ color: theme.color }}
        >
          ← BACK TO CLAN ARCHIVES
        </Link>

        <section
          className="overflow-hidden rounded-xl border bg-[#1B2029] p-6 md:p-10"
          style={{
            borderColor: theme.color,
            backgroundImage: `radial-gradient(
              ellipse at 20% 50%,
              rgba(${theme.rgb}, 0.15),
              transparent 65%
            )`,
          }}
        >
          <div
            className="flex justify-between gap-4 text-xs tracking-widest"
            style={{ color: theme.color }}
          >
            <span>CLASSIFIED BLOODLINE RECORD</span>

            <span>
              #{String(clan.id).padStart(3, '0')}
            </span>
          </div>

          <div className="mt-8 flex flex-col items-center gap-8 md:flex-row">

            <div
              className="clan-chakra-core w-full max-w-[260px] shrink-0"
              aria-hidden="true"
            >
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
            </div>

            <div className="flex-1 text-center md:text-left">

              <p
                className="mb-3 text-sm font-bold tracking-widest"
                style={{ color: theme.color }}
              >
                SHINOBI BLOODLINE
              </p>

              <h1 className="text-4xl font-bold md:text-6xl">
                {clan.name} Clan
              </h1>

              <p className="mt-4 text-gray-400">
                Hidden Leaf Archives
              </p>

              <div
                className="my-6 h-px"
                style={{
                  background: `linear-gradient(
                    90deg,
                    ${theme.color},
                    transparent
                  )`,
                }}
              />

              <p
                className="text-4xl font-bold"
                style={{ color: theme.color }}
              >
                {clan.characters?.length ?? 0}
              </p>

              <p className="mt-2 text-sm tracking-widest text-gray-400">
                REGISTERED MEMBERS
              </p>

            </div>
          </div>
        </section>

        <section className="mt-16">

          <div className="mb-8 text-center">

            <p
              className="mb-3 text-sm font-bold tracking-[0.3em]"
              style={{ color: theme.color }}
            >
              BLOODLINE PERSONNEL RECORDS
            </p>

            <h2 className="text-3xl font-bold md:text-4xl">
              Clan Members
            </h2>

            <p className="mt-3 text-gray-400">
              Discover the registered shinobi of the {clan.name} clan.
            </p>

            <p
              className="mt-4 text-sm"
              style={{ color: theme.color }}
            >
              {members.length} / {clan.characters?.length ?? 0}
              {' '}records retrieved
            </p>

          </div>

          {members.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {members.map(member => (
                <CharacterCard
                  key={member.id}
                  character={member}
                />
              ))}

            </div>
          )}

          {membersLoading && (
            <LoadingScreen
              title="Retrieving Clan Members"
              description="Accessing individual shinobi records..."
            />
          )}

          {!membersLoading &&
            members.length === 0 &&
            failedMembers === 0 && (
              <div className="rounded-xl border border-gray-700 bg-[#252A33] p-10 text-center">

                <span
                  className="text-5xl"
                  style={{ color: theme.color }}
                >
                  忍
                </span>

                <h3 className="mt-4 text-xl font-bold">
                  No Members Found
                </h3>

                <p className="mt-3 text-gray-400">
                  No shinobi records are available for this clan.
                </p>

              </div>
            )}

          {!membersLoading && failedMembers > 0 && (
            <div className="mt-8 rounded-lg border border-red-500/30 bg-red-950/20 p-5 text-center">

              <p className="text-red-400">
                {failedMembers} member records could not be retrieved.
              </p>

              <button
                onClick={() =>
                  setRetryCount(count => count + 1)
                }
                className="mt-4 rounded-lg border border-red-500/40 px-5 py-2 text-red-400 transition hover:bg-red-500 hover:text-white"
              >
                RETRY
              </button>

            </div>
          )}

        </section>

      </div>
    </main>
  )
}

export default ClanDetail