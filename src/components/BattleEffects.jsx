
const particles = Array.from(
  { length: 36 },
  (_, index) => ({
    id: index,
    x: (index * 37 + 11) % 100,
    y: (index * 23 + 17) % 100,
    size: 2 + index % 5,
    speed: 0.5 + (index % 7) * 0.15,
    offset: index * 0.37,
  })
)

function ChakraAura({
  side,
  elapsed,
  intensity,
}) {
  const isFirst = side === 'first'

  const primary = isFirst
    ? '#F97316'
    : '#6366F1'

  const secondary = isFirst
    ? '#FDE68A'
    : '#93C5FD'

  const time = elapsed / 1000

  return (
    <div
      className={`absolute inset-y-0 w-[45%] ${
        isFirst ? 'left-0' : 'right-0'
      }`}
    >

      <div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(
            ellipse,
            ${primary}88,
            transparent 70%
          )`,
          opacity: intensity,
          transform: `scale(${
            1 + Math.sin(time * 4) * 0.08
          })`,
        }}
      />

      {Array.from(
        { length: 8 },
        (_, index) => {
          const wave = Math.sin(
            time * 3 + index
          )

          return (
            <div
              key={index}
              className="absolute rounded-full blur-xl"
              style={{
                left: `${10 + index * 11}%`,
                bottom: `${10 + wave * 8}%`,
                width: `${12 + index % 3 * 7}%`,
                height: `${
                  35 +
                  Math.abs(wave) * 40
                }%`,
                background: `linear-gradient(
                  to top,
                  ${primary},
                  ${secondary}88,
                  transparent
                )`,
                opacity: intensity * 0.55,
                transform: `rotate(${wave * 12}deg)`,
              }}
            />
          )
        }
      )}

      <div
        className="absolute bottom-[8%] left-[10%] h-[15%] w-[80%] rounded-[50%] border-2 blur-[2px]"
        style={{
          borderColor: primary,
          boxShadow: `0 0 30px ${primary}`,
          opacity: intensity * 0.7,
        }}
      />

    </div>
  )
}

function FloatingParticles({
  elapsed,
  intensity,
  victory,
}) {
  const time = elapsed / 1000

  return (
    <>
      {particles.map(particle => {
        const color = victory
          ? '#FDE047'
          : particle.id % 2 === 0
            ? '#FB923C'
            : '#93C5FD'

        const x =
          particle.x +
          Math.sin(
            time * particle.speed +
            particle.offset
          ) * 5

        const y =
          100 -
          (
            (
              particle.y +
              time * 15 * particle.speed
            ) % 100
          )

        const opacity =
          (
            Math.sin(
              time * 3 +
              particle.offset
            ) + 1
          ) / 2

        return (
          <span
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: color,
              boxShadow: `0 0 12px ${color}`,
              opacity: opacity * intensity,
            }}
          />
        )
      })}
    </>
  )
}

function SpeedLines({
  elapsed,
  intensity,
}) {
  const time = elapsed / 1000

  return (
    <svg
      viewBox="0 0 1000 400"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
    >

      {Array.from(
        { length: 20 },
        (_, index) => {
          const angle =
            index * Math.PI * 2 / 20

          const distance =
            100 +
            (
              time * 180 +
              index * 47
            ) % 400

          const length =
            25 + index % 5 * 12

          const x1 =
            500 +
            Math.cos(angle) * distance

          const y1 =
            200 +
            Math.sin(angle) * distance * 0.5

          const x2 =
            500 +
            Math.cos(angle) *
              (distance + length)

          const y2 =
            200 +
            Math.sin(angle) *
              (distance + length) * 0.5

          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={
                index % 2 === 0
                  ? '#FDBA74'
                  : '#BFDBFE'
              }
              strokeWidth={
                1 + index % 3
              }
              strokeLinecap="round"
              opacity={intensity * 0.35}
            />
          )
        }
      )}

    </svg>
  )
}

function DustCloud({
  elapsed,
  intensity,
}) {
  const time = elapsed / 1000

  return (
    <div className="absolute inset-x-0 bottom-0 h-[40%] overflow-hidden">

      {Array.from(
        { length: 10 },
        (_, index) => {
          const drift =
            Math.sin(
              time * 0.7 + index
            ) * 8

          return (
            <div
              key={index}
              className="absolute rounded-full bg-slate-300 blur-2xl"
              style={{
                left: `${
                  index * 11 - 5 + drift
                }%`,
                bottom: `${
                  Math.sin(
                    time + index
                  ) * 12
                }%`,
                width: '25%',
                height: `${
                  35 + index % 4 * 15
                }%`,
                opacity:
                  intensity *
                  (0.08 + index % 3 * 0.04),
                transform: `scale(${
                  1 +
                  Math.sin(
                    time + index
                  ) * 0.2
                })`,
              }}
            />
          )
        }
      )}

    </div>
  )
}

function Shockwaves({
  elapsed,
  intensity,
}) {
  const time = elapsed / 1000

  return (
    <div className="absolute inset-0 flex items-center justify-center">

      {Array.from(
        { length: 3 },
        (_, index) => {
          const progress =
            (time * 1.3 + index / 3) % 1

          const scale =
            0.3 + progress * 3.5

          return (
            <div
              key={index}
              className="absolute size-24 rounded-full border-2 border-orange-200/70 sm:size-40"
              style={{
                transform: `scale(${scale})`,
                opacity:
                  (1 - progress) *
                  intensity * 0.65,
                boxShadow:
                  '0 0 20px rgba(255,255,255,0.35)',
              }}
            />
          )
        }
      )}

    </div>
  )
}

function EnergySparks({
  elapsed,
  impact,
  intensity,
}) {
  const time = elapsed / 1000

  return (
    <svg
      viewBox="0 0 1000 400"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
    >

      {Array.from(
        { length: 18 },
        (_, index) => {
          const angle =
            index * Math.PI * 2 / 18

          const progress =
            (time * 2 + index * 0.13) % 1

          const distance =
            progress * 250

          const x =
            500 +
            Math.cos(angle) * distance

          const y =
            200 +
            Math.sin(angle) * distance * 0.6

          return (
            <line
              key={index}
              x1={x}
              y1={y}
              x2={
                x + Math.cos(angle) * 20
              }
              y2={
                y + Math.sin(angle) * 20
              }
              stroke={
                index % 3 === 0
                  ? '#FDBA74'
                  : '#E0F2FE'
              }
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity={
                (1 - progress) *
                impact *
                intensity
              }
            />
          )
        }
      )}

    </svg>
  )
}

function ImpactGlow({
  impact,
  intensity,
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">

      <div
        className="absolute size-40 rounded-full bg-orange-200 blur-3xl sm:size-64"
        style={{
          opacity:
            impact * intensity * 0.2,
          transform: `scale(${
            1 + impact * 0.5
          })`,
        }}
      />

      <div
        className="absolute size-16 rounded-full bg-blue-100 blur-xl sm:size-24"
        style={{
          opacity:
            impact * intensity * 0.3,
        }}
      />

      <div
        className="absolute h-px w-full bg-linear-to-r from-transparent via-orange-200 to-transparent"
        style={{
          opacity:
            impact * intensity * 0.5,
        }}
      />

    </div>
  )
}

function VictoryAura({
  winner,
  elapsed,
}) {
  if (winner === 'draw') {
    return null
  }

  const time = elapsed / 1000

  return (
    <div
      className={`absolute inset-y-0 w-[45%] ${
        winner === 'first'
          ? 'left-0'
          : 'right-0'
      }`}
    >

      <div
        className="absolute inset-0 rounded-full bg-yellow-400/20 blur-3xl"
        style={{
          transform: `scale(${
            1 +
            Math.sin(time * 2) * 0.1
          })`,
        }}
      />

      <div className="absolute bottom-[10%] left-[15%] h-[15%] w-[70%] rounded-[50%] border-2 border-yellow-300/60 shadow-[0_0_35px_rgba(234,179,8,0.5)]" />

      {Array.from(
        { length: 16 },
        (_, index) => {
          const progress =
            (
              time * 0.25 +
              index * 0.07
            ) % 1

          return (
            <span
              key={index}
              className="absolute size-1.5 rounded-full bg-yellow-200 shadow-[0_0_12px_#EAB308]"
              style={{
                left: `${
                  (index * 31 + 10) % 100
                }%`,
                bottom: `${progress * 100}%`,
                opacity:
                  Math.sin(
                    progress * Math.PI
                  ),
              }}
            />
          )
        }
      )}

    </div>
  )
}

function BattleEffects({ frame }) {
  if (
    !frame ||
    frame.phase === 'idle'
  ) {
    return null
  }

  const elapsed = frame.elapsed || 0

  const intensity =
    frame.intensity ?? 0.5

  const impact =
    frame.impact ?? 0

  const isCharging =
    frame.stage === 'charging'

  const isVictory =
    frame.stage === 'victory' ||
    frame.finished

  const isBattle =
    frame.phase === 'battle' &&
    !isVictory

  const isUltimate =
    frame.stage === 'ultimate-clash'

  const isFinal =
    frame.stage === 'final-impact'

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden motion-reduce:hidden"
    >

      {(isCharging || isBattle) && (
        <>
          <ChakraAura
            side="first"
            elapsed={elapsed}
            intensity={intensity}
          />

          <ChakraAura
            side="second"
            elapsed={elapsed}
            intensity={intensity}
          />

          <FloatingParticles
            elapsed={elapsed}
            intensity={intensity}
            victory={false}
          />

          <DustCloud
            elapsed={elapsed}
            intensity={intensity}
          />
        </>
      )}

      {isBattle && (
        <>
          <SpeedLines
            elapsed={elapsed}
            intensity={intensity}
          />

          <EnergySparks
            elapsed={elapsed}
            impact={impact}
            intensity={intensity}
          />

          <ImpactGlow
            impact={impact}
            intensity={intensity}
          />
        </>
      )}

      {(isUltimate || isFinal) && (
        <Shockwaves
          elapsed={elapsed}
          intensity={intensity}
        />
      )}

      {isVictory &&
        frame.winner !== 'draw' && (
          <>
            <VictoryAura
              winner={frame.winner}
              elapsed={elapsed}
            />

            <FloatingParticles
              elapsed={elapsed}
              intensity={0.8}
              victory={true}
            />
          </>
        )}

    </div>
  )
}

export default BattleEffects
