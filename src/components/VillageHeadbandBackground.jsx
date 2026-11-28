const villages = [
  {
    name: 'Konoha',
    cloth: '#243B55',
    glow: '#F97316',
    symbol: 'M-5 -3 C-17 -15 -25 8 -9 10 C6 13 10 -7 -3 -7 C-12 -7 -11 4 -4 3 M6 -5 L15 -14 M-13 9 L-20 15'
  },
  {
    name: 'Suna',
    cloth: '#78350F',
    glow: '#EAB308',
    symbol: 'M-14 -14H14 M-14 14H14 M-11 -14Q-11 0 11 14 M11 -14Q11 0 -11 14'
  },
  {
    name: 'Kiri',
    cloth: '#334155',
    glow: '#38BDF8',
    symbol: 'M-19 -10L-23 10 M-5 -10L-9 10 M9 -10L5 10 M23 -10L19 10'
  },
  {
    name: 'Kumo',
    cloth: '#475569',
    glow: '#A78BFA',
    symbol: 'M-20 8C-32 -4 -14 -15 -6 -7 C-8 -24 17 -22 18 -7 C34 -10 33 10 18 10H-20'
  },
  {
    name: 'Iwa',
    cloth: '#713F32',
    glow: '#FB923C',
    symbol: 'M-24 12L-24 -4L-12 -15L1 -4V12Z M1 12V-1L13 -12L25 -1V12Z'
  },
  {
    name: 'Ame',
    cloth: '#312E81',
    glow: '#60A5FA',
    symbol: 'M-18 -13L-22 -2 M0 -13L-4 -2 M18 -13L14 -2 M-18 4L-22 15 M0 4L-4 15 M18 4L14 15'
  }
]

function Headband({ village, index }) {
  const size = 95 + ((index * 13) % 35)

  return (
    <svg
      viewBox="-85 -35 170 70"
      preserveAspectRatio="xMidYMid meet"
      width={size}
      className="block h-auto overflow-visible"
      style={{
        filter: `drop-shadow(0 0 7px ${village.glow}50)`
      }}
    >
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-18 0 0;18 0 0;-18 0 0"
          dur={`${7 + index % 4}s`}
          repeatCount="indefinite"
        />

        <path
          d="M-45 -3 Q-65 -20 -80 -4 L-76 7 Q-60 -6 -45 9Z"
          fill={village.cloth}
        >
          <animate
            attributeName="d"
            values="
              M-45 -3 Q-65 -20 -80 -4 L-76 7 Q-60 -6 -45 9Z;
              M-45 -3 Q-65 15 -80 0 L-76 12 Q-60 25 -45 9Z;
              M-45 -3 Q-65 -20 -80 -4 L-76 7 Q-60 -6 -45 9Z
            "
            dur="3s"
            repeatCount="indefinite"
          />
        </path>

        <path
          d="M45 -3 Q65 15 80 0 L76 12 Q60 25 45 9Z"
          fill={village.cloth}
        >
          <animate
            attributeName="d"
            values="
              M45 -3 Q65 15 80 0 L76 12 Q60 25 45 9Z;
              M45 -3 Q65 -20 80 -4 L76 7 Q60 -6 45 9Z;
              M45 -3 Q65 15 80 0 L76 12 Q60 25 45 9Z
            "
            dur="3.5s"
            repeatCount="indefinite"
          />
        </path>

        <rect
          x="-53"
          y="-23"
          width="106"
          height="46"
          rx="9"
          fill={village.cloth}
          stroke="#64748B"
          strokeWidth=".8"
        />

        <path
          d="M-48 -18H48 M-48 18H48"
          stroke="#FFFFFF"
          strokeOpacity=".12"
          strokeWidth="1"
        />

        <rect
          x="-38"
          y="-19"
          width="76"
          height="38"
          rx="6"
          fill="#A8B0BC"
          stroke="#E2E8F0"
          strokeWidth="1.2"
        />

        <path
          d="M-31 -15H31"
          stroke="#FFFFFF"
          strokeOpacity=".65"
          strokeWidth="2"
        />

        <path
          d="M-31 15H31"
          stroke="#475569"
          strokeOpacity=".6"
          strokeWidth="2"
        />

        {[-31, 31].map(x =>
          [-12, 12].map(y => (
            <g key={`${x}-${y}`}>
              <circle
                cx={x}
                cy={y}
                r="2.6"
                fill="#475569"
              />
              <circle
                cx={x - 0.5}
                cy={y - 0.5}
                r="1"
                fill="#CBD5E1"
              />
            </g>
          ))
        )}

        <path
          d={village.symbol}
          fill="none"
          stroke="#26313D"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M-32 -17L-12 -17L12 17H-8Z"
          fill="#FFFFFF"
          opacity=".09"
        />

      </g>
    </svg>
  )
}

function FloatingHeadband({ village, index, side }) {
  const duration = 24 + (index % 3) * 4
  const delay = -(index * duration / 5)
  const position = 35 + ((index * 17) % 30)

  return (
    <div
      className="absolute bottom-0"
      style={{
        left: `${position}%`
      }}
    >
      <svg
        width="1"
        height="1"
        className="overflow-visible"
      >
        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values={
              side === 'left'
                ? '0 100;15 -250;-12 -550;15 -900;0 -1600'
                : '0 100;-15 -250;12 -550;-15 -900;0 -1600'
            }
            keyTimes="0;0.2;0.4;0.65;1"
            dur={`${duration}s`}
            begin={`${delay}s`}
            repeatCount="indefinite"
          />

          <animate
            attributeName="opacity"
            values="0;0.7;0.7;0"
            keyTimes="0;0.1;0.85;1"
            dur={`${duration}s`}
            begin={`${delay}s`}
            repeatCount="indefinite"
          />

          <foreignObject
            x="-70"
            y="-35"
            width="140"
            height="70"
            className="overflow-visible"
          >
            <div className="flex h-full w-full items-center justify-center">
              <Headband
                village={village}
                index={index}
              />
            </div>
          </foreignObject>
        </g>
      </svg>
    </div>
  )
}

function HeadbandSide({ side }) {
  return (
    <div
      className={`absolute inset-y-0 w-[max(0px,calc((100%-1280px)/2))] overflow-hidden ${
        side === 'left' ? 'left-0' : 'right-0'
      }`}
    >
      <div
        className="absolute inset-0 animate-pulse"
        style={{
          background:
            side === 'left'
              ? 'radial-gradient(ellipse at center, #38BDF812, transparent 75%)'
              : 'radial-gradient(ellipse at center, #F9731612, transparent 75%)',
          animationDuration: '8s'
        }}
      />

      {villages.map((village, index) => (
        <FloatingHeadband
          key={village.name}
          village={village}
          index={index + (side === 'right' ? 3 : 0)}
          side={side}
        />
      ))}

      {Array.from({ length: 14 }, (_, index) => {
        const color = villages[index % villages.length].glow

        return (
          <div
            key={index}
            className="absolute animate-pulse rounded-full"
            style={{
              left: `${5 + ((index * 37) % 90)}%`,
              top: `${(index * 23) % 100}%`,
              width: 2 + (index % 3),
              height: 2 + (index % 3),
              backgroundColor: color,
              boxShadow: `0 0 7px ${color}`,
              animationDuration: `${3 + index % 5}s`,
              animationDelay: `${-index * 0.7}s`
            }}
          />
        )
      })}
    </div>
  )
}

function VillageHeadbandBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden min-[1440px]:block motion-reduce:hidden"
    >
      <HeadbandSide side="left" />
      <HeadbandSide side="right" />
    </div>
  )
}

export default VillageHeadbandBackground