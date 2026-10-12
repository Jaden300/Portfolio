// Tiny move sounds made in the browser with the Web Audio API, so there are no audio files to download or license
let ctx = null

function audio() {
  if (!ctx) {
    const C = window.AudioContext || window.webkitAudioContext
    if (!C) return null
    ctx = new C()
  }
  if (ctx.state === "suspended") ctx.resume()
  return ctx
}

// A short burst of filtered noise: the "tap" of a piece on a wooden board
function tap(a, t, { dur = 0.05, gain = 0.5, freq = 1000 } = {}) {
  const len = Math.floor(a.sampleRate * dur)
  const buf = a.createBuffer(1, len, a.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3)
  const src = a.createBufferSource(); src.buffer = buf
  const f = a.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = freq; f.Q.value = 0.9
  const g = a.createGain(); g.gain.value = gain
  src.connect(f); f.connect(g); g.connect(a.destination)
  src.start(t)
}

// A quick falling sine, the wood's low thump
function thump(a, t, { freq = 150, dur = 0.09, gain = 0.45 } = {}) {
  const o = a.createOscillator(); o.type = "sine"
  o.frequency.setValueAtTime(freq, t); o.frequency.exponentialRampToValueAtTime(freq * 0.5, t + dur)
  const g = a.createGain(); g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur)
  o.connect(g); g.connect(a.destination)
  o.start(t); o.stop(t + dur)
}

function note(a, t, freq, dur = 0.14, gain = 0.18) {
  const o = a.createOscillator(); o.type = "triangle"; o.frequency.value = freq
  const g = a.createGain(); g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur)
  o.connect(g); g.connect(a.destination)
  o.start(t); o.stop(t + dur)
}

export function playSound(kind) {
  const a = audio()
  if (!a) return
  const t = a.currentTime
  if (kind === "capture") {
    tap(a, t, { dur: 0.07, gain: 0.8, freq: 800 }); thump(a, t, { freq: 120, gain: 0.6 }); tap(a, t + 0.05, { dur: 0.04, gain: 0.4, freq: 1400 })
  } else if (kind === "check") {
    tap(a, t, { gain: 0.5 }); thump(a, t); note(a, t + 0.06, 740); note(a, t + 0.16, 988)
  } else if (kind === "end") {
    tap(a, t, { gain: 0.5 }); thump(a, t); note(a, t + 0.1, 523); note(a, t + 0.24, 659); note(a, t + 0.38, 784, 0.3)
  } else if (kind === "start") {
    // Pieces being set down, then a rising two-note chime
    tap(a, t, { gain: 0.45 }); thump(a, t, { freq: 130 }); tap(a, t + 0.07, { gain: 0.4, freq: 900 }); thump(a, t + 0.07, { freq: 170 })
    note(a, t + 0.18, 587, 0.18, 0.16); note(a, t + 0.3, 784, 0.26, 0.16)
  } else {
    tap(a, t, { gain: 0.5 }); thump(a, t)
  }
}
