// Native scrolling supplies progress while sticky positioning holds the hero.
// No wheel interception: keyboard, touch, scrollbar and reverse scrolling work.
export function mountHeroScroll(host, object, application) {
  const section = host.closest('.hero-scroll-section')
  const stage = section.querySelector('.hero-sticky')
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
  const initialX = object.rotation.x
  const initialY = object.rotation.y
  let frame = 0
  let start = 0
  let distance = 1
  let travel = 0

  function draw() {
    frame = 0
    const progress = reducedMotion.matches
      ? 1
      : Math.min(1, Math.max(0, (window.scrollY - start) / distance))
    const eased = progress * progress * (3 - 2 * progress)
    host.style.setProperty('--metal-travel-y', `${travel * eased}px`)
    object.rotation.y = initialY + eased * Math.PI
    object.rotation.x = initialX + eased * Math.PI / 6
    application.requestRender()
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(draw)
  }
  function measure() {
    section.classList.toggle('is-scroll-ready', !reducedMotion.matches)
    start = section.getBoundingClientRect().top + window.scrollY
    distance = Math.max(1, section.offsetHeight - stage.offsetHeight)
    // Initial frame straddles the boundary. Destination is y=71 in a
    // 1011px-high hero, keeping its position proportional on smaller screens.
    const initialTop = stage.offsetHeight + parseFloat(getComputedStyle(host).top)
    const destinationTop = stage.offsetHeight * 71 / 1011
    travel = destinationTop - initialTop
    schedule()
  }
  const observer = new ResizeObserver(measure)
  observer.observe(stage)
  observer.observe(host)
  window.addEventListener('scroll', schedule, { passive: true })
  reducedMotion.addEventListener('change', measure)
  measure()

  return () => {
    cancelAnimationFrame(frame)
    observer.disconnect()
    window.removeEventListener('scroll', schedule)
    reducedMotion.removeEventListener('change', measure)
    section.classList.remove('is-scroll-ready')
    host.style.removeProperty('--metal-travel-y')
    object.rotation.x = initialX
    object.rotation.y = initialY
  }
}
