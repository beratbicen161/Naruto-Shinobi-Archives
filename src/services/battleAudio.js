
let audioContext = null
let masterGain = null
let noiseBuffer = null

const activeSources = new Set()

function getAudioContext() {
  if (!audioContext) {
    const AudioContextClass =
      window.AudioContext ||
      window.webkitAudioContext

    if (!AudioContextClass) {
      return null
    }

    audioContext = new AudioContextClass()

    masterGain = audioContext.createGain()
    masterGain.gain.value = 0.35

    const compressor =
      audioContext.createDynamicsCompressor()

    masterGain.connect(compressor)
    compressor.connect(audioContext.destination)
  }

  return audioContext
}

export async function unlockBattleAudio() {
  const context = getAudioContext()

  if (!context) return false

  try {
    if (context.state === 'suspended') {
      await context.resume()
    }

    return context.state === 'running'
  } catch {
    return false
  }
}

function trackSource(source, nodes = []) {
  activeSources.add(source)

  source.onended = () => {
    activeSources.delete(source)
    source.disconnect()

    nodes.forEach(node => {
      node.disconnect()
    })
  }
}

function playTone({
  frequency = 440,
  endFrequency = frequency,
  duration = 0.3,
  volume = 0.2,
  type = 'sine',
  delay = 0,
}) {
  const context = getAudioContext()

  if (
    !context ||
    context.state !== 'running'
  ) {
    return
  }

  const oscillator =
    context.createOscillator()

  const gain =
    context.createGain()

  const start =
    context.currentTime + delay

  const end =
    start + duration

  oscillator.type = type

  oscillator.frequency.setValueAtTime(
    Math.max(1, frequency),
    start
  )

  oscillator.frequency.exponentialRampToValueAtTime(
    Math.max(1, endFrequency),
    end
  )

  gain.gain.setValueAtTime(
    0.001,
    start
  )

  gain.gain.exponentialRampToValueAtTime(
    Math.max(0.001, volume),
    start + Math.min(0.03, duration / 4)
  )

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    end
  )

  oscillator.connect(gain)
  gain.connect(masterGain)

  trackSource(oscillator, [gain])

  oscillator.start(start)
  oscillator.stop(end + 0.02)
}

function getNoiseBuffer(context) {
  if (noiseBuffer) {
    return noiseBuffer
  }

  const length =
    context.sampleRate * 4

  noiseBuffer = context.createBuffer(
    1,
    length,
    context.sampleRate
  )

  const data =
    noiseBuffer.getChannelData(0)

  for (let index = 0; index < length; index++) {
    data[index] =
      Math.random() * 2 - 1
  }

  return noiseBuffer
}

function playNoise({
  duration = 0.4,
  frequency = 1000,
  endFrequency = frequency,
  volume = 0.2,
  filterType = 'lowpass',
  resonance = 1,
  delay = 0,
}) {
  const context = getAudioContext()

  if (
    !context ||
    context.state !== 'running'
  ) {
    return
  }

  const source =
    context.createBufferSource()

  const filter =
    context.createBiquadFilter()

  const gain =
    context.createGain()

  const start =
    context.currentTime + delay

  const end =
    start + duration

  source.buffer =
    getNoiseBuffer(context)

  source.loop = true

  filter.type = filterType
  filter.Q.value = resonance

  filter.frequency.setValueAtTime(
    Math.max(20, frequency),
    start
  )

  filter.frequency.exponentialRampToValueAtTime(
    Math.max(20, endFrequency),
    end
  )

  gain.gain.setValueAtTime(
    0.001,
    start
  )

  gain.gain.exponentialRampToValueAtTime(
    Math.max(0.001, volume),
    start + Math.min(0.04, duration / 4)
  )

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    end
  )

  source.connect(filter)
  filter.connect(gain)
  gain.connect(masterGain)

  trackSource(source, [filter, gain])

  source.start(start)
  source.stop(end + 0.02)
}

function countdownSound(number = 3) {
  playTone({
    frequency: number === 1 ? 880 : 550,
    duration: 0.18,
    volume: 0.3,
    type: 'sine',
  })
}

function chakraChargeSound() {
  playTone({
    frequency: 55,
    endFrequency: 180,
    duration: 2.8,
    volume: 0.22,
    type: 'triangle',
  })

  playTone({
    frequency: 110,
    endFrequency: 440,
    duration: 2.8,
    volume: 0.1,
    type: 'sine',
  })

  playNoise({
    duration: 2.8,
    frequency: 180,
    endFrequency: 1800,
    volume: 0.16,
    filterType: 'bandpass',
  })
}

