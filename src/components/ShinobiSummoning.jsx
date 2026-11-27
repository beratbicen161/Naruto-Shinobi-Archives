
import { useEffect, useRef, useState } from 'react'
import { getCharacters } from '../services/api'
import CharacterCard from './CharacterCard'
import ShurikenBackground from './ShurikenBackground'

function ShinobiSummoning() {
  const [character, setCharacter] = useState(null)
  const [summoning, setSummoning] = useState(false)
  const [phase, setPhase] = useState('idle')
  const [error, setError] = useState('')

  const audioRef = useRef(null)
  const controllerRef = useRef(null)
  const timersRef = useRef([])

  useEffect(() => {
    const audio = new Audio(
      `${import.meta.env.BASE_URL}sounds/kuchiyose.mp3`
    )

    audio.volume = 0.6
    audioRef.current = audio

    return () => {
      audio.pause()
      controllerRef.current?.abort()
      timersRef.current.forEach(clearTimeout)
    }
  }, [])

  function schedule(callback, duration) {
    const timer = setTimeout(callback, duration)
    timersRef.current.push(timer)
  }

  async function summonShinobi() {
    if (summoning) return

    timersRef.current.forEach(clearTimeout)
    timersRef.current = []

    controllerRef.current?.abort()

    const controller = new AbortController()
    controllerRef.current = controller

    setSummoning(true)
    setCharacter(null)
    setError('')
    setPhase('charging')

    if (audioRef.current) {
      audioRef.current.currentTime = 0

      audioRef.current.play().catch(() => {
        console.warn('Summoning audio could not be played.')
      })
    }

    schedule(() => {
      setPhase('smoke')
    }, 2000)

    try {
      const firstPage = await getCharacters(
        1,
        1,
        '',
        controller.signal
      )

      const total = Number(firstPage.total)

      if (!Number.isInteger(total) || total < 1) {
        throw new Error('No shinobi records found.')
      }

      const pageSize = 20
      const randomIndex = Math.floor(Math.random() * total)
      const randomPage = Math.floor(randomIndex / pageSize) + 1
      const indexInPage = randomIndex % pageSize

      const data = await getCharacters(
        randomPage,
        pageSize,
        '',
        controller.signal
      )

      const selectedCharacter = data.characters?.[indexInPage]

      if (!selectedCharacter) {
        throw new Error('Shinobi record not found.')
      }

      await new Promise(resolve => {
        schedule(resolve, 3500)
      })

      if (controller.signal.aborted) return

      setCharacter(selectedCharacter)
      setPhase('revealed')
      setSummoning(false)
    } catch (err) {
      if (controller.signal.aborted) return

      timersRef.current.forEach(clearTimeout)
      audioRef.current?.pause()

      setError('Summoning failed. Please try again.')
      setPhase('idle')
      setSummoning(false)
    }
  }

  return (
    <section className="relative isolate overflow-hidden bg-(--page-bg) px-5 py-20 text-(--text-primary)">

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.13),transparent_70%)]"
      />

      <ShurikenBackground />

      <div className="relative z-10 mx-auto max-w-6xl">

        <header className="mb-10 text-center">

          <p className="mb-4 text-xs font-bold tracking-[0.3em] text-(--accent)">
            SECRET SUMMONING TECHNIQUE
          </p>

          <h2 className="text-3xl font-bold md:text-5xl">
            SHINOBI SUMMONING
          </h2>

          <p className="mt-4 text-2xl text-(--accent)">
            口寄せの術
          </p>

          <div className="mx-auto my-6 h-px max-w-md bg-linear-to-r from-transparent via-orange-500 to-transparent" />

          <p className="mx-auto max-w-xl text-(--text-secondary)">
            Activate the ancient summoning seal and discover
            which shinobi destiny has chosen for you.
          </p>

        </header>

        <div className="relative overflow-hidden rounded-3xl border border-orange-500/30 bg-(--card-bg) px-5 py-10 shadow-[0_0_40px_rgba(249,115,22,0.08)] md:px-12">

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-5 top-5 text-3xl text-orange-500/30"
          >
            封
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-5 right-5 text-3xl text-orange-500/30"
          >
            忍
          </div>

          <div className="relative grid items-start gap-10 lg:grid-cols-2">

            <div className="flex flex-col items-center">

              <div className="relative flex aspect-square w-full max-w-[280px] items-center justify-center">

                <div
                  aria-hidden="true"
                  className={`absolute inset-0 rounded-full bg-orange-500/10 blur-3xl transition-opacity duration-700 ${
                    summoning
                      ? 'opacity-100 motion-safe:animate-pulse'
                      : 'opacity-40'
                  }`}
                />

                <svg
                  viewBox="0 0 320 320"
                  aria-hidden="true"
                  className={`relative w-full text-orange-500 transition-all duration-700 ${
                    summoning
                      ? 'drop-shadow-[0_0_18px_rgba(249,115,22,0.9)] motion-safe:animate-[spin_3s_linear_infinite]'
                      : 'drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]'
                  }`}
                >

                  {[145, 130, 110, 85, 70].map(radius => (
                    <circle
                      key={radius}
                      cx="160"
                      cy="160"
                      r={radius}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  ))}

                  {Array.from({ length: 24 }, (_, index) => {
                    const angle = index * Math.PI / 12

                    return (
                      <line
                        key={index}
                        x1={160 + 130 * Math.cos(angle)}
                        y1={160 + 130 * Math.sin(angle)}
                        x2={160 + 145 * Math.cos(angle)}
                        y2={160 + 145 * Math.sin(angle)}
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    )
                  })}

                  <path
                    d="M160 50 L255 215 L65 215 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    opacity="0.7"
                  />

                  <path
                    d="M160 270 L65 105 L255 105 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    opacity="0.7"
                  />

                  {['封', '術', '召', '印'].map((symbol, index) => {
                    const angle =
                      index * Math.PI / 2 - Math.PI / 2

                    return (
                      <text
                        key={symbol}
                        x={160 + 97 * Math.cos(angle)}
                        y={160 + 97 * Math.sin(angle)}
                        fill="currentColor"
                        fontSize="18"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {symbol}
                      </text>
                    )
                  })}

                </svg>

                <div
                  aria-hidden="true"
                  className={`absolute select-none text-7xl text-orange-500 transition-all duration-700 ${
                    summoning
                      ? 'scale-125 motion-safe:animate-pulse'
                      : 'scale-100'
                  }`}
                >
                  忍
                </div>

                {summoning && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                  >
                    {Array.from({ length: 16 }, (_, index) => (
                      <span
                        key={index}
                        style={{
                          left: `${10 + (index * 17) % 80}%`,
                          top: `${10 + (index * 23) % 80}%`,
                          animationDelay: `${index * 0.12}s`,
                          animationDuration: '1.5s',
                        }}
                        className="absolute size-2 rounded-full bg-orange-400 shadow-[0_0_12px_#F97316] motion-safe:animate-ping"
                      />
                    ))}
                  </div>
                )}

              </div>

              <div
                aria-live="polite"
                className="mt-3 min-h-10 text-center"
              >
                <p className="text-xs font-bold tracking-[0.2em] text-(--accent)">
                  {phase === 'charging'
                    ? 'CHANNELING CHAKRA...'
                    : phase === 'smoke'
                      ? 'SUMMONING IN PROGRESS...'
                      : phase === 'revealed'
                        ? 'SUMMONING SUCCESSFUL'
                        : 'SUMMONING SEAL READY'}
                </p>
              </div>

              <button
                type="button"
                onClick={summonShinobi}
                disabled={summoning}
                className="w-full max-w-sm rounded-xl border border-orange-500 bg-orange-600 px-6 py-4 font-bold tracking-wider text-white shadow-[0_0_20px_rgba(249,115,22,0.25)] transition-all duration-300 hover:scale-105 hover:bg-orange-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                {summoning
                  ? 'SUMMONING...'
                  : character
                    ? 'SUMMON AGAIN'
                    : 'SUMMON A SHINOBI'}
              </button>

              {error && (
                <p
                  role="alert"
                  className="mt-4 text-center text-sm text-red-500"
                >
                  {error}
                </p>
              )}

              <article className="group relative mt-10 w-full max-w-sm transition-transform duration-500 motion-safe:hover:-translate-y-1">

                <div className="relative z-10 h-5 rounded-full border border-[#3D2414] bg-linear-to-b from-[#A47B48] via-[#79502D] to-[#402616] shadow-[0_4px_8px_rgba(0,0,0,0.4)]">

                  <div className="absolute -left-2 -top-1 h-7 w-5 rounded-md border border-[#402616] bg-linear-to-b from-[#B38A50] via-[#79502D] to-[#402616]" />

                  <div className="absolute -right-2 -top-1 h-7 w-5 rounded-md border border-[#402616] bg-linear-to-b from-[#B38A50] via-[#79502D] to-[#402616]" />

                </div>

                <div className="relative mx-2 overflow-hidden border-x border-[#A7834F] bg-[#DFC79B] px-6 py-7 text-center text-[#49321F] shadow-[inset_0_0_35px_rgba(100,60,20,0.4),0_8px_20px_rgba(0,0,0,0.2)]">

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,#F4E4BD_0%,transparent_80%)]"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-10 -right-5 select-none text-[150px] text-[#79502D]/10"
                  >
                    召
                  </div>

                  <div
                    aria-hidden="true"
                    className="absolute left-3 top-3 size-5 border-l-2 border-t-2 border-[#987344]/60"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute right-3 top-3 size-5 border-r-2 border-t-2 border-[#987344]/60"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute bottom-3 left-3 size-5 border-b-2 border-l-2 border-[#987344]/60"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute bottom-3 right-3 size-5 border-b-2 border-r-2 border-[#987344]/60"
                  />

                  <div className="relative">

                    <p className="mb-3 text-[10px] font-bold tracking-[0.2em] text-[#79502D]">
                      SECRET NINJA SCROLL
                    </p>

                    <h3 className="text-xl font-bold text-[#49321F] sm:text-2xl">
                      Kuchiyose no Jutsu
                    </h3>

                    <p className="mt-2 text-xl text-[#8B3A25]">
                      口寄せの術
                    </p>

                    <div className="mx-auto my-4 h-px w-4/5 bg-linear-to-r from-transparent via-[#987344] to-transparent" />

                    <p className="text-sm leading-7 text-[#49321F]">
                      The Summoning Technique is a space-time
                      ninjutsu that allows shinobi to summon
                      creatures, allies or objects through chakra.
                      Many shinobi form special contracts with
                      their summoned companions.
                    </p>

                    <div className="mx-auto my-4 h-px w-4/5 bg-linear-to-r from-transparent via-[#987344] to-transparent" />

                    <div className="mx-auto flex size-11 rotate-[-8deg] items-center justify-center rounded-sm border-2 border-[#9B392C]/70 text-2xl font-bold text-[#9B392C]">
                      封
                    </div>

                    <p className="mt-3 text-[9px] font-bold tracking-[0.2em] text-[#79502D]">
                      SHINOBI TECHNIQUE ARCHIVES
                    </p>

                  </div>

                </div>

                <div className="relative z-10 h-5 rounded-full border border-[#3D2414] bg-linear-to-b from-[#A47B48] via-[#79502D] to-[#402616] shadow-[0_5px_10px_rgba(0,0,0,0.4)]">

                  <div className="absolute -left-2 -top-1 h-7 w-5 rounded-md border border-[#402616] bg-linear-to-b from-[#B38A50] via-[#79502D] to-[#402616]" />

                  <div className="absolute -right-2 -top-1 h-7 w-5 rounded-md border border-[#402616] bg-linear-to-b from-[#B38A50] via-[#79502D] to-[#402616]" />

                </div>

              </article>

            </div>

            <div className="relative flex min-h-[440px] items-center justify-center overflow-hidden rounded-2xl border border-orange-500/20 bg-(--page-bg) p-5 lg:self-stretch">

              {character ? (

                <div className="w-full max-w-sm">

                  <p className="mb-5 text-center text-xs font-bold tracking-[0.2em] text-(--accent)">
                    SUMMONED SHINOBI
                  </p>

                  <CharacterCard
                    key={character.id}
                    character={character}
                  />

                </div>

              ) : (

                <div className="relative flex min-h-[400px] w-full flex-col items-center justify-center text-center">

                  <div
                    className={`mb-6 text-8xl text-orange-500/30 transition-all duration-700 ${
                      summoning
                        ? 'scale-110 motion-safe:animate-pulse'
                        : ''
                    }`}
                  >
                    {summoning ? '召' : '?'}
                  </div>

                  <h3 className="mb-3 text-xl">
                    {summoning
                      ? 'A SHINOBI IS APPROACHING'
                      : 'UNKNOWN SHINOBI'}
                  </h3>

                  <p className="max-w-xs text-sm text-(--text-secondary)">
                    {summoning
                      ? 'The summoning seal is connecting to the Shinobi Archives.'
                      : 'Activate the summoning technique to reveal a mysterious shinobi.'}
                  </p>

                  {phase === 'smoke' && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                    >
                      {Array.from({ length: 9 }, (_, index) => (
                        <span
                          key={index}
                          style={{
                            left: `${5 + (index * 19) % 75}%`,
                            top: `${15 + (index * 13) % 65}%`,
                            animationDelay: `${index * 0.15}s`,
                          }}
                          className="absolute size-28 rounded-full bg-white/40 blur-2xl motion-safe:animate-[ping_2s_ease-out_infinite]"
                        />
                      ))}
                    </div>
                  )}

                </div>

              )}

            </div>

          </div>

        </div>

        <p className="mt-8 text-center text-xs tracking-[0.2em] text-(--text-secondary)">
          KUCHIYOSE NO JUTSU — SHINOBI ARCHIVES
        </p>

      </div>

    </section>
  )
}

export default ShinobiSummoning
