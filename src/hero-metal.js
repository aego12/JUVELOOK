import { mountHeroScroll } from './hero-scroll.js'

// Original scene bytes from the user's glassknotvortex public page.
const sceneUrl = '/assets/hero-glass-knot.splinecode'

export function mountHeroMetal(host) {
  const canvas = document.createElement('canvas')
  canvas.setAttribute('aria-hidden', 'true')
  host.append(canvas)
  const abort = new AbortController()
  let application
  let observer
  let disposeScroll
  let disposed = false

  async function load() {
    try {
      const { Application } = await import('@splinetool/runtime')
      const response = await fetch(sceneUrl, { signal: abort.signal })
      if (!response.ok) throw new Error(`Spline scene: ${response.status}`)
      const bytes = await response.arrayBuffer()
      if (disposed) return
      application = new Application(canvas, {
        renderMode: 'auto',
        renderer: 'webgl',
        htmlContentMode: 'none',
      })
      // Disable authored input events and camera interaction.
      await application.start(bytes, { interactive: false })
      if (disposed) return
      // This point light creates the violet reflections on the chrome knot.
      const reflectionLight = application.findObjectByName('Point Light')
      if (reflectionLight) reflectionLight.color = '#0061AE'
      const knot = application.findObjectByName('Torus Knot')
      // Deepen the dark reflections while preserving the original chrome image.
      const matcap = knot?.material?.layers?.find(layer => layer.type === 'matcap')
      if (matcap) matcap.alpha = 0.85
      // Brighter white specular reflections against the darker matcap.
      for (const name of ['Directional Light', 'Directional Light 2']) {
        const light = application.findObjectByName(name)
        if (light) light.intensity *= 3
      }
      if (knot) {
        const sphere = await application.createObject('Sphere', {
          name: 'Center Sphere',
          parent: knot,
          position: [0, 0, 0],
          scale: 0.55,
          material: {
            color: '#858B90',
            metalness: 0.2,
            roughness: 0.2,
            reflectivity: 0.2,
          },
        })
        // Reuse the knot's matcap reflection on the small center sphere.
        const sourceMatcap = knot.material.layers.find(layer => layer.type === 'matcap')
        if (sourceMatcap) sphere.material.layers.push({ ...sourceMatcap })
      }
      application.setBackgroundColor('rgba(255, 255, 255, 0)')
      application.setZoom(.85)
      const resize = () => {
        if (disposed || !host.clientWidth || !host.clientHeight) return
        application.setSize(host.clientWidth, host.clientHeight)
        application.requestRender()
      }
      observer = new ResizeObserver(resize)
      observer.observe(host)
      resize()
      host.classList.add('is-rendered')
      if (knot) disposeScroll = mountHeroScroll(host, knot, application)
    } catch (error) {
      if (disposed || error.name === 'AbortError') return
      application?.dispose()
      application = undefined
      canvas.remove()
      console.error('Unable to render the original Spline scene.', error)
    }
  }
  load()

  return () => {
    disposed = true
    abort.abort()
    observer?.disconnect()
    disposeScroll?.()
    application?.dispose()
    canvas.remove()
    host.classList.remove('is-rendered')
  }
}