function battleStartSound() {
  playTone({
    frequency: 180,
    endFrequency: 45,
    duration: 0.65,
    volume: 0.4,
    type: 'triangle',
  })

  playNoise({
    duration: 0.5,
    frequency: 2200,
    endFrequency: 180,
    volume: 0.3,
  })
}

function clashSound() {
  playNoise({
    duration: 0.2,
    frequency: 2400,
    endFrequency: 300,
    volume: 0.28,
    filterType: 'bandpass',
  })

  playTone({
    frequency: 150,
    endFrequency: 55,
    duration: 0.22,
    volume: 0.25,
    type: 'triangle',
  })
}

function rasenganSound() {
  for (let index = 0; index < 8; index++) {
    playTone({
      frequency: 220 + index * 35,
      endFrequency: 400 + index * 45,
      duration: 0.35,
      volume: 0.08,
      type: 'sine',
      delay: index * 0.12,
    })
  }

  playNoise({
    duration: 1.5,
    frequency: 700,
    endFrequency: 2600,
    volume: 0.2,
    filterType: 'bandpass',
    resonance: 3,
  })
}

function chidoriSound() {
  for (let index = 0; index < 12; index++) {
    playNoise({
      duration: 0.09,
      frequency: 1800 + index % 4 * 450,
      endFrequency: 600,
      volume: 0.12,
      filterType: 'highpass',
      delay: index * 0.08,
    })
  }

  playTone({
    frequency: 130,
    endFrequency: 340,
    duration: 1.1,
    volume: 0.08,
    type: 'sawtooth',
  })
}

function fireSound() {
  playNoise({
    duration: 1.5,
    frequency: 900,
    endFrequency: 160,
    volume: 0.3,
    filterType: 'lowpass',
  })

  playTone({
    frequency: 95,
    endFrequency: 40,
    duration: 0.9,
    volume: 0.12,
    type: 'triangle',
  })
}

function darkFireSound() {
  playTone({
    frequency: 65,
    endFrequency: 35,
    duration: 1.6,
    volume: 0.2,
    type: 'sawtooth',
  })

  playNoise({
    duration: 1.6,
    frequency: 400,
    endFrequency: 120,
    volume: 0.18,
    filterType: 'lowpass',
  })
}

function windSound() {
  playNoise({
    duration: 1.4,
    frequency: 500,
    endFrequency: 3200,
    volume: 0.24,
    filterType: 'bandpass',
    resonance: 2,
  })

  playTone({
    frequency: 450,
    endFrequency: 900,
    duration: 0.8,
    volume: 0.06,
    type: 'sine',
  })
}

function waterSound() {
  for (let index = 0; index < 6; index++) {
    playNoise({
      duration: 0.45,
      frequency: 600 + index * 100,
      endFrequency: 220,
      volume: 0.12,
      filterType: 'bandpass',
      delay: index * 0.15,
    })
  }

  playTone({
    frequency: 350,
    endFrequency: 100,
    duration: 0.9,
    volume: 0.06,
    type: 'sine',
  })
}

function earthSound() {
  playNoise({
    duration: 1.1,
    frequency: 300,
    endFrequency: 80,
    volume: 0.28,
  })

  playTone({
    frequency: 75,
    endFrequency: 30,
    duration: 0.8,
    volume: 0.22,
    type: 'triangle',
  })
}

function woodSound() {
  for (let index = 0; index < 5; index++) {
    playNoise({
      duration: 0.15,
      frequency: 650,
      endFrequency: 180,
      volume: 0.15,
      filterType: 'bandpass',
      delay: index * 0.14,
    })
  }
}

function chakraSound() {
  playTone({
    frequency: 120,
    endFrequency: 480,
    duration: 1.2,
    volume: 0.18,
    type: 'triangle',
  })

  playNoise({
    duration: 1.2,
    frequency: 400,
    endFrequency: 1800,
    volume: 0.15,
    filterType: 'bandpass',
  })
}

function ultimateClashSound() {
  playTone({
    frequency: 60,
    endFrequency: 150,
    duration: 2.6,
    volume: 0.25,
    type: 'triangle',
  })

  playTone({
    frequency: 120,
    endFrequency: 380,
    duration: 2.6,
    volume: 0.12,
    type: 'sine',
  })

  playNoise({
    duration: 2.8,
    frequency: 500,
    endFrequency: 2800,
    volume: 0.24,
    filterType: 'bandpass',
  })
}

