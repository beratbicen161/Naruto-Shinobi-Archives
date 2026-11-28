const particles = Array.from({ length: 20 }, (_, index) => ({
  x: 8 + ((index * 37) % 84),
  y: 4 + ((index * 23) % 90),
  size: 2 + (index % 4),
  duration: 3 + (index % 6),
  delay: -(index * 0.73)
}))

function ChakraSide({ side, color }) {
  return (
    <div
      className={`absolute inset-y-0 w-[max(0px,calc((100%-1120px)/2))] overflow-hidden ${
        side === 'left' ? 'left-0' : 'right-0'
      }`}
      style={{ color }}
    >
      <div
        className="absolute inset-0 animate-pulse motion-reduce:animate-none"
        style={{
          background: `radial-gradient(ellipse at center, ${color}20, transparent 75%)`,
          animationDuration: '6s'
        }}
      />

      <svg
        viewBox="0 0 200 900"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-hidden"
      >
        {Array.from({ length: 5 }, (_, index) => (
          <g key={index}>
            <path
              d={`M ${45 + index * 24} 950
                  C ${170 - index * 12} 720,
                    ${10 + index * 15} 580,
                    ${100 + index * 8} 450
                  S ${180 - index * 12} 180,
                    ${45 + index * 24} -50`}
              fill="none"
              stroke="currentColor"
              strokeWidth={index % 2 === 0 ? 2 : 1}
              opacity={0.1 + index * 0.025}
              strokeDasharray="60 100"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="320"
                to="0"
                dur={`${8 + index * 2}s`}
                repeatCount="indefinite"
              />
            </path>
          </g>
        ))}
      </svg>

      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute animate-bounce motion-reduce:animate-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`
          }}
        >
          <div
            className="animate-pulse rounded-full motion-reduce:animate-none"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: color,
              boxShadow: `0 0 8px ${color}`,
              animationDuration: `${particle.duration}s`
            }}
          />
        </div>
      ))}

      <div
        className="absolute left-1/2 top-1/4 h-32 w-32 -translate-x-1/2 animate-pulse rounded-full blur-3xl"
        style={{
          backgroundColor: `${color}20`,
          animationDuration: '7s'
        }}
      />

      <div
        className="absolute bottom-1/4 left-1/2 h-40 w-40 -translate-x-1/2 animate-pulse rounded-full blur-3xl"
        style={{
          backgroundColor: `${color}15`,
          animationDuration: '9s'
        }}
      />
    </div>
  )
}

function CharacterChakraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden min-[1280px]:block motion-reduce:hidden"
    >
      <ChakraSide side="left" color="#38BDF8" />
      <ChakraSide side="right" color="#F97316" />
    </div>
  )
}

export default CharacterChakraBackground