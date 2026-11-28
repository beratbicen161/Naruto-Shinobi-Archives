import { useId } from 'react'

const scrolls = [
  { color: '#783D32', symbol: '忍', open: true },
  { color: '#344C3C', symbol: '巻', open: false },
  { color: '#344B65', symbol: '秘', open: true },
  { color: '#684B35', symbol: '印', open: false },
  { color: '#593B60', symbol: '火', open: true },
  { color: '#805A32', symbol: '記', open: false },
]

function ScrollArtwork({ scroll }) {
  const id = useId()

  return (
    <svg
      viewBox="0 0 160 150"
      preserveAspectRatio="xMidYMid meet"
      className="block h-auto w-full overflow-visible"
    >
      <defs>
        <linearGradient id={`${id}-paper`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F3E3BA" />
          <stop offset="35%" stopColor="#DCC69B" />
          <stop offset="75%" stopColor="#B99A68" />
          <stop offset="100%" stopColor="#8C6C45" />
        </linearGradient>

        <linearGradient id={`${id}-wood`}>
          <stop offset="0%" stopColor="#302015" />
          <stop offset="25%" stopColor="#80552E" />
          <stop offset="48%" stopColor="#C39760" />
          <stop offset="75%" stopColor="#654326" />
          <stop offset="100%" stopColor="#302015" />
        </linearGradient>

        <linearGradient id={`${id}-metal`}>
          <stop offset="0%" stopColor="#504536" />
          <stop offset="45%" stopColor="#C5B49A" />
          <stop offset="70%" stopColor="#8C7960" />
          <stop offset="100%" stopColor="#40362C" />
        </linearGradient>

        <linearGradient id={`${id}-cloth`}>
          <stop offset="0%" stopColor="#211B19" />
          <stop offset="40%" stopColor={scroll.color} />
          <stop offset="65%" stopColor={scroll.color} />
          <stop offset="100%" stopColor="#211B19" />
        </linearGradient>
      </defs>

      {scroll.open ? (
        <g>
          <path
            d="M32 24 Q80 17 128 25
               L126 122 Q80 137 34 124Z"
            fill={`url(#${id}-paper)`}
            stroke="#80613D"
            strokeWidth="1.5"
          />

          <path
            d="M37 29 Q80 24 123 30
               M39 118 Q80 129 121 117"
            fill="none"
            stroke="#785937"
            strokeWidth="1"
            opacity=".55"
          />

          {Array.from({ length: 18 }, (_, index) => (
            <path
              key={index}
              d={`M${42 + (index * 17) % 72}
                  ${33 + (index * 13) % 85}
                  l${3 + index % 5} 1`}
              stroke="#8D6B43"
              strokeWidth=".7"
              opacity=".3"
            />
          ))}

          <text
            x="80"
            y="64"
            textAnchor="middle"
            fontSize="29"
            fill="#5B3823"
          >
            {scroll.symbol}
          </text>

          {['木ノ葉隠れ', '忍法秘伝', '火の意志'].map((line, index) => (
            <text
              key={line}
              x="80"
              y={80 + index * 11}
              textAnchor="middle"
              fontSize="7"
              fill="#674A30"
              opacity=".85"
            >
              {line}
            </text>
          ))}

          <rect
            x="102"
            y="103"
            width="14"
            height="14"
            fill="none"
            stroke="#9D3829"
            strokeWidth="1.4"
            transform="rotate(-9 109 110)"
          />

          <text
            x="109"
            y="114"
            textAnchor="middle"
            fontSize="10"
            fill="#9D3829"
          >
            印
          </text>

          {[20, 126].map(x => (
            <g key={x}>
              <rect
                x={x}
                y="15"
                width="15"
                height="120"
                rx="6"
                fill={`url(#${id}-wood)`}
                stroke="#49311F"
              />

              <rect
                x={x - 2}
                y="11"
                width="19"
                height="13"
                rx="3"
                fill={`url(#${id}-metal)`}
              />

              <rect
                x={x - 2}
                y="126"
                width="19"
                height="13"
                rx="3"
                fill={`url(#${id}-metal)`}
              />

              <path
                d={`M${x + 5} 29V120`}
                stroke="#E8BC82"
                strokeWidth=".8"
                opacity=".3"
              />
            </g>
          ))}
        </g>
      ) : (
        <g transform="rotate(-12 80 75)">
          <rect
            x="23"
            y="45"
            width="114"
            height="60"
            rx="10"
            fill={`url(#${id}-cloth)`}
            stroke="#35291F"
            strokeWidth="1.5"
          />

          <rect
            x="33"
            y="47"
            width="94"
            height="56"
            rx="4"
            fill={`url(#${id}-paper)`}
          />

          <rect
            x="33"
            y="47"
            width="17"
            height="56"
            fill={scroll.color}
          />

          <rect
            x="110"
            y="47"
            width="17"
            height="56"
            fill={scroll.color}
          />

          {[15, 127].map(x => (
            <g key={x}>
              <rect
                x={x}
                y="40"
                width="18"
                height="70"
                rx="5"
                fill={`url(#${id}-wood)`}
              />

              <rect
                x={x + 2}
                y="42"
                width="6"
                height="66"
                rx="2"
                fill={`url(#${id}-metal)`}
              />
            </g>
          ))}

          <path
            d="M37 53H123 M37 98H123"
            stroke="#715338"
            strokeWidth="1"
            opacity=".5"
          />

          <text
            x="79"
            y="83"
            textAnchor="middle"
            fontSize="25"
            fill="#66452E"
          >
            {scroll.symbol}
          </text>

          <path
            d="M94 46 Q89 75 94 104"
            stroke="#6F2521"
            strokeWidth="7"
            fill="none"
          />

          <path
            d="M91 75 Q73 56 77 76
               Q81 89 94 75
               Q112 59 111 78
               Q104 89 94 75"
            stroke="#87362D"
            strokeWidth="4"
            fill="none"
          />

          <path
            d="M94 77 Q88 106 74 119
               M94 77 Q107 101 104 122"
            stroke="#87362D"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          >
            <animate
              attributeName="d"
              values="
                M94 77 Q88 106 74 119 M94 77 Q107 101 104 122;
                M94 77 Q78 99 65 110 M94 77 Q119 97 120 116;
                M94 77 Q88 106 74 119 M94 77 Q107 101 104 122
              "
              dur="4s"
              repeatCount="indefinite"
            />
          </path>

          <circle
            cx="94"
            cy="76"
            r="5"
            fill="#A34B39"
          />
        </g>
      )}
    </svg>
  )
}

function FloatingScroll({ scroll, index }) {
  const size = 85 + (index * 13) % 40
  const duration = 30 + (index % 4) * 5

  return (
    <div
      className="absolute bottom-0"
      style={{
        left: `${30 + (index * 17) % 40}%`,
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
            values="0 100;12 -250;-14 -550;10 -900;0 -1500"
            keyTimes="0;0.2;0.45;0.7;1"
            dur={`${duration}s`}
            begin={`${-index * 6}s`}
            repeatCount="indefinite"
          />

          <animate
            attributeName="opacity"
            values="0;0.8;0.8;0"
            keyTimes="0;0.12;0.85;1"
            dur={`${duration}s`}
            begin={`${-index * 6}s`}
            repeatCount="indefinite"
          />

          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="-18;16;-18"
              dur={`${9 + index % 4}s`}
              repeatCount="indefinite"
            />

            <foreignObject
              x={-size / 2}
              y={-size / 2}
              width={size}
              height={size}
              className="overflow-visible"
            >
              <div
                className="flex h-full w-full items-center justify-center"
                style={{
                  filter: 'drop-shadow(3px 5px 5px rgba(0,0,0,0.5))',
                }}
              >
                <ScrollArtwork scroll={scroll} />
              </div>
            </foreignObject>
          </g>
        </g>
      </svg>
    </div>
  )
}

function ScrollSide({ side }) {
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
            'radial-gradient(ellipse at center, #D6A35415, transparent 75%)',
          animationDuration: '9s',
        }}
      />

      {scrolls.map((scroll, index) => (
        <FloatingScroll
          key={scroll.symbol}
          scroll={scroll}
          index={index + (side === 'right' ? 3 : 0)}
        />
      ))}

      {Array.from({ length: 14 }, (_, index) => (
        <span
          key={index}
          className="absolute animate-pulse rounded-full"
          style={{
            left: `${5 + (index * 37) % 90}%`,
            top: `${(index * 23) % 100}%`,
            width: 2 + index % 2,
            height: 2 + index % 2,
            backgroundColor:
              index % 2 === 0 ? '#D6A354' : '#F97316',
            boxShadow: '0 0 7px #D6A354',
            animationDuration: `${4 + index % 5}s`,
            animationDelay: `${-index * 0.8}s`,
          }}
        />
      ))}
    </div>
  )
}

function WatchGuideBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden min-[1440px]:block motion-reduce:hidden"
    >
      <ScrollSide side="left" />
      <ScrollSide side="right" />
    </div>
  )
}

export default WatchGuideBackground