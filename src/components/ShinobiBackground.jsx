
const chakraParticles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 23 + 17) % 100}%`,
  delay: `${(index * 0.73) % 9}s`,
  duration: `${7 + (index % 5) * 1.5}s`,
  size: `${3 + (index % 3) * 2}px`,
  color: index % 3 === 0 ? '#38BDF8' : '#F97316',
}))

const fireEmbers = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  left: `${(index * 43 + 7) % 100}%`,
  delay: `${(index * 0.91) % 11}s`,
  duration: `${8 + (index % 4) * 2}s`,
}))

const ninjaSeals = [
  { symbol: '忍', left: '12%', top: '15%', delay: '0s' },
  { symbol: '火', left: '82%', top: '28%', delay: '3s' },
  { symbol: '風', left: '24%', top: '65%', delay: '6s' },
  { symbol: '雷', left: '73%', top: '78%', delay: '9s' },
  { symbol: '水', left: '50%', top: '43%', delay: '12s' },
]

function ShinobiBackground() {
  return (
    <div
      className="shinobi-background"
      aria-hidden="true"
    >
      <div className="shinobi-background-glow" />

      {chakraParticles.map((particle) => (
        <span
          key={`chakra-${particle.id}`}
          className="shinobi-bg-chakra"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 12px ${particle.color}`,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}

      {fireEmbers.map((ember) => (
        <span
          key={`ember-${ember.id}`}
          className="shinobi-bg-ember"
          style={{
            left: ember.left,
            animationDelay: ember.delay,
            animationDuration: ember.duration,
          }}
        />
      ))}

      {ninjaSeals.map((seal) => (
        <span
          key={seal.symbol}
          className="shinobi-bg-seal"
          style={{
            left: seal.left,
            top: seal.top,
            animationDelay: seal.delay,
          }}
        >
          {seal.symbol}
        </span>
      ))}
    </div>
  )
}

export default ShinobiBackground