function finalImpactSound() {
  playTone({
    frequency: 140,
    endFrequency: 30,
    duration: 1.5,
    volume: 0.4,
    type: 'triangle',
  })

  playNoise({
    duration: 1.4,
    frequency: 3200,
    endFrequency: 90,
    volume: 0.35,
  })

  playTone({
    frequency: 680,
    endFrequency: 220,
    duration: 0.8,
    volume: 0.08,
    type: 'sine',
  })
}

function victorySound() {
  const notes = [
    392,
    493.88,
    587.33,
    783.99,
  ]

  notes.forEach((frequency, index) => {
    playTone({
      frequency,
      duration: index === 3 ? 0.85 : 0.3,
      volume: 0.2,
      type: 'triangle',
      delay: index * 0.2,
    })

    playTone({
      frequency: frequency / 2,
      duration: index === 3 ? 0.85 : 0.3,
      volume: 0.08,
      type: 'sine',
      delay: index * 0.2,
    })
  })
}

function drawSound() {
  const notes = [
    392,
    329.63,
    293.66,
  ]

  notes.forEach((frequency, index) => {
    playTone({
      frequency,
      duration: 0.4,
      volume: 0.18,
      type: 'triangle',
      delay: index * 0.25,
    })
  })
}

export function playJutsuSound(fighter) {
  const jutsu = String(
    fighter?.form?.jutsu || ''
  ).toLowerCase()

  const element = String(
    fighter?.form?.element || ''
  ).trim().toLowerCase()

  if (jutsu.includes('rasenshuriken')) {
    windSound()
    return
  }

  if (jutsu.includes('rasengan')) {
    rasenganSound()
    return
  }

  if (
    jutsu.includes('chidori') ||
    jutsu.includes('lightning blade') ||
    jutsu.includes('raikiri') ||
    jutsu.includes('indra')
  ) {
    chidoriSound()
    return
  }

  if (jutsu.includes('amaterasu')) {
    darkFireSound()
    return
  }

  if (
    jutsu.includes('susanoo') ||
    jutsu.includes('tailed beast bomb')
  ) {
    chakraSound()
    return
  }

  if (
    jutsu.includes('sand') ||
    jutsu.includes('desert')
  ) {
    earthSound()
    return
  }

  if (
    jutsu.includes('wood') ||
    jutsu.includes('forest')
  ) {
    woodSound()
    return
  }

  if (
    jutsu.includes('water') ||
    jutsu.includes('shark')
  ) {
    waterSound()
    return
  }

  if (
    jutsu.includes('fire') ||
    jutsu.includes('flame')
  ) {
    fireSound()
    return
  }

  switch (element) {
    case 'fire':
      fireSound()
      break

    case 'lightning':
      chidoriSound()
      break

    case 'wind':
      windSound()
      break

    case 'water':
      waterSound()
      break

    case 'earth':
      earthSound()
      break

    case 'wood':
      woodSound()
      break

    default:
      chakraSound()
  }
}

export function playBattleSound(
  name,
  value
) {
  switch (name) {
    case 'countdown':
      countdownSound(value)
      break

    case 'charging':
      chakraChargeSound()
      break

    case 'battle-start':
      battleStartSound()
      break

    case 'clash':
      clashSound()
      break

    case 'ultimate-clash':
      ultimateClashSound()
      break

    case 'final-impact':
      finalImpactSound()
      break

    case 'victory':
      victorySound()
      break

    case 'draw':
      drawSound()
      break

    case 'jutsu':
      playJutsuSound(value)
      break

    default:
      break
  }
}

export function stopBattleSounds() {
  activeSources.forEach(source => {
    try {
      source.stop()
    } catch {
      return
    }
  })

  activeSources.clear()
}

export function setBattleSoundVolume(volume) {
  const safeVolume = Math.min(
    1,
    Math.max(0, volume)
  )

  if (masterGain && audioContext) {
    masterGain.gain.setTargetAtTime(
      safeVolume,
      audioContext.currentTime,
      0.03
    )
  }
}

export function closeBattleAudio() {
  stopBattleSounds()

  const context = audioContext

  audioContext = null
  masterGain = null
  noiseBuffer = null

  if (
    context &&
    context.state !== 'closed'
  ) {
    context.close().catch(() => {})
  }
}
