export function mountCon3Motion(section) {
  if (!section) return () => {}

  const huds = [...section.querySelectorAll('.con3-hud')]
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  if (reducedMotion.matches || !('IntersectionObserver' in window)) return () => {}

  const ring = section.querySelector('.con3-hud-ring')
  const ringValue = ring?.querySelector('span')
  const timers = new Set()
  let ringFrame = 0
  if (ring && ringValue) {
    ring.style.setProperty('--ring-progress', '0%')
    ringValue.textContent = '0%'
  }

  function animateRing() {
    if (!ring || !ringValue) return
    const duration = 1200
    let startedAt = 0
    const frame = (now) => {
      if (!startedAt) startedAt = now
      const elapsed = Math.min((now - startedAt) / duration, 1)
      const progress = 1 - (1 - elapsed) ** 3
      const value = Math.round(progress * 100)
      ring.style.setProperty('--ring-progress', `${progress * 100}%`)
      ringValue.textContent = `${value}%`
      if (elapsed < 1) ringFrame = window.requestAnimationFrame(frame)
    }
    ringFrame = window.requestAnimationFrame(frame)
  }

  function schedule(callback, delay) {
    const timer = window.setTimeout(() => {
      timers.delete(timer)
      callback()
    }, delay)
    timers.add(timer)
  }

  section.classList.add('is-motion-ready')

  const observer = new IntersectionObserver((entries) => {
    entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => huds.indexOf(a.target) - huds.indexOf(b.target))
      .forEach((entry, index) => {
        const hud = entry.target
        schedule(() => {
          hud.classList.add('is-visible')
          if (hud.contains(ring)) schedule(animateRing, 240)
        }, index * 130)
        observer.unobserve(hud)
      })
  }, { rootMargin: '0px 0px -18% 0px', threshold: 0 })

  huds.forEach((hud) => observer.observe(hud))

  return () => {
    observer.disconnect()
    timers.forEach((timer) => window.clearTimeout(timer))
    window.cancelAnimationFrame(ringFrame)
    section.classList.remove('is-motion-ready')
    ring?.style.removeProperty('--ring-progress')
    if (ringValue) ringValue.textContent = '100%'
  }
}
