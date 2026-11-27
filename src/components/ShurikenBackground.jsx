
import { useId } from 'react'

const particles = [
  { x: '5%', y: '12%', size: 38, duration: 7 },
  { x: '88%', y: '8%', size: 48, duration: 9 },
  { x: '14%', y: '42%', size: 26, duration: 5 },
  { x: '92%', y: '48%', size: 34, duration: 8 },
  { x: '4%', y: '76%', size: 52, duration: 10 },
  { x: '85%', y: '83%', size: 28, duration: 6 },
  { x: '38%', y: '5%', size: 22, duration: 8 },
  { x: '65%', y: '94%', size: 40, duration: 7 },
]

function Shuriken({ size, duration }) {
  const gradientId = useId()

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className="motion-safe:animate-spin drop-shadow-[2px_3px_3px_rgba(0,0,0,0.5)]"
      style={{
        animationDuration: `${duration}s`,
      }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="45%" stopColor="#64748B" />
          <stop offset="70%" stopColor="#334155" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
      </defs>

      <path
        d="M50 3 L63 36 L97 50 L63 64 L50 97 L36 64 L3 50 L36 36 Z"
        fill={`url(#${gradientId})`}
        stroke="#94A3B8"
        strokeWidth="1"
      />

      <circle
        cx="50"
        cy="50"
        r="9"
        fill="#15191F"
        stroke="#94A3B8"
        strokeWidth="2"
      />
    </svg>
  )
}

function ShurikenBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute opacity-25 motion-safe:animate-bounce"
          style={{
            left: particle.x,
            top: particle.y,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${index * -0.8}s`,
          }}
        >
          <Shuriken
            size={particle.size}
            duration={particle.duration}
          />
        </div>
      ))}
    </div>
  )
}

export default ShurikenBackground
