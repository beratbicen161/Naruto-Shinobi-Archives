
import { useState } from 'react'
import BattleCharacterSelector from '../components/BattleCharacterSelector'
import BattleFormSelector from '../components/BattleFormSelector'
import BattleEffects from '../components/BattleEffects'
import BattleBackgroundEffects from '../components/BattleBackgroundEffects'
import JutsuEffects from '../components/JutsuEffects'
import useBattle from '../hooks/useBattle'
import useBattleAudio from '../hooks/useBattleAudio'
import { getHPColor } from '../services/battleEngine'
import {
  battleStatistics,
  getCharacterForms,
  getPowerTier,
} from '../data/battleStats'

const imagePath = `${import.meta.env.BASE_URL}images/battle/`

const locations = [
  {
    id: 'valley',
    name: 'Valley of the End',
    symbol: '谷',
    image: `${imagePath}valley-of-the-end.png`,
    color: '#38BDF8',
  },
  {
    id: 'chunin',
    name: 'Chunin Arena',
    symbol: '闘',
    image: `${imagePath}chunin-arena.png`,
    color: '#F97316',
  },
  {
    id: 'forest',
    name: 'Forest of Death',
    symbol: '森',
    image: `${imagePath}forest-of-death.png`,
    color: '#22C55E',
  },
  {
    id: 'training',
    name: 'Konoha Training Ground',
    symbol: '木',
    image: `${imagePath}konoha-training.png`,
    color: '#84CC16',
  },
  {
    id: 'sand',
    name: 'Hidden Sand Village',
    symbol: '砂',
    image: `${imagePath}hidden-sand.png`,
    color: '#EAB308',
  },
  {
    id: 'war',
    name: 'Great Ninja War',
    symbol: '忍',
    image: `${imagePath}great-ninja-war.png`,
    color: '#A855F7',
  },
]

const dissolveParticles = Array.from(
  { length: 36 },
  (_, index) => ({
    id: index,
    x: (index * 37 + 13) % 100,
    y: (index * 23 + 19) % 100,
    size: 3 + index % 6,
    speed: 30 + index % 8 * 10,
    angle: index * Math.PI * 2 / 36,
  })
)

function CardDissolve({ progress, color }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-30 motion-reduce:hidden"
    >
      {dissolveParticles.map(particle => {
        const distance = progress * particle.speed

        const x =
          Math.cos(particle.angle) * distance

        const y =
          Math.sin(particle.angle) * distance -
          progress * 45

        return (
          <span
            key={particle.id}
            className="absolute rounded-sm"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor:
                particle.id % 3 === 0
                  ? '#FFFFFF'
                  : color,
              boxShadow: `0 0 10px ${color}`,
              opacity: Math.sin(progress * Math.PI),
              transform: `translate(${x}px, ${y}px)
                rotate(${progress * 360}deg)
                scale(${1 - progress * 0.7})`,
            }}
          />
        )
      })}
    </div>
  )
}

