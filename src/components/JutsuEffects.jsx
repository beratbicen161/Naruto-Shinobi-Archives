
import { useId } from 'react'

const elementThemes = {
  fire: {
    type: 'fire',
    color: '#F97316',
    light: '#FDE68A',
  },
  lightning: {
    type: 'lightning',
    color: '#60A5FA',
    light: '#FFFFFF',
  },
  wind: {
    type: 'wind',
    color: '#38BDF8',
    light: '#F0FDFA',
  },
  water: {
    type: 'water',
    color: '#2563EB',
    light: '#BAE6FD',
  },
  earth: {
    type: 'sand',
    color: '#D97706',
    light: '#FDE68A',
  },
  wood: {
    type: 'wood',
    color: '#22C55E',
    light: '#BEF264',
  },
  chakra: {
    type: 'chakra',
    color: '#EAB308',
    light: '#FEF9C3',
  },
}

function getJutsuTheme(fighter) {
  const jutsu = String(
    fighter?.form?.jutsu || ''
  ).toLowerCase()

  const element = String(
    fighter?.form?.element || ''
  ).trim().toLowerCase()

  if (jutsu.includes('rasenshuriken')) {
    return {
      type: 'wind',
      color: '#38BDF8',
      light: '#FFFFFF',
    }
  }

  if (jutsu.includes('rasengan')) {
    return {
      type: 'rasengan',
      color: '#0EA5E9',
      light: '#E0F2FE',
    }
  }

  if (
    jutsu.includes('chidori') ||
    jutsu.includes('lightning blade') ||
    jutsu.includes('raikiri') ||
    jutsu.includes('indra')
  ) {
    return {
      type: 'lightning',
      color: '#6366F1',
      light: '#FFFFFF',
    }
  }

  if (jutsu.includes('amaterasu')) {
    return {
      type: 'dark-fire',
      color: '#7C3AED',
      light: '#C084FC',
    }
  }

  if (jutsu.includes('susanoo')) {
    return {
      type: 'susanoo',
      color: '#9333EA',
      light: '#D8B4FE',
    }
  }

  if (
    jutsu.includes('tailed beast bomb') ||
    jutsu.includes('bijuu bomb')
  ) {
    return {
      type: 'beast-bomb',
      color: '#9333EA',
      light: '#F0ABFC',
    }
  }

  if (
    jutsu.includes('sand') ||
    jutsu.includes('desert')
  ) {
    return elementThemes.earth
  }

  if (
    jutsu.includes('wood') ||
    jutsu.includes('forest')
  ) {
    return elementThemes.wood
  }

  if (
    jutsu.includes('water') ||
    jutsu.includes('shark')
  ) {
    return elementThemes.water
  }

  if (
    jutsu.includes('fire') ||
    jutsu.includes('flame')
  ) {
    return elementThemes.fire
  }

  return (
    elementThemes[element] ||
    elementThemes.chakra
  )
}

function EnergySphere({
  theme,
  time,
  dark = false,
}) {
  const gradientId = useId()

  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full overflow-visible"
    >

      <defs>
        <radialGradient id={gradientId}>
          <stop
            offset="0%"
            stopColor={
              dark ? '#09090B' : '#FFFFFF'
            }
          />

          <stop
            offset="35%"
            stopColor={
              dark ? '#18181B' : theme.light
            }
          />

          <stop
            offset="80%"
            stopColor={theme.color}
          />

          <stop
            offset="100%"
            stopColor={theme.color}
            stopOpacity="0"
          />
        </radialGradient>
      </defs>

      <circle
        cx="100"
        cy="100"
        r="78"
        fill={`url(#${gradientId})`}
        opacity="0.9"
      />

      {Array.from(
        { length: 9 },
        (_, index) => (
          <ellipse
            key={index}
            cx="100"
            cy="100"
            rx={55 + index % 3 * 8}
            ry={12 + index % 4 * 6}
            fill="none"
            stroke={
              index % 2
                ? theme.color
                : theme.light
            }
            strokeWidth={
              1.5 + index % 3
            }
            opacity={
              0.45 + index % 3 * 0.15
            }
            transform={`rotate(${
              time * 180 + index * 40
            } 100 100)`}
          />
        )
      )}

      {Array.from(
        { length: 20 },
        (_, index) => {
          const angle =
            index * Math.PI * 2 / 20 +
            time * 2

          const radius =
            75 +
            Math.sin(
              time * 5 + index
            ) * 15

          return (
            <circle
              key={index}
              cx={
                100 +
                Math.cos(angle) * radius
              }
              cy={
                100 +
                Math.sin(angle) * radius
              }
              r={1 + index % 4}
              fill={theme.light}
              opacity="0.8"
            />
          )
        }
      )}

    </svg>
  )
}

