
import { useEffect, useState } from 'react'

const decorations = Array.from(
  { length: 40 },
  (_, index) => ({
    id: index,
    side: index % 2 === 0 ? 'left' : 'right',
    type: Math.floor(index / 2) % 4,
    x: 15 + (index * 37) % 70,
    size: 24 + (index % 5) * 10,
    speed: 0.045 + (index % 5) * 0.012,
    offset: index * 0.137,
    direction: index % 2 === 0 ? 1 : -1,
  })
)

function NinjaDecoration({ type }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      aria-hidden="true"
    >
      {type === 0 && (
        <>
          <path
            d="M50 5 L62 38 L95 50 L62 62 L50 95 L38 62 L5 50 L38 38 Z"
            fill="#8494A8"
            stroke="#D2DEEB"
            strokeWidth="1.5"
          />

          <path
            d="M50 5 L50 50 L95 50 L62 38 Z"
            fill="#475569"
          />

          <path
            d="M50 95 L50 50 L5 50 L38 62 Z"
            fill="#475569"
          />

          <circle
            cx="50"
            cy="50"
            r="9"
            fill="#10151D"
            stroke="#CBD5E1"
          />
        </>
      )}

      {type === 1 && (
        <>
          <path
            d="M50 8 L69 43 L50 61 L31 43 Z"
            fill="#A1AEBF"
            stroke="#D2DEEB"
          />

          <path
            d="M50 8 L50 61 L69 43 Z"
            fill="#526174"
          />

          <rect
            x="46"
            y="60"
            width="8"
            height="19"
            rx="3"
            fill="#75685D"
          />

          <circle
            cx="50"
            cy="86"
            r="7"
            fill="none"
            stroke="#A1AEBF"
            strokeWidth="4"
          />
        </>
      )}

      {type === 2 && (
        <g transform="rotate(-15 50 50)">
          <rect
            x="27"
            y="10"
            width="46"
            height="80"
            rx="4"
            fill="#E5D2A7"
            stroke="#B98150"
            strokeWidth="2"
          />

          <rect
            x="33"
            y="16"
            width="34"
            height="68"
            fill="none"
            stroke="#A33C25"
          />

          <text
            x="50"
            y="55"
            textAnchor="middle"
            fontSize="27"
            fontWeight="bold"
            fill="#9E3121"
          >
            爆
          </text>

          <path
            d="M40 65 H60 M40 71 H60"
            stroke="#9E3121"
            strokeWidth="2"
          />
        </g>
      )}

      {type === 3 && (
        <>
          <circle
            cx="50"
            cy="50"
            r="6"
            fill="#FFD393"
          />

          <circle
            cx="50"
            cy="50"
            r="19"
            fill="none"
            stroke="#FB923C"
            strokeWidth="2"
            opacity="0.5"
          />
        </>
      )}
    </svg>
  )
}

function SideEffects({ side, time }) {
  const items = decorations.filter(
    item => item.side === side
  )

  return (
    <div
      className={`absolute inset-y-0 w-[max(0px,calc((100%-1500px)/2))] overflow-hidden ${
        side === 'left' ? 'left-0' : 'right-0'
      }`}
    >
      <div className="absolute inset-0 bg-linear-to-b from-orange-950/10 via-transparent to-indigo-950/20" />

      {items.map(item => {
        const progress =
          (time * item.speed + item.offset) % 1

        const opacity =
          Math.sin(progress * Math.PI) * 0.65

        const x =
          item.x +
          Math.sin(time * 0.5 + item.id) * 12

        const y =
          110 - progress * 120

        return (
          <div
            key={item.id}
            className="absolute drop-shadow-[0_0_8px_rgba(203,213,225,0.3)]"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: item.size,
              height: item.size,
              opacity,
              transform: `translate(-50%, -50%) rotate(${
                progress * 360 * item.direction
              }deg)`,
            }}
          >
            <NinjaDecoration type={item.type} />
          </div>
        )
      })}

      {Array.from({ length: 18 }, (_, index) => {
        const progress =
          (time * (0.04 + index % 4 * 0.01) +
            index * 0.137) % 1

        const color =
          index % 3 === 0
            ? '#818CF8'
            : '#F97316'

        return (
          <span
            key={index}
            className="absolute rounded-full"
            style={{
              left: `${10 + (index * 43) % 80}%`,
              top: `${105 - progress * 115}%`,
              width: 2 + index % 4,
              height: 2 + index % 4,
              backgroundColor: color,
              boxShadow: `0 0 10px ${color}`,
              opacity:
                Math.sin(progress * Math.PI) * 0.8,
            }}
          />
        )
      })}

      {Array.from({ length: 3 }, (_, index) => {
        const progress =
          (time * 0.12 + index * 0.33) % 1

        return (
          <div
            key={index}
            className="absolute rounded-full"
            style={{
              left: `${20 + index * 25}%`,
              top: `${15 + index * 30}%`,
              width: 70 + progress * 100,
              height: 70 + progress * 100,
              opacity:
                Math.pow(
                  Math.sin(progress * Math.PI),
                  8
                ) * 0.55,
              transform: 'translate(-50%, -50%)',
              background:
                'radial-gradient(circle, #FFE8AD 0%, #F9731680 20%, #EA580C30 45%, transparent 70%)',
            }}
          />
        )
      })}
    </div>
  )
}

function BattleBackgroundEffects() {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    let animationId = null
    let startedAt = performance.now()
    let lastUpdate = 0

    function animate(now) {
      if (now - lastUpdate >= 33) {
        setTime((now - startedAt) / 1000)
        lastUpdate = now
      }

      animationId =
        requestAnimationFrame(animate)
    }

    function updateAnimation() {
      if (animationId !== null) {
        cancelAnimationFrame(animationId)
        animationId = null
      }

      if (!mediaQuery.matches) {
        startedAt = performance.now()
        lastUpdate = 0

        animationId =
          requestAnimationFrame(animate)
      }
    }

    updateAnimation()

    mediaQuery.addEventListener(
      'change',
      updateAnimation
    )

    return () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId)
      }

      mediaQuery.removeEventListener(
        'change',
        updateAnimation
      )
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden min-[1500px]:block motion-reduce:hidden"
    >
      <SideEffects side="left" time={time} />

      <SideEffects side="right" time={time} />
    </div>
  )
}

export default BattleBackgroundEffects
