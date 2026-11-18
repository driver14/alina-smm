/**
 * Luxury Micro-Haptics & Tactile Sound Synthesizer.
 * Synthesizes ultra-short, warm, mechanical clicks via Web Audio API.
 * Zero external audio assets, 0ms latency, native mobile Vibration API support.
 */

class HapticsController {
  private audioCtx: AudioContext | null = null
  private isEnabled = true

  constructor() {
    // Check if user previously disabled sound
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('alina_haptics_enabled')
      if (stored !== null) {
        this.isEnabled = stored === 'true'
      }
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass()
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {})
    }
    return this.audioCtx
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled
    if (typeof window !== 'undefined') {
      localStorage.setItem('alina_haptics_enabled', String(enabled))
    }
  }

  public getEnabled(): boolean {
    return this.isEnabled
  }

  /**
   * Subtle mechanical tactile click (like Leica shutter / iPhone Taptic)
   * Ideal for button presses, language switch, interactive pills.
   */
  public click() {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(10)
      } catch {
        // Ignore
      }
    }

    if (!this.isEnabled) return
    const ctx = this.getAudioContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(1200, now)
      filter.frequency.exponentialRampToValueAtTime(200, now + 0.016)

      osc.type = 'sine'
      osc.frequency.setValueAtTime(280, now)
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.015)

      // Very subtle, quiet volume
      gain.gain.setValueAtTime(0.045, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.016)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.017)
    } catch {
      // Audio play error ignored
    }
  }

  /**
   * Silky page/slide tick
   * Ideal for switching case gallery slides or light swipe feedback.
   */
  public slide() {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(8)
      } catch {
        // Ignore
      }
    }

    if (!this.isEnabled) return
    const ctx = this.getAudioContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(800, now)
      filter.Q.setValueAtTime(3, now)

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(420, now)
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.02)

      gain.gain.setValueAtTime(0.035, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.023)
    } catch {
      // Ignore
    }
  }

  /**
   * Harmonic gentle success chime
   * Ideal for form submit and successful action confirmation.
   */
  public success() {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([12, 40, 18])
      } catch {
        // Ignore
      }
    }

    if (!this.isEnabled) return
    const ctx = this.getAudioContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const notes = [523.25, 659.25] // C5 and E5

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.06)

        gain.gain.setValueAtTime(0.04, now + idx * 0.06)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.14)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now + idx * 0.06)
        osc.stop(now + idx * 0.06 + 0.15)
      })
    } catch {
      // Ignore
    }
  }
}

export const haptics = new HapticsController()

export function triggerHaptic(type: 'light' | 'medium' | 'success' = 'light') {
  if (type === 'success') {
    haptics.success()
  } else if (type === 'medium') {
    haptics.click()
  } else {
    haptics.slide()
  }
}
