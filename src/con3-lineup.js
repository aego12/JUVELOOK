export function mountCon3Lineup(section) {
  if (!section) return () => {}

  const lineup = section.querySelector('.con3-lineup')
  const heading = section.querySelector('.con3-lineup-heading')
  const group = section.querySelector('.con3-product-group')
  if (!lineup || !heading) return () => {}

  const setExpanded = (expanded) => {
    section.classList.toggle('is-lineup-expanded', expanded)
    heading.setAttribute('aria-pressed', String(expanded))
    group?.setAttribute('aria-hidden', String(!expanded))
  }
  const expand = (event) => {
    if (event.pointerType === 'touch') return
    setExpanded(true)
  }
  const trackPointer = (event) => {
    if (!section.classList.contains('is-lineup-expanded')) return
    const bounds = section.getBoundingClientRect()
    if (event.clientX < bounds.left + bounds.width * (578 / 1920)) setExpanded(false)
  }
  const toggleWithKeyboard = (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    setExpanded(!section.classList.contains('is-lineup-expanded'))
  }
  const closeWithKeyboard = (event) => {
    if (event.key === 'Escape') setExpanded(false)
  }
  const clickHeading = (event) => {
    if (event.pointerType === 'mouse') setExpanded(true)
    else setExpanded(!section.classList.contains('is-lineup-expanded'))
  }
  const leaveSection = () => setExpanded(false)

  lineup.addEventListener('pointerenter', expand)
  heading.addEventListener('pointerenter', expand)
  heading.addEventListener('click', clickHeading)
  heading.addEventListener('keydown', toggleWithKeyboard)
  section.addEventListener('keydown', closeWithKeyboard)
  section.addEventListener('pointermove', trackPointer)
  section.addEventListener('pointerleave', leaveSection)

  return () => {
    lineup.removeEventListener('pointerenter', expand)
    heading.removeEventListener('pointerenter', expand)
    heading.removeEventListener('click', clickHeading)
    heading.removeEventListener('keydown', toggleWithKeyboard)
    section.removeEventListener('keydown', closeWithKeyboard)
    section.removeEventListener('pointermove', trackPointer)
    section.removeEventListener('pointerleave', leaveSection)
    setExpanded(false)
  }
}
