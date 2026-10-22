export function mountCon4Stats(section) {
  if (!section) return () => {}

  const stats = [...section.querySelectorAll('.con4-stat')]
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return () => {}

  const values = stats.map((stat) => {
    const label = stat.querySelector('p')
    const original = label.textContent.trim()
    const target = Number(original.replace(/[^0-9]/g, ''))
    const suffix = original.endsWith('+') ? '+' : ''
    label.textContent = `0${suffix}`
    return { stat, label, original, target, suffix }
  })
  const timers = new Set()
  const frames = new Set()
  section.classList.add('is-stat-motion-ready')

  function animate({ stat, label, target, suffix }) {
    stat.classList.add('is-visible')
    let startedAt = 0
    let frameId = 0
    const duration = 1350
    const step = (now) => {
      frames.delete(frameId)
      if (!startedAt) startedAt = now
      const progress = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      label.textContent = `${Math.round(target * eased).toLocaleString('en-US')}${suffix}`
      if (progress < 1) {
        frameId = window.requestAnimationFrame(step)
        frames.add(frameId)
      }
    }
    frameId = window.requestAnimationFrame(step)
    frames.add(frameId)
  }

  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    observer.disconnect()
    values.forEach((value, index) => {
      const timer = window.setTimeout(() => {
        timers.delete(timer)
        animate(value)
      }, index * 140)
      timers.add(timer)
    })
  }, { threshold: 0.3 })
  observer.observe(section)

  return () => {
    observer.disconnect()
    timers.forEach((timer) => window.clearTimeout(timer))
    frames.forEach((frame) => window.cancelAnimationFrame(frame))
    section.classList.remove('is-stat-motion-ready')
    values.forEach(({ stat, label, original }) => {
      stat.classList.remove('is-visible')
      label.textContent = original
    })
  }
}