function LightningEffect({
  theme,
  time,
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full overflow-visible"
    >

      <circle
        cx="100"
        cy="100"
        r="30"
        fill={theme.light}
        opacity="0.7"
      />

      {Array.from(
        { length: 12 },
        (_, index) => {
          const angle =
            index * Math.PI * 2 / 12 +
            time * 0.5

          const points = Array.from(
            { length: 7 },
            (_, point) => {
              const radius =
                15 + point * 15

              const wave =
                Math.sin(
                  time * 8 +
                  index +
                  point * 2
                ) * 12

              const x =
                100 +
                Math.cos(angle) * radius +
                Math.sin(angle) * wave

              const y =
                100 +
                Math.sin(angle) * radius -
                Math.cos(angle) * wave

              return `${x},${y}`
            }
          ).join(' ')

          return (
            <g key={index}>

              <polyline
                points={points}
                fill="none"
                stroke={theme.color}
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.45"
              />

              <polyline
                points={points}
                fill="none"
                stroke={theme.light}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

            </g>
          )
        }
      )}

    </svg>
  )
}

function WindEffect({
  theme,
  time,
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full overflow-visible"
    >

      <g
        transform={`rotate(${
          time * 260
        } 100 100)`}
      >

        {Array.from(
          { length: 4 },
          (_, index) => (
            <g
              key={index}
              transform={`rotate(${
                index * 90
              } 100 100)`}
            >

              <path
                d="M100 100 Q125 30 185 20 Q170 85 100 100Z"
                fill={theme.light}
                stroke={theme.color}
                strokeWidth="2"
                opacity="0.85"
              />

              <path
                d="M100 100 Q155 70 195 55"
                fill="none"
                stroke={theme.color}
                strokeWidth="4"
                opacity="0.6"
              />

            </g>
          )
        )}

        <circle
          cx="100"
          cy="100"
          r="48"
          fill={theme.color}
          opacity="0.8"
        />

        <circle
          cx="100"
          cy="100"
          r="28"
          fill={theme.light}
        />

        <circle
          cx="100"
          cy="100"
          r="60"
          fill="none"
          stroke={theme.light}
          strokeWidth="3"
          strokeDasharray="45 20"
        />

      </g>

    </svg>
  )
}

function FlameEffect({
  theme,
  time,
  dark = false,
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full overflow-visible"
    >

      {Array.from(
        { length: 8 },
        (_, index) => {
          const angle =
            index * 45

          const stretch =
            0.8 +
            Math.sin(
              time * 5 + index
            ) * 0.2

          return (
            <g
              key={index}
              transform={`translate(100 100) rotate(${angle}) scale(1 ${stretch})`}
            >

              <path
                d="M-22 15 Q-50 -30 -15 -55 Q5 -75 0 -110 Q55 -60 35 -15 Q20 25 -22 15Z"
                fill={
                  dark
                    ? '#09090B'
                    : theme.color
                }
                stroke={
                  dark
                    ? theme.color
                    : '#EF4444'
                }
                strokeWidth="3"
                opacity="0.85"
              />

              <path
                d="M-10 10 Q-20 -15 0 -45 Q25 -15 10 10Z"
                fill={
                  dark
                    ? '#27272A'
                    : theme.light
                }
                opacity="0.9"
              />

            </g>
          )
        }
      )}

      <circle
        cx="100"
        cy="100"
        r="30"
        fill={
          dark ? '#09090B' : theme.light
        }
      />

    </svg>
  )
}

function WaterEffect({
  theme,
  time,
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full overflow-visible"
    >

      <g
        transform={`rotate(${
          time * 100
        } 100 100)`}
      >

        {Array.from(
          { length: 5 },
          (_, index) => (
            <path
              key={index}
              d="M100 20 C170 15 195 90 150 140 C110 185 35 165 25 100 C20 60 60 40 100 65"
              fill="none"
              stroke={
                index % 2
                  ? theme.light
                  : theme.color
              }
              strokeWidth={
                6 + index * 2
              }
              strokeLinecap="round"
              opacity="0.6"
              transform={`rotate(${
                index * 72
              } 100 100)`}
            />
          )
        )}

      </g>

      {Array.from(
        { length: 18 },
        (_, index) => {
          const angle =
            index * Math.PI * 2 / 18 +
            time

          return (
            <circle
              key={index}
              cx={
                100 +
                Math.cos(angle) * 85
              }
              cy={
                100 +
                Math.sin(angle) * 85
              }
              r={2 + index % 5}
              fill={theme.light}
              opacity="0.7"
            />
          )
        }
      )}

    </svg>
  )
}

