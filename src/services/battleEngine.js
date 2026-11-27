
import { compareBattlePower } from '../data/battleStats'

export const MAX_HP = 100

export const COUNTDOWN_DURATION = 3000
export const BATTLE_DURATION = 15000
export const VICTORY_DURATION = 2000

export const TOTAL_DURATION =
  COUNTDOWN_DURATION +
  BATTLE_DURATION +
  VICTORY_DURATION

export const BATTLE_STAGES = [
  {
    id: 'first-clash',
    name: 'FIRST CLASH',
    start: 0,
    end: 4000,
    damageStart: 0,
    damageEnd: 0.15,
  },
  {
    id: 'signature-jutsu',
    name: 'SIGNATURE JUTSU',
    start: 4000,
    end: 9000,
    damageStart: 0.15,
    damageEnd: 0.45,
  },
  {
    id: 'ultimate-clash',
    name: 'ULTIMATE CLASH',
    start: 9000,
    end: 13000,
    damageStart: 0.45,
    damageEnd: 0.80,
  },
  {
    id: 'final-impact',
    name: 'FINAL IMPACT',
    start: 13000,
    end: 15000,
    damageStart: 0.80,
    damageEnd: 1,
  },
]

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function lerp(start, end, progress) {
  return start + (end - start) * progress
}

function smoothStep(value) {
  const progress = clamp(value, 0, 1)

  return progress * progress * (3 - 2 * progress)
}

function getCurrentStage(elapsed) {
  return (
    BATTLE_STAGES.find(
      stage =>
        elapsed >= stage.start &&
        elapsed < stage.end
    ) || BATTLE_STAGES[BATTLE_STAGES.length - 1]
  )
}

function getDamageProgress(stage, stageProgress) {
  return lerp(
    stage.damageStart,
    stage.damageEnd,
    smoothStep(stageProgress)
  )
}

export function createBattle(
  firstFighter,
  secondFighter
) {
  if (!firstFighter?.form || !secondFighter?.form) {
    return null
  }

  const comparison = compareBattlePower(
    firstFighter.form,
    secondFighter.form
  )

  if (!comparison) return null

  const firstPower = firstFighter.form.power
  const secondPower = secondFighter.form.power

  const maximumPower = Math.max(
    firstPower,
    secondPower,
    1
  )

  const remainingHP = clamp(
    Math.round(
      (comparison.difference / maximumPower) *
        MAX_HP
    ),
    5,
    95
  )

  return {
    firstFighter,
    secondFighter,
    firstPower,
    secondPower,

    winner: comparison.winner,
    difference: comparison.difference,

    firstFinalHP:
      comparison.winner === 'first'
        ? remainingHP
        : 0,

    secondFinalHP:
      comparison.winner === 'second'
        ? remainingHP
        : 0,

    duration: TOTAL_DURATION,
  }
}

export function getBattleFrame(
  battle,
  elapsedTime
) {
  if (!battle) return null

  const elapsed = clamp(
    elapsedTime,
    0,
    TOTAL_DURATION
  )

  if (elapsed < COUNTDOWN_DURATION) {
    return {
      phase: 'countdown',

      stage: 'charging',
      stageName: 'CHAKRA CHARGING',

      countdown: Math.ceil(
        (COUNTDOWN_DURATION - elapsed) / 1000
      ),

      stageProgress:
        elapsed / COUNTDOWN_DURATION,

      elapsed,
      progress: 0,

      firstHP: MAX_HP,
      secondHP: MAX_HP,

      impact: 0,
      intensity: 0.25 +
        (elapsed / COUNTDOWN_DURATION) * 0.5,

      victoryProgress: 0,

      winner: null,
      finished: false,
    }
  }

  const battleElapsed =
    elapsed - COUNTDOWN_DURATION

  if (battleElapsed < BATTLE_DURATION) {
    const stage = getCurrentStage(
      battleElapsed
    )

    const stageDuration =
      stage.end - stage.start

    const stageProgress = clamp(
      (battleElapsed - stage.start) /
        stageDuration,
      0,
      1
    )

    const damageProgress = getDamageProgress(
      stage,
      stageProgress
    )

    const firstHP = Math.round(
      lerp(
        MAX_HP,
        battle.firstFinalHP,
        damageProgress
      )
    )

    const secondHP = Math.round(
      lerp(
        MAX_HP,
        battle.secondFinalHP,
        damageProgress
      )
    )

    const wave =
      (Math.sin(stageProgress * Math.PI * 6) + 1) / 2

    const impact = Math.pow(wave, 4)

    const intensity =
      stage.id === 'first-clash'
        ? 0.4
        : stage.id === 'signature-jutsu'
          ? 0.65
          : stage.id === 'ultimate-clash'
            ? 0.85
            : 1

    return {
      phase: 'battle',

      stage: stage.id,
      stageName: stage.name,

      countdown: 0,

      stageProgress,

      elapsed,

      progress: Math.min(
        99,
        Math.floor(
          (battleElapsed / BATTLE_DURATION) *
            100
        )
      ),

      firstHP: Math.max(1, firstHP),
      secondHP: Math.max(1, secondHP),

      impact,
      intensity,

      victoryProgress: 0,

      winner: null,
      finished: false,
    }
  }

  const victoryElapsed =
    battleElapsed - BATTLE_DURATION

  const victoryProgress = clamp(
    victoryElapsed / VICTORY_DURATION,
    0,
    1
  )

  const finished =
    elapsed >= TOTAL_DURATION

  return {
    phase: finished ? 'finished' : 'battle',

    stage: 'victory',

    stageName:
      battle.winner === 'draw'
        ? 'DRAW'
        : 'VICTORY',

    countdown: 0,

    stageProgress: victoryProgress,

    elapsed,
    progress: 100,

    firstHP: battle.firstFinalHP,
    secondHP: battle.secondFinalHP,

    impact: 0,

    intensity: 1 - victoryProgress,

    victoryProgress,

    winner: battle.winner,

    finished,
  }
}

export function getHPColor(hp) {
  if (hp > 50) return '#22C55E'
  if (hp > 20) return '#EAB308'

  return '#EF4444'
}

export function getBattleWinner(battle) {
  if (!battle || battle.winner === 'draw') {
    return null
  }

  return battle.winner === 'first'
    ? battle.firstFighter
    : battle.secondFighter
}
