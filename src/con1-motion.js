export function mountCon1Motion(section) {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
  if (reducedMotion.matches) return () => {}

  const value = section.querySelector('.con1-hud-value')
  const effect = section.querySelector('.con1-effect')
  const effectLabel = effect.querySelector('.con1-effect-label')
  const effectBody = effect.querySelector('p:last-child')
  const effectLabelText = effectLabel.textContent
  const effectBodyHtml = effectBody.innerHTML
  const effectBodyText = [...effectBody.childNodes].map((node) => node.nodeName === 'BR' ? '\n' : node.textContent).join('')
  const stages = [
    { anchor: section.querySelector('.con1-intro h2'), className: 'is-title-active' },
    { anchor: section.querySelector('.con1-hud-label'), className: 'is-hud-active' },
    { anchor: section.querySelector('.con1-micro-indicator'), className: 'is-micro-active' },
    { anchor: section.querySelector('.con1-plus-tr'), className: 'is-plus-active' },
    { anchor: effect, className: 'is-effect-active' },
    { anchor: section.querySelector('.con1-formula'), className: 'is-formula-active' },
  ]
  let scrollFrame = 0
  let countFrame = 0
  let typeFrame = 0
  let stopped = false
  const startedStages = new Set()

  value.textContent = '0%'
  effectLabel.style.minHeight = `${effectLabel.getBoundingClientRect().height}px`
  effectBody.style.minHeight = `${effectBody.getBoundingClientRect().height}px`
  effectLabel.setAttribute('aria-label', effectLabelText)
  effectBody.setAttribute('aria-label', effectBodyText.replace('\n', ' '))
  effectLabel.textContent = ''
  effectBody.textContent = ''
  section.classList.add('is-motion-ready')

  function restoreEffect() {
    effectLabel.textContent = effectLabelText
    effectBody.innerHTML = effectBodyHtml
    effectLabel.removeAttribute('aria-label')
    effectBody.removeAttribute('aria-label')
    effectLabel.style.minHeight = ''
    effectBody.style.minHeight = ''
  }

  function typeEffect() {
    const start = performance.now()
    const labelLength = effectLabelText.length
    const fullLength = labelLength + effectBodyText.length
    function tick(now) {
      const count = Math.min(fullLength, Math.floor((now - start) / 22))
      effectLabel.textContent = effectLabelText.slice(0, Math.min(count, labelLength))
      effectBody.textContent = effectBodyText.slice(0, Math.max(0, count - labelLength))
      if (count < fullLength) typeFrame = requestAnimationFrame(tick)
      else restoreEffect()
    }
    typeFrame = requestAnimationFrame(tick)
  }

  function countUp() {
    const start = performance.now()
    function tick(now) {
      const progress = Math.min(1, (now - start) / 700)
      value.textContent = `${Math.round((1 - Math.pow(1 - progress, 3)) * 100)}%`
      if (progress < 1) countFrame = requestAnimationFrame(tick)
    }
    countFrame = requestAnimationFrame(tick)
  }

  function checkStage() {
    scrollFrame = 0
    if (stopped) return
    const triggerLine = window.innerHeight * .92
    for (const stage of stages) {
      if (startedStages.has(stage.className)) continue
      if (stage.anchor.getBoundingClientRect().top > triggerLine) continue
      section.classList.add(stage.className)
      startedStages.add(stage.className)
      if (stage.className === 'is-hud-active') countUp()
      if (stage.className === 'is-effect-active') typeEffect()
    }
  }

  function schedule() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(checkStage)
  }

  function dispose() {
    stopped = true
    cancelAnimationFrame(scrollFrame)
    cancelAnimationFrame(countFrame)
    cancelAnimationFrame(typeFrame)
    restoreEffect()
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    reducedMotion.removeEventListener('change', onMotionChange)
  }

  function onMotionChange() {
    if (!reducedMotion.matches) return
    dispose()
    value.textContent = '100%'
    section.classList.remove('is-motion-ready')
  }

  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  reducedMotion.addEventListener('change', onMotionChange)
  schedule()
  return dispose
}
