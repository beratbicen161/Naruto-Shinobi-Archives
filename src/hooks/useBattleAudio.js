
import {
  useEffect,
  useRef,
  useCallback,
} from 'react'

import {
  unlockBattleAudio,
  playBattleSound,
  playJutsuSound,
  stopBattleSounds,
  setBattleSoundVolume,
  closeBattleAudio,
} from '../services/battleAudio'

const MUSIC_PATH =
  `${import.meta.env.BASE_URL}sounds/battle/battle-music.mp3`

export default function useBattleAudio({
  frame,
  firstFighter,
  secondFighter,
  soundEnabled,
  musicEnabled,
}) {
  const musicRef = useRef(null)

  const playedEventsRef = useRef(
    new Set()
  )

  const previousPhaseRef =
    useRef('idle')

  const audioReadyRef =
    useRef(false)

  const mountedRef =
    useRef(false)

  const musicFailedRef =
    useRef(false)

  const isActive =
    frame?.phase === 'countdown' ||
    (
      frame?.phase === 'battle' &&
      frame?.stage !== 'victory'
    )

  const playMusic = useCallback(() => {
    const music = musicRef.current

    if (
      !music ||
      musicFailedRef.current
    ) {
      return
    }

    music.play().catch(() => {})
  }, [])

  const pauseMusic = useCallback(() => {
    if (musicRef.current) {
      musicRef.current.pause()
    }
  }, [])

  const stopMusic = useCallback(() => {
    if (musicRef.current) {
      musicRef.current.pause()
      musicRef.current.currentTime = 0
    }
  }, [])

  const playOnce = useCallback((
    eventId,
    callback
  ) => {
    if (
      playedEventsRef.current.has(
        eventId
      )
    ) {
      return
    }

    playedEventsRef.current.add(
      eventId
    )

    callback()
  }, [])

  useEffect(() => {
    mountedRef.current = true

    const music = new Audio()

    music.loop = true
    music.volume = 0.18
    music.preload = 'none'

    musicRef.current = music

    musicFailedRef.current = false

    function handleMusicError() {
      musicFailedRef.current = true

      console.warn(
        'Battle music could not be loaded.'
      )
    }

    music.addEventListener(
      'error',
      handleMusicError
    )

    return () => {
      mountedRef.current = false

      music.pause()

      music.removeEventListener(
        'error',
        handleMusicError
      )

      music.removeAttribute('src')
      music.load()

      musicRef.current = null

      closeBattleAudio()

      audioReadyRef.current = false

      playedEventsRef.current.clear()
    }
  }, [])

  const prepareAudio = useCallback(async () => {
    try {
      const ready =
        await unlockBattleAudio()

      if (!mountedRef.current) {
        return false
      }

      audioReadyRef.current = ready

      setBattleSoundVolume(0.35)

      return ready
    } catch {
      return false
    }
  }, [])

  const prepareBattle = useCallback(() => {
    stopBattleSounds()
    stopMusic()

    playedEventsRef.current.clear()

    previousPhaseRef.current = 'idle'

    if (soundEnabled) {
      void prepareAudio()
    }

    if (
      musicEnabled &&
      musicRef.current &&
      !musicFailedRef.current
    ) {
      const music = musicRef.current

      if (!music.getAttribute('src')) {
        music.src = MUSIC_PATH
      }

      music.volume = 0.18

      playMusic()
    }
  }, [
    soundEnabled,
    musicEnabled,
    prepareAudio,
    playMusic,
    stopMusic,
  ])

  useEffect(() => {
    if (!soundEnabled) {
      stopBattleSounds()
      return
    }

    if (audioReadyRef.current) {
      setBattleSoundVolume(0.35)
    }
  }, [soundEnabled])

  useEffect(() => {
    if (
      musicEnabled &&
      isActive &&
      musicRef.current &&
      !musicFailedRef.current
    ) {
      const music = musicRef.current

      if (!music.getAttribute('src')) {
        music.src = MUSIC_PATH
      }

      playMusic()
    } else {
      pauseMusic()
    }
  }, [
    musicEnabled,
    isActive,
    playMusic,
    pauseMusic,
  ])

  useEffect(() => {
    if (!frame) return

    const previousPhase =
      previousPhaseRef.current

    previousPhaseRef.current =
      frame.phase

    if (frame.phase === 'idle') {
      playedEventsRef.current.clear()

      stopBattleSounds()
      stopMusic()

      return
    }

    if (
      frame.phase === 'countdown' &&
      previousPhase === 'finished'
    ) {
      playedEventsRef.current.clear()
    }

    if (
      !soundEnabled ||
      !audioReadyRef.current
    ) {
      return
    }

    if (frame.phase === 'countdown') {
      playOnce(
        'chakra-charging',
        () => {
          playBattleSound('charging')
        }
      )

      playOnce(
        `countdown-${frame.countdown}`,
        () => {
          playBattleSound(
            'countdown',
            frame.countdown
          )
        }
      )

      return
    }

    if (frame.stage === 'first-clash') {
      playOnce(
        'battle-start',
        () => {
          playBattleSound(
            'battle-start'
          )
        }
      )

      const clashMoments = [
        0.20,
        0.45,
        0.70,
        0.90,
      ]

      clashMoments.forEach(
        (moment, index) => {
          if (
            frame.stageProgress >= moment
          ) {
            playOnce(
              `first-clash-${index}`,
              () => {
                playBattleSound('clash')
              }
            )
          }
        }
      )

      return
    }

    if (
      frame.stage === 'signature-jutsu'
    ) {
      playOnce(
        'first-fighter-jutsu',
        () => {
          if (firstFighter) {
            playJutsuSound(firstFighter)
          }
        }
      )

      if (frame.stageProgress >= 0.25) {
        playOnce(
          'second-fighter-jutsu',
          () => {
            if (secondFighter) {
              playJutsuSound(
                secondFighter
              )
            }
          }
        )
      }

      if (frame.stageProgress >= 0.75) {
        playOnce(
          'signature-jutsu-clash',
          () => {
            playBattleSound('clash')
          }
        )
      }

      return
    }

    if (
      frame.stage === 'ultimate-clash'
    ) {
      playOnce(
        'ultimate-clash',
        () => {
          playBattleSound(
            'ultimate-clash'
          )
        }
      )

      if (frame.stageProgress >= 0.5) {
        playOnce(
          'ultimate-jutsu',
          () => {
            if (firstFighter) {
              playJutsuSound(
                firstFighter
              )
            }

            if (secondFighter) {
              playJutsuSound(
                secondFighter
              )
            }
          }
        )
      }

      return
    }

    if (
      frame.stage === 'final-impact'
    ) {
      playOnce(
        'final-impact',
        () => {
          playBattleSound(
            'final-impact'
          )
        }
      )

      return
    }

    if (
      frame.stage === 'victory' ||
      frame.finished
    ) {
      playOnce(
        'battle-result',
        () => {
          stopBattleSounds()

          if (frame.winner === 'draw') {
            playBattleSound('draw')
          } else {
            playBattleSound('victory')
          }
        }
      )
    }
  }, [
    frame,
    firstFighter,
    secondFighter,
    soundEnabled,
    playOnce,
    stopMusic,
  ])

  const handleSoundToggle =
    useCallback((enabled) => {
      if (enabled) {
        void prepareAudio()
      } else {
        stopBattleSounds()
      }
    }, [prepareAudio])

  const handleMusicToggle =
    useCallback((enabled) => {
      if (!enabled) {
        pauseMusic()
        return
      }

      if (
        isActive &&
        musicRef.current &&
        !musicFailedRef.current
      ) {
        if (
          !musicRef.current.getAttribute(
            'src'
          )
        ) {
          musicRef.current.src =
            MUSIC_PATH
        }

        playMusic()
      }
    }, [
      isActive,
      playMusic,
      pauseMusic,
    ])

  return {
    prepareBattle,
    prepareAudio,
    handleSoundToggle,
    handleMusicToggle,
    stopMusic,
  }
}