function FighterPortrait({ character }) {
  const [imageIndex, setImageIndex] = useState(0)

  const images = Array.isArray(character.images)
    ? character.images.filter(Boolean)
    : []

  return (
    <div className="absolute inset-0">
      {images[imageIndex] ? (
        <img
          src={images[imageIndex]}
          alt={character.name}
          onError={() =>
            setImageIndex(previous => previous + 1)
          }
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <span className="text-6xl text-gray-500">
            忍
          </span>
        </div>
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
    </div>
  )
}

function getCardMotion(frame, side) {
  const direction = side === 'first' ? 1 : -1
  const time = (frame.elapsed || 0) / 1000
  const progress = frame.stageProgress || 0
  const impact = frame.impact || 0

  if (
    frame.phase !== 'battle' ||
    frame.stage === 'victory'
  ) {
    return {
      x: 0,
      y: 0,
      rotation: 0,
    }
  }

  let x = 0
  let y = 0
  let rotation = 0

  switch (frame.stage) {
    case 'first-clash':
      x =
        direction *
        Math.sin(progress * Math.PI * 4) *
        14

      y = Math.sin(time * 6) * 4

      rotation =
        direction *
        Math.sin(time * 5) *
        2

      break

    case 'signature-jutsu':
      x =
        direction *
        Math.sin(progress * Math.PI) *
        10

      y = Math.sin(time * 3) * 5

      rotation =
        direction *
        Math.sin(time * 3) *
        1.5

      break

    case 'ultimate-clash':
      x =
        direction *
        (12 + Math.sin(time * 6) * 5)

      y = Math.sin(time * 5) * 4

      rotation =
        direction * impact * 3

      break

    case 'final-impact':
      x =
        direction *
        Math.sin(progress * Math.PI) *
        20

      y =
        -Math.sin(progress * Math.PI) * 6

      rotation =
        direction *
        Math.sin(progress * Math.PI) *
        3

      break

    default:
      break
  }

  return { x, y, rotation }
}

function FighterCard({
  side,
  fighter,
  hp,
  locked,
  frame,
  onSelect,
  onChangeForm,
}) {
  const isFirst = side === 'first'

  const accent = isFirst
    ? 'text-orange-400'
    : 'text-indigo-400'

  const auraColor = isFirst
    ? '#F97316'
    : '#6366F1'

  const tier = fighter
    ? getPowerTier(fighter.form.power)
    : null

  const formCount = fighter
    ? getCharacterForms(fighter.character.name).length
    : 0

  const isCharging =
    frame.phase === 'countdown'

  const isVictory =
    frame.stage === 'victory' ||
    frame.finished

  const isBattling =
    frame.phase === 'battle' &&
    !isVictory

  const isWinner =
    isVictory &&
    frame.winner === side

  const isDefeated =
    isVictory &&
    frame.winner !== 'draw' &&
    frame.winner !== side

  const isDraw =
    isVictory &&
    frame.winner === 'draw'

  const victoryProgress = frame.finished
    ? 1
    : frame.victoryProgress || 0

  const dissolveProgress = isDefeated
    ? Math.min(1, victoryProgress * 1.5)
    : 0

  const motion = getCardMotion(frame, side)

  const cardScale = isDefeated
    ? 1 - dissolveProgress * 0.4
    : isWinner
      ? 1 + victoryProgress * 0.06
      : 1

  const cardOpacity = isDefeated
    ? 1 - dissolveProgress
    : 1

  const showDefeatedPanel =
    isDefeated &&
    (dissolveProgress >= 1 || frame.finished)

  return (
    <div className="relative w-full max-w-[240px] min-w-0">

      <div className="mb-1.5 flex flex-wrap items-center justify-between gap-1">

        <p className={`text-[10px] font-bold tracking-widest ${accent}`}>
          PLAYER {isFirst ? '01' : '02'}
        </p>

        <p
          className="text-[10px] font-bold tabular-nums"
          style={{
            color: getHPColor(hp),
          }}
        >
          HP {hp}/100
        </p>

      </div>

      <div
        role="progressbar"
        aria-label={`Player ${isFirst ? 'one' : 'two'} HP`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={hp}
        className="mb-2 h-2 overflow-hidden rounded-full border border-white/20 bg-black/70"
      >
        <div
          className="h-full rounded-full transition-all duration-150"
          style={{
            width: `${hp}%`,
            backgroundColor: getHPColor(hp),
            boxShadow: `0 0 8px ${getHPColor(hp)}`,
          }}
        />
      </div>

      <div className="relative">

        {(isCharging || isBattling) && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-3 rounded-3xl blur-xl motion-reduce:hidden"
            style={{
              backgroundColor: auraColor,
              opacity:
                (frame.intensity || 0.3) * 0.45,
            }}
          />
        )}

        {isWinner && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-4 animate-pulse rounded-3xl bg-yellow-400/40 blur-2xl motion-reduce:hidden"
          />
        )}

        <div
          className="relative motion-safe:translate-x-(--motion-x) motion-safe:translate-y-(--motion-y) motion-safe:rotate-(--motion-rotation) motion-safe:scale-(--card-scale)"
          style={{
            '--motion-x': `${motion.x}px`,
            '--motion-y': `${motion.y}px`,
            '--motion-rotation': `${motion.rotation}deg`,
            '--card-scale': cardScale,
          }}
        >

          <button
            type="button"
            onClick={onSelect}
            disabled={locked || isDefeated}
            aria-label={
              fighter
                ? `Change ${fighter.character.name}`
                : `Select player ${isFirst ? 'one' : 'two'}`
            }
            className={`group relative flex h-[clamp(130px,23vh,230px)] w-full flex-col items-center justify-center overflow-hidden rounded-xl border-2 backdrop-blur-sm ${
              isWinner
                ? 'border-yellow-400 bg-yellow-950/60 shadow-[0_0_40px_rgba(234,179,8,0.6)]'
                : isFirst
                  ? 'border-orange-500 bg-orange-950/70 shadow-[0_0_25px_rgba(249,115,22,0.3)]'
                  : 'border-indigo-500 bg-indigo-950/70 shadow-[0_0_25px_rgba(99,102,241,0.3)]'
            } ${
              locked
                ? 'cursor-default'
                : 'cursor-pointer'
            } motion-safe:blur-(--dissolve-blur)`}
            style={{
              opacity: cardOpacity,
              '--dissolve-blur': `${dissolveProgress * 8}px`,
            }}
          >

            {fighter ? (
              <>
                <FighterPortrait
                  key={fighter.character.id}
                  character={fighter.character}
                />

                {!locked && !isDefeated && !isWinner && (
                  <span className="absolute right-2 top-2 rounded border border-white/20 bg-black/70 px-2 py-1 text-[9px] font-bold text-white">
                    CHANGE
                  </span>
                )}

                {isCharging && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 motion-reduce:hidden"
                    style={{
                      boxShadow: `inset 0 0 ${
                        15 +
                        (frame.stageProgress || 0) * 40
                      }px ${auraColor}`,
                    }}
                  />
                )}

                {isBattling && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 motion-reduce:hidden"
                    style={{
                      boxShadow: `inset 0 0 35px ${auraColor}`,
                      opacity:
                        (frame.impact || 0) * 0.6,
                    }}
                  />
                )}

                {isWinner && (
                  <div className="absolute inset-x-0 top-0 z-10 bg-linear-to-r from-yellow-700 via-yellow-400 to-yellow-700 px-2 py-1.5 text-center text-[10px] font-black tracking-[0.2em] text-black">
                    VICTORY
                  </div>
                )}

                {isDraw && (
                  <div className="absolute inset-x-0 top-0 z-10 bg-gray-800/90 px-2 py-1.5 text-center text-[10px] font-bold tracking-widest text-white">
                    DRAW
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 p-2 text-center">

                  <p className={`text-[9px] font-bold uppercase tracking-wider sm:text-[10px] ${
                    isWinner
                      ? 'text-yellow-300'
                      : accent
                  }`}>
                    {fighter.form.name}
                  </p>

                  <h3 className="mt-1 text-xs leading-relaxed text-white sm:text-base">
                    {fighter.character.name}
                  </h3>

                </div>
              </>
            ) : (
              <>
                <span className={`absolute text-[130px] opacity-10 ${accent}`}>
                  忍
                </span>

                <svg
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`relative mb-2 size-10 transition-transform group-hover:scale-110 sm:size-14 ${accent}`}
                  aria-hidden="true"
                >
                  <circle
                    cx="50"
                    cy="32"
                    r="17"
                  />

                  <path d="M18 86 Q18 56 50 56 Q82 56 82 86 Z" />

                  <circle
                    cx="50"
                    cy="50"
                    r="47"
                    strokeDasharray="5 8"
                    opacity="0.4"
                  />
                </svg>

                <p className={`relative px-2 text-center text-[10px] font-bold sm:text-sm ${accent}`}>
                  SELECT SHINOBI
                </p>

                <p className="relative mt-2 px-2 text-center text-[9px] text-gray-300">
                  Choose your fighter
                </p>
              </>
            )}

          </button>

        </div>

        {isDefeated && dissolveProgress < 1 && (
          <CardDissolve
            progress={dissolveProgress}
            color={auraColor}
          />
        )}

        {showDefeatedPanel && (
          <button
            type="button"
            onClick={onSelect}
            disabled={locked}
            className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-500/40 bg-black/40 p-2 backdrop-blur-sm transition-colors enabled:hover:border-orange-400 disabled:cursor-default"
          >

            <span className="text-5xl text-gray-500/60">
              忍
            </span>

            <p className="mt-3 text-xs font-bold tracking-widest text-gray-400">
              DEFEATED
            </p>

            <p className="mt-2 text-center text-[10px] text-gray-300">
              {fighter?.character.name}
            </p>

            {!locked && (
              <p className="mt-3 text-[9px] text-orange-400">
                Select another shinobi
              </p>
            )}

          </button>
        )}

      </div>

      <div className={`mt-2 rounded-lg border bg-black/75 p-2.5 text-center backdrop-blur-md transition-all duration-700 ${
        isWinner
          ? 'border-yellow-400/60'
          : 'border-white/15'
      } ${
        isDefeated
          ? 'opacity-40'
          : 'opacity-100'
      }`}>

        <div className="flex flex-wrap items-center justify-between gap-1">

          <p className="text-[9px] tracking-wider text-gray-300">
            POWER LEVEL
          </p>

          <p className={`text-xl font-bold ${
            isWinner
              ? 'text-yellow-400'
              : accent
          }`}>
            {fighter
              ? fighter.form.power
              : '—'}
          </p>

        </div>

        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">

          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isWinner
                ? 'bg-linear-to-r from-yellow-700 to-yellow-300'
                : isFirst
                  ? 'bg-linear-to-r from-orange-700 to-orange-400'
                  : 'bg-linear-to-r from-indigo-700 to-indigo-400'
            }`}
            style={{
              width: fighter
                ? `${fighter.form.power / 10}%`
                : '0%',
            }}
          />

        </div>

        {fighter ? (
          <>
            <p
              className="mt-1.5 text-[10px] font-bold"
              style={{
                color:
                  tier?.color || '#9CA3AF',
              }}
            >
              {tier?.name}
            </p>

            <p className="mt-1 text-[10px] leading-4 text-gray-300">
              {fighter.form.jutsu}
            </p>

            <p className={`mt-1 text-[9px] font-bold uppercase ${accent}`}>
              {fighter.form.element}
            </p>
          </>
        ) : (
          <p className="mt-2 text-[10px] text-gray-400">
            No shinobi selected
          </p>
        )}

      </div>

      <button
        type="button"
        onClick={onChangeForm}
        disabled={
          locked ||
          !fighter ||
          formCount <= 1
        }
        className={`mt-2 flex w-full items-center justify-center gap-2 rounded-lg border px-2 py-2 text-[9px] font-bold tracking-wider backdrop-blur-md transition-all disabled:cursor-not-allowed disabled:opacity-30 sm:text-[10px] ${
          isFirst
            ? 'border-orange-500/50 bg-orange-950/80 text-orange-400 hover:bg-orange-900/80'
            : 'border-indigo-500/50 bg-indigo-950/80 text-indigo-400 hover:bg-indigo-900/80'
        }`}
      >

        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4 shrink-0"
          aria-hidden="true"
        >
          <path d="M13 2 L4 14 H11 L10 22 L20 10 H13 Z" />
        </svg>

        {fighter && formCount === 1
          ? 'SINGLE FORM'
          : 'CHANGE FORM'}

        {fighter && (
          <span className="rounded-full bg-black/30 px-1.5">
            {formCount}
          </span>
        )}

      </button>

    </div>
  )
}

function BattlefieldBackground({
  selectedLocation,
  frame,
}) {
  const isBattling =
    frame.phase === 'battle' &&
    frame.stage !== 'victory'

  const time =
    (frame.elapsed || 0) / 1000

  const impact =
    frame.impact || 0

  const intensity =
    frame.intensity || 0

  const shakeX = isBattling
    ? Math.sin(time * 32) *
      impact *
      intensity *
      3
    : 0

  const shakeY = isBattling
    ? Math.cos(time * 27) *
      impact *
      intensity *
      2
    : 0

  const zoom = isBattling
    ? 1.04 + intensity * 0.05
    : 1

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >

      <div
        className="absolute inset-0 motion-safe:translate-x-(--shake-x) motion-safe:translate-y-(--shake-y) motion-safe:scale-(--arena-zoom)"
        style={{
          '--shake-x': `${shakeX}px`,
          '--shake-y': `${shakeY}px`,
          '--arena-zoom': zoom,
        }}
      >

        {locations.map(location => (
          <div
            key={location.id}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 motion-reduce:transition-none ${
              selectedLocation === location.id
                ? 'opacity-100'
                : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url("${location.image}")`,
            }}
          />
        ))}

      </div>

      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute inset-0 bg-linear-to-t from-[#10151D]/80 via-transparent to-[#10151D]/30" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(249,115,22,0.12),transparent_55%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(99,102,241,0.15),transparent_55%)]" />

      {isBattling && (
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,black_100%)]"
          style={{
            opacity: intensity * 0.4,
          }}
        />
      )}

      {frame.stage === 'final-impact' && (
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,237,213,0.4),transparent_65%)] motion-reduce:hidden"
          style={{
            opacity:
              Math.sin(
                (frame.stageProgress || 0) *
                Math.PI
              ) * 0.5,
          }}
        />
      )}

    </div>
  )
}

