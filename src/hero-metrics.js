export function mountHeroMetrics(hero) {
  if (!hero) return () => {}

  const sides = [...hero.querySelectorAll('.metrics')]
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return () => {}

  const rows = sides.flatMap((side) => [...side.querySelectorAll('.metric')].map((metric) => {
    const value = metric.querySelector('.metric-value')
    const original = value.textContent.trim()
    const target = Number(original.replace(/[^0-9]/g, ''))
    const suffix = original.replace(/[0-9,]/g, '')
    value.textContent = `0${suffix}`
    return { side, metric, value, original, target, suffix }
  }))
  const timers = new Set()
  const frames = new Set()
  sides.forEach((side) => side.classList.add('is-metric-motion-ready'))

  function schedule(callback, delay) {
    const timer = window.setTimeout(() => {
      timers.delete(timer)
      callback()
    }, delay)
    timers.add(timer)
  }

  function reveal({ metric, value, target, suffix }) {
    metric.classList.add('is-visible')
    let startedAt = 0
    let frameId = 0
    const duration = 1350
    const step = (now) => {
      frames.delete(frameId)
      if (!startedAt) startedAt = now
      const progress = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      value.textContent = `${Math.round(target * eased).toLocaleString('en-US')}${suffix}`
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
    const sequence = [rows[0], rows[2], rows[1], rows[3]].filter(Boolean)
    sequence.forEach((row, index) => schedule(() => reveal(row), 1050 + index * 160))
    sides.forEach((side) => schedule(() => side.querySelector('.metric-divider')?.classList.add('is-visible'), 1400))
  }, { threshold: 0.2 })
  observer.observe(hero)

  return () => {
    observer.disconnect()
    timers.forEach((timer) => window.clearTimeout(timer))
    frames.forEach((frame) => window.cancelAnimationFrame(frame))
    sides.forEach((side) => {
      side.classList.remove('is-metric-motion-ready')
      side.querySelector('.metric-divider')?.classList.remove('is-visible')
    })
    rows.forEach(({ metric, value, original }) => {
      metric.classList.remove('is-visible')
      value.textContent = original
    })
  }
}
