
import { useEffect, useState } from 'react'
import {
  createBattle,
  getBattleFrame,
  MAX_HP,
} from '../services/battleEngine'

const initialFrame = {
  phase: 'idle',
  countdown: 0,
  progress: 0,
  firstHP: MAX_HP,
  secondHP: MAX_HP,
  winner: null,
  finished: false,
}

export default function useBattle() {
  const [battle, setBattle] = useState(null)

  const [frame, setFrame] = useState(initialFrame)

  const isRunning =
    frame.phase === 'countdown' ||
    frame.phase === 'battle'

  useEffect(() => {
    if (!battle) return

    const startedAt = performance.now()

    let animationId

    function updateBattle(now) {
      const elapsed = now - startedAt

      const nextFrame = getBattleFrame(
        battle,
        elapsed
      )

      setFrame(nextFrame)

      if (!nextFrame.finished) {
        animationId =
          requestAnimationFrame(updateBattle)
      }
    }

    animationId =
      requestAnimationFrame(updateBattle)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [battle])

  function startBattle(firstFighter, secondFighter) {
    if (isRunning) return false

    const nextBattle = createBattle(
      firstFighter,
      secondFighter
    )

    if (!nextBattle) return false

    setFrame(getBattleFrame(nextBattle, 0))
    setBattle(nextBattle)

    return true
  }

  function resetBattle() {
    setBattle(null)
    setFrame(initialFrame)
  }

  return {
    battle,
    frame,
    isRunning,
    startBattle,
    resetBattle,
  }
}
