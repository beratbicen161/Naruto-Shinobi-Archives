const clans = [
  { name: 'uchiha', color: '#EF4444' },
  { name: 'hyuga', color: '#C4B5FD' },
  { name: 'uzumaki', color: '#F97316' },
  { name: 'senju', color: '#22C55E' },
  { name: 'nara', color: '#8B5CF6' },
  { name: 'aburame', color: '#84CC16' }
]

function ClanSymbol({ name, color }) {
  return (
    <svg
      viewBox="0 0 80 80"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle
        cx="40"
        cy="40"
        r="37"
        strokeOpacity=".15"
      />

      {name === 'uchiha' && (
        <>
          <path
            d="M17 34 A23 23 0 1 1 63 34
               Q60 49 44 53
               L44 69 H36 V53
               Q20 49 17 34"
            fill="#E5E7EB"
            stroke="none"
          />
          <path
            d="M17 34 A23 23 0 1 1 63 34 Z"
            fill={color}
            stroke="none"
          />
        </>
      )}

      {name === 'hyuga' && (
        <>
          <path d="M12 40 Q40 10 68 40 Q40 70 12 40Z" />
          <circle cx="40" cy="40" r="12" />
          <circle cx="40" cy="40" r="5" fill={color} />
          <path d="M40 10V20 M40 60V70 M10 20L20 29 M60 51L70 60" />
        </>
      )}

      {name === 'uzumaki' && (
        <path
          d="M62 40
             C62 10 18 10 18 40
             C18 68 59 68 59 40
             C59 18 29 18 29 40
             C29 55 50 55 50 40
             C50 31 39 30 39 40"
          strokeWidth="5"
        />
      )}

      {name === 'senju' && (
        <>
          <path d="M25 13H55L63 28L48 43V67H32V43L17 28Z" />
          <path d="M25 13L40 32L55 13 M40 32V67" />
        </>
      )}

      {name === 'nara' && (
        <>
          <path
            d="M55 14
               A29 29 0 1 0 55 66
               A23 23 0 0 1 55 14"
            fill={color}
            fillOpacity=".35"
          />
          <circle cx="51" cy="40" r="7" />
        </>
      )}

      {name === 'aburame' && (
        <>
          <ellipse cx="40" cy="43" rx="12" ry="20" />
          <circle cx="40" cy="19" r="7" />
          <path d="M35 13L27 5 M45 13L53 5" />
          <path d="M29 31L15 23 M28 43H12 M29 55L15 64" />
          <path d="M51 31L65 23 M52 43H68 M51 55L65 64" />
          <path d="M40 27V63" />
        </>
      )}
    </svg>
  )
}

function FloatingClan({ clan, index }) {
  const size = 40 + ((index * 7) % 26)
  const duration = 28
  const x = 25 + ((index * 31) % 50)

  return (
    <div
      className="absolute bottom-0"
      style={{
        left: `${x}%`,
        width: size,
        height: size
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 100;12 -250;-10 -550;0 -900;0 -1200"
            keyTimes="0;0.25;0.5;0.75;1"
            dur={`${duration}s`}
            begin={`${-index * duration / 6}s`}
            repeatCount="indefinite"
          />

          <animate
            attributeName="opacity"
            values="0;0.55;0.55;0"
            keyTimes="0;0.12;0.85;1"
            dur={`${duration}s`}
            begin={`${-index * duration / 6}s`}
            repeatCount="indefinite"
          />

          <foreignObject
            x={-size / 2}
            y={0}
            width={size}
            height={size}
          >
            <div
              className="flex aspect-square h-full w-full items-center justify-center"
              style={{
                filter: `drop-shadow(0 0 6px ${clan.color}60)`
              }}
            >
              <div
                className="aspect-square h-full w-full animate-spin"
                style={{
                  animationDuration: `${35 + index * 3}s`,
                  animationDirection:
                    index % 2 === 0 ? 'normal' : 'reverse'
                }}
              >
                <ClanSymbol
                  name={clan.name}
                  color={clan.color}
                />
              </div>
            </div>
          </foreignObject>
        </g>
      </svg>
    </div>
  )
}

function ClanSide({ side }) {
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
              ? 'radial-gradient(ellipse at center, #EF444410, transparent 75%)'
              : 'radial-gradient(ellipse at center, #8B5CF610, transparent 75%)',
          animationDuration: '8s'
        }}
      />

      {clans.map((clan, index) => (
        <FloatingClan
          key={clan.name}
          clan={clan}
          index={index + (side === 'right' ? 3 : 0)}
        />
      ))}

      {Array.from({ length: 12 }, (_, index) => {
        const color = clans[index % clans.length].color

        return (
          <div
            key={index}
            className="absolute animate-pulse rounded-full"
            style={{
              left: `${5 + ((index * 37) % 90)}%`,
              top: `${(index * 23) % 100}%`,
              width: 2 + (index % 2),
              height: 2 + (index % 2),
              backgroundColor: color,
              boxShadow: `0 0 6px ${color}`,
              animationDuration: `${3 + (index % 5)}s`,
              animationDelay: `${-index * 0.8}s`
            }}
          />
        )
      })}
    </div>
  )
}

function ClanBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden min-[1440px]:block motion-reduce:hidden"
    >
      <ClanSide side="left" />
      <ClanSide side="right" />
    </div>
  )
}

export default ClanBackground