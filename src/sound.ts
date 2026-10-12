const KEY = 'africa-quiz-sound'

export const isSoundOn = (): boolean => {
  try {
    return localStorage.getItem(KEY) !== 'off'
  } catch {
    return true
  }
}

export const setSoundOn = (on: boolean): void => {
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off')
  } catch {
    /* ignore */
  }
}

let ctx: AudioContext | null = null

function audio(): AudioContext | null {
  try {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!ctx) ctx = new AC()
    if (ctx.state === 'suspended') void ctx.resume()
    return ctx
  } catch {
    return null
  }
}

function note(freq: number, start: number, dur: number, type: OscillatorType = 'sine', vol = 0.12): void {
  if (!isSoundOn()) return
  const a = audio()
  if (!a) return
  const t0 = a.currentTime + start
  const osc = a.createOscillator()
  const gain = a.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  gain.gain.setValueAtTime(0.0001, t0)
  gain.gain.linearRampToValueAtTime(vol, t0 + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(gain).connect(a.destination)
  osc.start(t0)
  osc.stop(t0 + dur + 0.05)
}

export const sfx = {
  click: () => note(640, 0, 0.08, 'triangle', 0.07),
  correct: () => {
    note(523.25, 0, 0.14, 'triangle', 0.12)
    note(659.25, 0.1, 0.14, 'triangle', 0.12)
    note(783.99, 0.2, 0.24, 'triangle', 0.12)
  },
  wrong: () => {
    note(196, 0, 0.22, 'sawtooth', 0.06)
    note(147, 0.12, 0.3, 'sawtooth', 0.06)
  },
  start: () => {
    note(392, 0, 0.1, 'triangle', 0.1)
    note(523.25, 0.09, 0.18, 'triangle', 0.1)
  },
  finish: () => {
    ;[523.25, 659.25, 783.99, 1046.5].forEach((f, i) => note(f, i * 0.11, 0.26, 'triangle', 0.11))
  },
}
