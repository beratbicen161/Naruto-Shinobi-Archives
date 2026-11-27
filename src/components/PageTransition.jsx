
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const mainPages = [
  '/',
  '/characters',
  '/clans',
  '/villages',
  '/bingo-book',
  '/watch-guide',
  '/favorites',
]

function PageTransition() {
  const { pathname } = useLocation()
  const previousPath = useRef(pathname)
  const audioRef = useRef(null)

  const [transitionId, setTransitionId] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const audio = new Audio(
      `${import.meta.env.BASE_URL}sounds/sharingan.mp3`
    )

    audio.volume = 0.5
    audio.preload = 'auto'

    audioRef.current = audio

    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    const oldPath = previousPath.current

    if (oldPath === pathname) return

    previousPath.current = pathname

    const isMainPageTransition =
      mainPages.includes(oldPath) &&
      mainPages.includes(pathname)

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    if (isMainPageTransition) {
      setTransitionId((id) => id + 1)
      setIsActive(true)

      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.warn('Sharingan audio:', error)
        })
      }
    } else {
      setIsActive(false)
    }
  }, [pathname])

  if (!isActive) return null

  return (
    <div
      key={transitionId}
      className="sharingan-transition"
      aria-hidden="true"
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) {
          setIsActive(false)
        }
      }}
    >
      <div className="sharingan-transition-background" />

      <div className="sharingan-transition-eye">
        <svg viewBox="0 0 200 200">
          <defs>
            <radialGradient id="sharingan-red">
              <stop offset="0%" stopColor="#FF3030" />
              <stop offset="55%" stopColor="#C81020" />
              <stop offset="100%" stopColor="#650000" />
            </radialGradient>

            <g id="sharingan-tomoe" fill="#080305">
              <circle cx="100" cy="43" r="11" />

              <path d="
                M 89 43
                C 87 26, 112 21, 126 38
                C 113 32, 108 38, 111 46
                Z
              " />
            </g>
          </defs>

          <circle
            cx="100"
            cy="100"
            r="96"
            fill="#080305"
          />

          <circle
            cx="100"
            cy="100"
            r="88"
            fill="url(#sharingan-red)"
          />

          <circle
            cx="100"
            cy="100"
            r="57"
            fill="none"
            stroke="#300508"
            strokeWidth="2.5"
          />

          <use href="#sharingan-tomoe" />

          <use
            href="#sharingan-tomoe"
            transform="rotate(120 100 100)"
          />

          <use
            href="#sharingan-tomoe"
            transform="rotate(240 100 100)"
          />

          <circle
            cx="100"
            cy="100"
            r="19"
            fill="#080305"
          />
        </svg>
      </div>
    </div>
  )
}

export default PageTransition