function SandEffect({
  theme,
  time,
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full overflow-visible"
    >

      {Array.from(
        { length: 55 },
        (_, index) => {
          const angle =
            index * 0.65 +
            time * (1 + index % 3 * 0.2)

          const radius =
            20 + index % 10 * 8

          return (
            <circle
              key={index}
              cx={
                100 +
                Math.cos(angle) * radius
              }
              cy={
                100 +
                Math.sin(angle) * radius * 0.8
              }
              r={2 + index % 5}
              fill={
                index % 3
                  ? theme.color
                  : theme.light
              }
              opacity={
                0.4 + index % 5 * 0.12
              }
            />
          )
        }
      )}

    </svg>
  )
}

function WoodEffect({
  theme,
  time,
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full overflow-visible"
    >

      {Array.from(
        { length: 8 },
        (_, index) => {
          const wave =
            Math.sin(
              time * 2 + index
            ) * 15

          return (
            <g
              key={index}
              transform={`rotate(${
                index * 45 + wave
              } 100 100)`}
            >

              <path
                d="M100 100 Q60 70 95 45 Q120 25 100 5"
                fill="none"
                stroke="#854D0E"
                strokeWidth="12"
                strokeLinecap="round"
              />

              <path
                d="M100 65 Q40 40 65 15 Q105 25 100 65Z"
                fill={theme.color}
              />

              <path
                d="M100 40 Q140 5 155 30 Q130 65 100 40Z"
                fill={theme.light}
                opacity="0.85"
              />

            </g>
          )
        }
      )}

      <circle
        cx="100"
        cy="100"
        r="25"
        fill={theme.color}
        opacity="0.8"
      />

    </svg>
  )
}

function SusanooEffect({
  theme,
  time,
}) {
  const opacity =
    0.65 +
    Math.sin(time * 3) * 0.15

  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full overflow-visible"
    >

      <g
        fill={theme.color}
        stroke={theme.light}
        strokeWidth="3"
        opacity={opacity}
      >

        <path d="M65 70 L55 25 L85 45 L100 10 L115 45 L145 25 L135 70 L120 100 L80 100Z" />

        <path d="M80 105 L40 110 L15 155 L55 165 L75 140 L65 195 L135 195 L125 140 L145 165 L185 155 L160 110 L120 105Z" />

        <path
          d="M75 125 Q100 145 125 125 M75 145 Q100 165 125 145 M75 165 Q100 185 125 165"
          fill="none"
          strokeWidth="5"
        />

      </g>

      <path
        d="M72 65 L93 73 L75 80Z M128 65 L107 73 L125 80Z"
        fill="#FFFFFF"
      />

    </svg>
  )
}

function JutsuVisual({
  theme,
  time,
}) {
  switch (theme.type) {
    case 'rasengan':
      return (
        <EnergySphere
          theme={theme}
          time={time}
        />
      )

    case 'lightning':
      return (
        <LightningEffect
          theme={theme}
          time={time}
        />
      )

    case 'wind':
      return (
        <WindEffect
          theme={theme}
          time={time}
        />
      )

    case 'fire':
      return (
        <FlameEffect
          theme={theme}
          time={time}
        />
      )

    case 'dark-fire':
      return (
        <FlameEffect
          theme={theme}
          time={time}
          dark
        />
      )

    case 'water':
      return (
        <WaterEffect
          theme={theme}
          time={time}
        />
      )

    case 'sand':
      return (
        <SandEffect
          theme={theme}
          time={time}
        />
      )

    case 'wood':
      return (
        <WoodEffect
          theme={theme}
          time={time}
        />
      )

    case 'susanoo':
      return (
        <SusanooEffect
          theme={theme}
          time={time}
        />
      )

    case 'beast-bomb':
      return (
        <EnergySphere
          theme={theme}
          time={time}
          dark
        />
      )

    default:
      return (
        <EnergySphere
          theme={theme}
          time={time}
        />
      )
  }
}

