function ClanEmblem({ clan }) {
  const name = clan.name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

  const hash = Array.from(name).reduce(
    (value, letter) =>
      (Math.imul(value, 31) + letter.charCodeAt(0)) >>> 0,
    0
  )

  function renderEmblem() {
    if (name.includes('uchiha')) {
      return (
        <>
          <path
            d="M20 40 A30 30 0 1 1 80 40
               Q76 58 55 65 V90 H45 V65
               Q24 58 20 40"
            fill="#F1E3C6"
            stroke="none"
          />
          <path
            d="M20 40 A30 30 0 1 1 80 40 Z"
            fill="#DC2626"
            stroke="none"
          />
        </>
      )
    }

    if (name.includes('uzumaki')) {
      return (
        <path
          d="M82 50
             C82 7 12 7 12 50
             C12 90 76 90 76 50
             C76 20 27 20 27 50
             C27 72 61 72 61 50
             C61 37 42 37 42 50"
          strokeWidth="7"
        />
      )
    }

    if (name.includes('hyuga')) {
      return (
        <>
          <path d="M10 50 Q50 12 90 50 Q50 88 10 50Z" />
          <circle cx="50" cy="50" r="17" />
          <circle cx="50" cy="50" r="7" fill="currentColor" />
          <path d="M50 8V22 M50 78V92 M14 19L27 32 M73 68L86 81" />
        </>
      )
    }

    if (name.includes('aburame')) {
      return (
        <>
          <ellipse cx="50" cy="57" rx="17" ry="26" />
          <circle cx="50" cy="24" r="10" />
          <path d="M43 16L30 5 M57 16L70 5" />
          <path d="M35 40L12 25 M33 55H8 M35 70L12 88" />
          <path d="M65 40L88 25 M67 55H92 M65 70L88 88" />
          <path d="M50 34V83" />
        </>
      )
    }

    if (name.includes('akimichi')) {
      return (
        <>
          <circle cx="50" cy="50" r="35" />
          <circle cx="50" cy="50" r="23" />
          <path d="M50 18V82 M18 50H82" />
          <circle cx="50" cy="50" r="10" fill="currentColor" />
        </>
      )
    }

    if (name.includes('nara')) {
      return (
        <>
          <path
            d="M69 12
               A40 40 0 1 0 69 88
               A32 32 0 0 1 69 12"
            fill="currentColor"
            fillOpacity=".35"
          />
          <circle cx="68" cy="50" r="12" />
        </>
      )
    }

    if (name.includes('senju')) {
      return (
        <>
          <path d="M50 90V25" />
          <path d="M50 45Q15 45 15 10Q50 10 50 45Z" />
          <path d="M50 65Q85 65 85 30Q50 30 50 65Z" />
          <path d="M30 90H70" />
        </>
      )
    }

    if (name.includes('yamanaka')) {
      return (
        <>
          {Array.from({ length: 6 }, (_, index) => (
            <ellipse
              key={index}
              cx="50"
              cy="27"
              rx="12"
              ry="22"
              transform={`rotate(${index * 60} 50 50)`}
            />
          ))}
          <circle cx="50" cy="50" r="10" fill="currentColor" />
        </>
      )
    }

    if (name.includes('inuzuka')) {
      return (
        <>
          <ellipse cx="50" cy="67" rx="25" ry="20" fill="currentColor" />
          <ellipse cx="18" cy="38" rx="10" ry="15" fill="currentColor" />
          <ellipse cx="40" cy="22" rx="10" ry="15" fill="currentColor" />
          <ellipse cx="62" cy="22" rx="10" ry="15" fill="currentColor" />
          <ellipse cx="83" cy="38" rx="10" ry="15" fill="currentColor" />
        </>
      )
    }

    if (name.includes('kaguya')) {
      return (
        <>
          <path d="M20 20L80 80 M80 20L20 80" strokeWidth="9" />
          <circle cx="20" cy="20" r="9" />
          <circle cx="80" cy="20" r="9" />
          <circle cx="20" cy="80" r="9" />
          <circle cx="80" cy="80" r="9" />
          <circle cx="50" cy="50" r="15" />
        </>
      )
    }

    if (name.includes('chinoike')) {
      return (
        <>
          <path
            d="M50 8
               C40 28 20 48 20 65
               A30 30 0 0 0 80 65
               C80 48 60 28 50 8Z"
            fill="currentColor"
            fillOpacity=".2"
          />
          <path d="M30 61Q50 40 70 61Q50 80 30 61Z" />
          <circle cx="50" cy="61" r="8" />
        </>
      )
    }

    if (name.includes('sarutobi')) {
      return (
        <>
          <path
            d="M50 5
               Q75 30 65 47
               Q82 39 82 65
               Q82 92 50 92
               Q18 92 18 65
               Q18 43 37 30
               Q30 50 45 57
               Q60 30 50 5Z"
            fill="currentColor"
            fillOpacity=".3"
          />
          <path d="M50 88Q25 65 50 45Q75 65 50 88Z" />
        </>
      )
    }

    const sides = 3 + (hash % 6)
    const rotation = hash % 360

    const points = Array.from(
      { length: sides },
      (_, index) => {
        const angle =
          (index * Math.PI * 2) / sides - Math.PI / 2

        return `${50 + Math.cos(angle) * 35},${50 + Math.sin(angle) * 35}`
      }
    ).join(' ')

    return (
      <>
        <polygon
          points={points}
          transform={`rotate(${rotation} 50 50)`}
          fill="currentColor"
          fillOpacity=".12"
        />

        <polygon
          points={points}
          transform={`translate(50 50) rotate(${rotation + 30}) scale(.65) translate(-50 -50)`}
        />

        {Array.from({ length: sides }, (_, index) => {
          const angle =
            (index * Math.PI * 2) / sides

          return (
            <circle
              key={index}
              cx={50 + Math.cos(angle) * 42}
              cy={50 + Math.sin(angle) * 42}
              r={2 + (hash % 3)}
              fill="currentColor"
              stroke="none"
            />
          )
        })}

        <circle
          cx="50"
          cy="50"
          r={8 + (hash % 7)}
          fill="currentColor"
          fillOpacity=".6"
        />
      </>
    )
  }

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      className="aspect-square h-20 w-20 transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {renderEmblem()}
    </svg>
  )
}

export default ClanEmblem