function BattleLocationCard({
  location,
  active,
  locked,
  onSelect,
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      disabled={locked}
      title={location.name}
      className={`group relative overflow-hidden rounded-lg border-2 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${
        active
          ? 'border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]'
          : 'border-white/10 hover:border-orange-500/60'
      }`}
    >

      <div className="relative h-14 overflow-hidden bg-[#202630] sm:h-[clamp(45px,7vh,75px)]">

        <img
          src={location.image}
          alt={location.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />

        <span
          className="absolute bottom-1 left-2 text-xl"
          style={{
            color: location.color,
          }}
        >
          {location.symbol}
        </span>

        {active && (
          <span className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
            ✓
          </span>
        )}

      </div>

      <div className={`flex min-h-8 items-center justify-center px-1 py-1.5 ${
        active
          ? 'bg-orange-950/60 text-orange-300'
          : 'bg-[#1B222C] text-gray-300'
      }`}>

        <p className="text-center text-[9px] font-bold leading-3 sm:text-[10px]">
          {location.name}
        </p>

      </div>

    </button>
  )
}

function BattleStageIndicator({ frame }) {
  const stages = [
    {
      id: 'first-clash',
      name: 'Clash',
    },
    {
      id: 'signature-jutsu',
      name: 'Jutsu',
    },
    {
      id: 'ultimate-clash',
      name: 'Ultimate',
    },
    {
      id: 'final-impact',
      name: 'Final',
    },
  ]

  const currentIndex =
    stages.findIndex(
      stage => stage.id === frame.stage
    )

  return (
    <div className="mt-3 hidden w-full max-w-[200px] grid-cols-4 gap-1 sm:grid">

      {stages.map((stage, index) => (
        <div
          key={stage.id}
          className="min-w-0"
        >

          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">

            <div
              className={`h-full rounded-full ${
                index === currentIndex
                  ? 'bg-orange-400'
                  : 'bg-yellow-500'
              }`}
              style={{
                width:
                  index < currentIndex
                    ? '100%'
                    : index === currentIndex
                      ? `${(frame.stageProgress || 0) * 100}%`
                      : '0%',
              }}
            />

          </div>

          <p className={`mt-1 text-center text-[8px] ${
            index === currentIndex
              ? 'text-orange-300'
              : 'text-gray-400'
          }`}>
            {stage.name}
          </p>

        </div>
      ))}

    </div>
  )
}

function BattleCenter({
  frame,
  firstFighter,
  secondFighter,
}) {
  const bothSelected =
    Boolean(firstFighter && secondFighter)

  const isVictory =
    frame.stage === 'victory' ||
    frame.finished

  if (frame.phase === 'countdown') {
    return (
      <div className="relative flex flex-col items-center text-center">

        <p className="text-[10px] font-bold tracking-widest text-orange-300">
          CHAKRA CHARGING
        </p>

        <p
          key={frame.countdown}
          className="my-4 text-5xl font-black text-orange-400 drop-shadow-[0_0_25px_rgba(249,115,22,0.9)] motion-safe:animate-pulse sm:text-8xl"
        >
          {frame.countdown}
        </p>

        <div className="h-1.5 w-full max-w-[140px] overflow-hidden rounded-full bg-black/70">

          <div
            className="h-full rounded-full bg-linear-to-r from-orange-600 to-yellow-300"
            style={{
              width: `${(frame.stageProgress || 0) * 100}%`,
            }}
          />

        </div>

        <p className="mt-2 hidden text-[10px] tracking-widest text-white sm:block">
          GET READY
        </p>

      </div>
    )
  }

  if (isVictory) {
    const winner =
      frame.winner === 'first'
        ? firstFighter
        : frame.winner === 'second'
          ? secondFighter
          : null

    return (
      <div
        aria-live="polite"
        className="relative flex w-full flex-col items-center text-center"
      >

        <span className="text-4xl text-yellow-400 drop-shadow-[0_0_20px_rgba(234,179,8,0.8)] sm:text-6xl">
          {winner ? '勝' : '引'}
        </span>

        <p className="mt-3 text-xl font-black tracking-wider text-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.8)] sm:text-4xl">
          {winner ? 'WINNER' : 'DRAW'}
        </p>

        {winner && (
          <div className="mt-3 w-full rounded-lg border border-yellow-500/40 bg-black/75 p-2 backdrop-blur-md sm:p-3">

            <p className="text-xs font-bold text-yellow-300 sm:text-base">
              {winner.character.name}
            </p>

            <p className="mt-1 text-[10px] text-gray-300">
              {winner.form.name}
            </p>

            <p className="mt-2 text-xs font-bold text-yellow-400">
              {winner.form.power} POWER
            </p>

          </div>
        )}

        <p className="mt-3 text-[10px] uppercase tracking-widest text-white">
          {frame.finished
            ? 'Battle Complete'
            : winner
              ? 'Victory'
              : 'Equal Power'}
        </p>

      </div>
    )
  }

  if (frame.phase === 'battle') {
    const stageTitle =
      frame.stageName ||
      'BATTLE IN PROGRESS'

    const mainTitle =
      frame.stage === 'signature-jutsu'
        ? 'JUTSU'
        : frame.stage === 'ultimate-clash'
          ? 'ULTIMATE'
          : frame.stage === 'final-impact'
            ? 'FINAL'
            : 'CLASH'

    return (
      <div className="relative flex w-full flex-col items-center text-center">

        <p className="rounded bg-black/60 px-2 py-1 text-[9px] font-bold tracking-widest text-orange-300 sm:text-[10px]">
          {stageTitle}
        </p>

        <p className={`my-3 max-w-full font-black italic text-orange-400 drop-shadow-[0_0_20px_rgba(249,115,22,0.9)] ${
          mainTitle === 'ULTIMATE'
            ? 'text-[13px] sm:text-3xl'
            : 'text-xl sm:text-5xl'
        }`}>
          {mainTitle}
        </p>

        <div className="w-full max-w-[180px] overflow-hidden rounded-full border border-orange-500/40 bg-black/70">

          <div
            className="h-2 rounded-full bg-linear-to-r from-orange-700 to-yellow-400 transition-all duration-150"
            style={{
              width: `${frame.progress}%`,
            }}
          />

        </div>

        <p className="mt-2 text-xs font-bold tabular-nums text-white">
          {frame.progress}%
        </p>

        <BattleStageIndicator
          frame={frame}
        />

      </div>
    )
  }

  return (
    <div className="flex flex-col items-center text-center">

      <span className="hidden text-[10px] font-bold uppercase tracking-[0.3em] text-white sm:block">
        SHINOBI CLASH
      </span>

      <p className="my-3 text-4xl font-black italic text-orange-400 drop-shadow-[0_0_20px_rgba(249,115,22,0.9)] sm:text-7xl">
        VS
      </p>

      <div className="hidden h-px w-full bg-linear-to-r from-orange-500 via-white/60 to-indigo-500 sm:block" />

      <div
        aria-live="polite"
        className="mt-3 rounded-lg border border-white/15 bg-black/65 px-2 py-2 backdrop-blur-md sm:px-4"
      >

        <p className={`text-[9px] font-bold uppercase tracking-wider sm:text-xs ${
          bothSelected
            ? 'text-green-400'
            : 'text-gray-300'
        }`}>
          {bothSelected
            ? 'Ready to Battle'
            : 'Select your shinobi'}
        </p>

      </div>

      {bothSelected && (
        <div className="mt-3 hidden rounded-lg border border-white/10 bg-black/60 p-3 backdrop-blur-md sm:block">

          <p className="text-xs font-bold text-orange-400">
            {firstFighter.character.name}
          </p>

          <p className="mt-1 text-[10px] text-gray-300">
            {firstFighter.form.name}
          </p>

          <p className="my-2 text-[10px] text-white">
            VS
          </p>

          <p className="text-xs font-bold text-indigo-400">
            {secondFighter.character.name}
          </p>

          <p className="mt-1 text-[10px] text-gray-300">
            {secondFighter.form.name}
          </p>

        </div>
      )}

    </div>
  )
}

function BattleArena() {
  const [selectedLocation, setSelectedLocation] =
    useState('valley')

  const [soundEnabled, setSoundEnabled] =
    useState(true)

  const [musicEnabled, setMusicEnabled] =
    useState(true)

  const [firstFighter, setFirstFighter] =
    useState(null)

  const [secondFighter, setSecondFighter] =
    useState(null)

  const [selectorSide, setSelectorSide] =
    useState(null)

  const [pendingSelection, setPendingSelection] =
    useState(null)

  const {
    frame,
    isRunning,
    startBattle,
    resetBattle,
  } = useBattle()

  const {
    prepareBattle,
    handleSoundToggle,
    handleMusicToggle,
  } = useBattleAudio({
    frame,
    firstFighter,
    secondFighter,
    soundEnabled,
    musicEnabled,
  })

  const currentLocation =
    locations.find(
      location =>
        location.id === selectedLocation
    )

  const bothSelected =
    Boolean(firstFighter && secondFighter)

  const isVictory =
    frame.stage === 'victory' ||
    frame.finished

  const hasWinner =
    isVictory &&
    frame.winner !== 'draw'

  function toggleSound() {
    const nextEnabled =
      !soundEnabled

    handleSoundToggle(nextEnabled)

    setSoundEnabled(nextEnabled)
  }

  function toggleMusic() {
    const nextEnabled =
      !musicEnabled

    handleMusicToggle(nextEnabled)

    setMusicEnabled(nextEnabled)
  }

  function openCharacterSelector(side) {
    if (isRunning) return

    setSelectorSide(side)
  }

  function handleCharacterSelect(character) {
    if (isRunning) return

    const forms =
      getCharacterForms(character.name)

    if (
      forms.length === 0 ||
      !selectorSide
    ) {
      return
    }

    const currentFighter =
      selectorSide === 'first'
        ? firstFighter
        : secondFighter

    setPendingSelection({
      character,
      side: selectorSide,
      initialFormId:
        currentFighter?.character.id ===
        character.id
          ? currentFighter.form.id
          : forms[0].id,
      mode: 'character',
    })

    setSelectorSide(null)
  }

  function handleFormConfirm(fighter) {
    if (
      !pendingSelection ||
      isRunning
    ) {
      return
    }

    resetBattle()

    if (pendingSelection.side === 'first') {
      setFirstFighter(fighter)
    } else if (
      pendingSelection.side === 'second'
    ) {
      setSecondFighter(fighter)
    }

    setPendingSelection(null)
  }

  function handleChangeForm(side) {
    if (isRunning) return

    const fighter =
      side === 'first'
        ? firstFighter
        : secondFighter

    if (!fighter) return

    setPendingSelection({
      character: fighter.character,
      side,
      initialFormId: fighter.form.id,
      mode: 'form',
    })
  }

  function handleFormBack() {
    if (!pendingSelection) return

    if (
      pendingSelection.mode === 'character'
    ) {
      setSelectorSide(
        pendingSelection.side
      )
    }

    setPendingSelection(null)
  }

  function handleLocationSelect(locationId) {
    if (isRunning) return

    setSelectedLocation(locationId)
  }

  function resetFighters() {
    if (isRunning) return

    resetBattle()

    setFirstFighter(null)
    setSecondFighter(null)
    setSelectorSide(null)
    setPendingSelection(null)
  }

  function handleStartBattle() {
    if (
      !bothSelected ||
      isRunning
    ) {
      return
    }

    const started = startBattle(
      firstFighter,
      secondFighter
    )

    if (started) {
      prepareBattle()
    }
  }

  return (
    <main className="relative isolate min-h-screen bg-[#10151D] text-[#F1E3C6]">

      <BattleBackgroundEffects />

      <div className="relative z-10 mx-auto max-w-[1500px] px-3 pb-3 pt-3 sm:px-6">

        <header className="relative mb-3 overflow-hidden rounded-xl border border-orange-500/20 bg-[#171D26] px-4 py-2.5">

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(249,115,22,0.12),transparent_65%)]" />

          <div className="relative flex flex-wrap items-center justify-between gap-3">

            <div className="flex items-center gap-3">

              <span className="text-3xl text-orange-500">
                闘
              </span>

              <div>

                <h1 className="text-base text-orange-400 sm:text-2xl">
                  SHINOBI BATTLE ARENA
                </h1>

                <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-gray-400">
                  The Ultimate Shinobi Showdown
                </p>

              </div>

            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-5">

              {[
                {
                  label: 'Shinobi',
                  value:
                    battleStatistics.totalCharacters,
                },
                {
                  label: 'Forms',
                  value:
                    battleStatistics.totalForms,
                },
                {
                  label: 'Locations',
                  value: locations.length,
                },
              ].map(stat => (
                <div
                  key={stat.label}
                  className="flex items-center gap-1.5"
                >

                  <span className="text-base font-bold text-orange-400">
                    {stat.value}
                  </span>

                  <span className="text-[10px] uppercase text-gray-400">
                    {stat.label}
                  </span>

                </div>
              ))}

            </div>

          </div>

        </header>

        <section
          className="overflow-hidden rounded-xl border bg-[#171D26] transition-all duration-700"
          style={{
            borderColor: hasWinner
              ? '#EAB308'
              : `${currentLocation.color}66`,

            boxShadow: hasWinner
              ? '0 0 35px rgba(234,179,8,0.25)'
              : `0 0 25px ${currentLocation.color}15`,
          }}
        >

          <header className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#10151D] px-3 py-2 sm:px-5">

            <div className="flex items-center gap-3">

              <div
                className="flex size-9 items-center justify-center rounded-lg border bg-white/5 text-xl"
                style={{
                  color:
                    currentLocation.color,
                  borderColor:
                    `${currentLocation.color}55`,
                }}
              >
                {currentLocation.symbol}
              </div>

              <div>

                <p
                  className="text-[8px] font-bold tracking-[0.2em]"
                  style={{
                    color:
                      currentLocation.color,
                  }}
                >
                  BATTLE STAGE
                </p>

                <h2 className="mt-1 text-xs sm:text-base">
                  {currentLocation.name}
                </h2>

              </div>

            </div>

            <div className="flex gap-2">

              <button
                type="button"
                aria-pressed={soundEnabled}
                onClick={toggleSound}
                className={`rounded-md border px-3 py-2 text-[10px] font-bold transition-all ${
                  soundEnabled
                    ? 'border-orange-500/50 bg-orange-500/10 text-orange-400'
                    : 'border-white/10 bg-black/20 text-gray-500'
                }`}
              >
                SFX: {soundEnabled ? 'ON' : 'OFF'}
              </button>

              <button
                type="button"
                aria-pressed={musicEnabled}
                onClick={toggleMusic}
                className={`rounded-md border px-3 py-2 text-[10px] font-bold transition-all ${
                  musicEnabled
                    ? 'border-orange-500/50 bg-orange-500/10 text-orange-400'
                    : 'border-white/10 bg-black/20 text-gray-500'
                }`}
              >
                MUSIC: {musicEnabled ? 'ON' : 'OFF'}
              </button>

            </div>

          </header>

          <div className="relative isolate overflow-hidden px-3 py-3 sm:px-8">

            <BattlefieldBackground
              selectedLocation={selectedLocation}
              frame={frame}
            />

            <BattleEffects
              frame={frame}
            />

            <JutsuEffects
              frame={frame}
              firstFighter={firstFighter}
              secondFighter={secondFighter}
            />

            <div className="relative z-30 mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_minmax(45px,0.65fr)_minmax(0,1fr)] items-start gap-2 sm:gap-6">

              <div className="flex min-w-0 justify-center">

                <FighterCard
                  side="first"
                  fighter={firstFighter}
                  hp={frame.firstHP}
                  locked={isRunning}
                  frame={frame}
                  onSelect={() =>
                    openCharacterSelector('first')
                  }
                  onChangeForm={() =>
                    handleChangeForm('first')
                  }
                />

              </div>

              <div className="flex min-w-0 flex-col items-center justify-center self-center">

                <BattleCenter
                  frame={frame}
                  firstFighter={firstFighter}
                  secondFighter={secondFighter}
                />

              </div>

              <div className="flex min-w-0 justify-center">

                <FighterCard
                  side="second"
                  fighter={secondFighter}
                  hp={frame.secondHP}
                  locked={isRunning}
                  frame={frame}
                  onSelect={() =>
                    openCharacterSelector('second')
                  }
                  onChangeForm={() =>
                    handleChangeForm('second')
                  }
                />

              </div>

            </div>

          </div>

          <section className="border-t border-white/10 bg-[#10151D] px-3 py-2.5 sm:px-5">

            <div className="mb-2 flex items-center justify-between gap-2">

              <h2 className="text-[10px] tracking-widest text-orange-400 sm:text-xs">
                SELECT BATTLE LOCATION
              </h2>

              <p className="text-[9px] text-gray-400">
                {locations.length} Locations
              </p>

            </div>

            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">

              {locations.map(location => (
                <BattleLocationCard
                  key={location.id}
                  location={location}
                  active={
                    selectedLocation === location.id
                  }
                  locked={isRunning}
                  onSelect={() =>
                    handleLocationSelect(location.id)
                  }
                />
              ))}

            </div>

          </section>

          <section className="flex flex-wrap items-center justify-center gap-3 border-t border-orange-500/20 bg-[#171D26] px-3 py-2.5">

            <button
              type="button"
              onClick={resetFighters}
              disabled={
                isRunning ||
                (!firstFighter &&
                  !secondFighter)
              }
              className="rounded-lg border border-white/15 bg-black/30 px-4 py-3 text-[10px] font-bold text-gray-300 transition-all hover:border-orange-500 hover:text-orange-400 disabled:cursor-not-allowed disabled:opacity-30 sm:px-6"
            >
              RESET FIGHTERS
            </button>

            <button
              type="button"
              onClick={handleStartBattle}
              disabled={
                !bothSelected ||
                isRunning
              }
              className={`w-full max-w-sm rounded-lg border px-6 py-3 text-sm font-bold tracking-widest transition-all duration-300 sm:w-auto sm:min-w-[260px] ${
                bothSelected && !isRunning
                  ? frame.finished
                    ? 'border-yellow-400 bg-linear-to-r from-yellow-700 to-yellow-500 text-white shadow-[0_0_20px_rgba(234,179,8,0.35)] hover:scale-[1.02]'
                    : 'border-orange-400 bg-linear-to-r from-orange-700 to-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.35)] hover:scale-[1.02]'
                  : 'cursor-not-allowed border-gray-600 bg-[#303844] text-gray-500'
              }`}
            >
              {isRunning
                ? 'BATTLE IN PROGRESS'
                : frame.finished
                  ? 'REMATCH'
                  : 'START BATTLE'}
            </button>

            <p className="text-center text-[10px] text-gray-400">
              {isRunning
                ? frame.stageName ||
                  'Battle in progress'
                : frame.finished
                  ? 'Battle complete'
                  : bothSelected
                    ? 'Ready to battle'
                    : 'Select two shinobi'}
            </p>

          </section>

        </section>

        <p className="mt-2 text-center text-[9px] leading-4 text-gray-500">
          Fan-made arena power ratings. Not official Naruto statistics.
        </p>

      </div>

      {selectorSide && (
        <BattleCharacterSelector
          key={selectorSide}
          side={selectorSide}
          onClose={() =>
            setSelectorSide(null)
          }
          onSelect={handleCharacterSelect}
        />
      )}

      {pendingSelection && (
        <BattleFormSelector
          key={`${pendingSelection.side}-${pendingSelection.character.id}`}
          character={pendingSelection.character}
          side={pendingSelection.side}
          initialFormId={
            pendingSelection.initialFormId
          }
          onClose={() =>
            setPendingSelection(null)
          }
          onBack={handleFormBack}
          onConfirm={handleFormConfirm}
        />
      )}

    </main>
  )
}

export default BattleArena