function JutsuAnimation({
  fighter,
  side,
  frame,
}) {
  const theme = getJutsuTheme(fighter)

  const time =
    (frame.elapsed || 0) / 1000

  const stageProgress =
    frame.stageProgress || 0

  const intensity =
    frame.intensity ?? 0.5

  const isFirst =
    side === 'first'

  const isUltimate =
    frame.stage === 'ultimate-clash'

  const isFinal =
    frame.stage === 'final-impact'

  const movement =
    Math.sin(
      stageProgress * Math.PI / 2
    )

  const position = isFirst
    ? 27 + movement * 20
    : 73 - movement * 20

  const size =
    isFinal
      ? 180
      : isUltimate
        ? 145
        : 110

  const scale =
    0.7 +
    movement * 0.3 +
    Math.sin(time * 4) * 0.05

  const opacity =
    Math.min(
      1,
      stageProgress * 5
    )

  return (
    <div
      className="absolute"
      style={{
        left: `${position}%`,
        top: '43%',
        width: `clamp(60px, 13vw, ${size}px)`,
        aspectRatio: '1 / 1',
        opacity,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
    >

      <div
        className="absolute -inset-6 rounded-full blur-2xl"
        style={{
          background: `radial-gradient(
            circle,
            ${theme.color}AA,
            transparent 70%
          )`,
          opacity: intensity,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          filter: `drop-shadow(
            0 0 12px ${theme.color}
          )`,
        }}
      >

        <JutsuVisual
          theme={theme}
          time={time}
        />

      </div>

    </div>
  )
}

function JutsuLabel({
  fighter,
  side,
}) {
  const theme =
    getJutsuTheme(fighter)

  return (
    <div
      className={`absolute bottom-3 max-w-[42%] rounded-lg border bg-black/85 px-2 py-2 text-center backdrop-blur-md sm:px-4 ${
        side === 'first'
          ? 'left-3'
          : 'right-3'
      }`}
      style={{
        borderColor: theme.color,
        boxShadow: `0 0 15px ${theme.color}44`,
      }}
    >

      <p
        className="text-[8px] font-bold uppercase tracking-widest sm:text-[10px]"
        style={{
          color: theme.light,
        }}
      >
        {fighter.form.element}
      </p>

      <p className="mt-1 text-[10px] font-bold text-white sm:text-xs">
        {fighter.form.jutsu}
      </p>

    </div>
  )
}

function JutsuClash({
  firstTheme,
  secondTheme,
  frame,
}) {
  const progress =
    frame.stageProgress || 0

  const impact =
    frame.impact || 0

  const size =
    80 + progress * 100

  return (
    <div className="absolute inset-0 flex items-center justify-center">

      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: size * 1.6,
          height: size * 1.6,
          background: `linear-gradient(
            90deg,
            ${firstTheme.color},
            ${secondTheme.color}
          )`,
          opacity: 0.3 + impact * 0.2,
        }}
      />

      <div
        className="absolute rounded-full border-2 border-white/70"
        style={{
          width: size,
          height: size,
          opacity: 0.7 - progress * 0.5,
          transform: `scale(${
            0.5 + progress * 1.8
          })`,
          boxShadow: `0 0 25px ${firstTheme.color},
                      0 0 45px ${secondTheme.color}`,
        }}
      />

      <div
        className="absolute size-12 rounded-full bg-white blur-lg sm:size-20"
        style={{
          opacity: impact * 0.5,
        }}
      />

    </div>
  )
}

function JutsuEffects({
  frame,
  firstFighter,
  secondFighter,
}) {
  const activeStages = [
    'signature-jutsu',
    'ultimate-clash',
    'final-impact',
  ]

  if (
    !frame ||
    frame.phase !== 'battle' ||
    !activeStages.includes(frame.stage) ||
    !firstFighter ||
    !secondFighter
  ) {
    return null
  }

  const firstTheme =
    getJutsuTheme(firstFighter)

  const secondTheme =
    getJutsuTheme(secondFighter)

  const showClash =
    frame.stage === 'ultimate-clash' ||
    frame.stage === 'final-impact'

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-40 overflow-hidden motion-reduce:hidden"
    >

      <JutsuAnimation
        fighter={firstFighter}
        side="first"
        frame={frame}
      />

      <JutsuAnimation
        fighter={secondFighter}
        side="second"
        frame={frame}
      />

      {showClash && (
        <JutsuClash
          firstTheme={firstTheme}
          secondTheme={secondTheme}
          frame={frame}
        />
      )}

      <JutsuLabel
        fighter={firstFighter}
        side="first"
      />

      <JutsuLabel
        fighter={secondFighter}
        side="second"
      />

    </div>
  )
}

export default JutsuEffects
