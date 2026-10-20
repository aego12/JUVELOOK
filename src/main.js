import './style.css'
import { mountHeroMetal } from './hero-metal.js'

const app = document.querySelector('#app')

const metric = (value, label) => `
  <div class="metric">
    <p class="metric-value">${value}</p>
    <a class="metric-label" href="#about">${label}<img src="/assets/go.svg" alt="" /></a>
  </div>
`

app.innerHTML = `
  <main class="page-shell">
    <div class="hero-scroll-section">
    <div class="hero-sticky">
    <header class="site-header" data-node-id="228:7436">
      <a class="site-logo" href="#home" aria-label="JUVELOOK home">JUVELOOK®</a>
      <nav class="site-nav" aria-label="Main navigation">
        <a href="#juvelook">Juvelook</a>
        <a href="#technology">Technology</a>
        <a href="#media">Media</a>
        <a href="#contact">Contact Us</a>
        <a href="#julia-academy">JULIA Academy</a>
      </nav>
    </header>
    <section class="hero" aria-label="JUVELOOK">
      <div class="hero-title" aria-label="JUVE LOOK">
        <div class="title-row title-row-top">
          <h1>JUVE</h1>
          <p class="title-note">A Bio-Interactive PDLLA-HA Stimulator</p>
        </div>
        <div class="title-row title-row-bottom">
          <p class="title-note">Advanced Care for Radiant Skin</p>
          <h1>LOOK.</h1>
        </div>
      </div>

      <aside class="metrics metrics-left" aria-label="Global presence">
        ${metric('30+', 'GLOBAL COUNTRIES')}
        <img class="metric-divider" src="/assets/line.svg" alt="" />
        ${metric('1,200+', 'CLINICS')}
      </aside>

      <aside class="metrics metrics-right" aria-label="Awards and growth">
        <div class="metric">
          <p class="metric-value">2022</p>
          <a class="metric-label" href="#awards">CONSUMER AWARD<img src="/assets/go.svg" alt="" /></a>
        </div>
        <img class="metric-divider" src="/assets/line.svg" alt="" />
        <div class="metric">
          <p class="metric-value">5×</p>
          <a class="metric-label" href="#growth">GROWTH<img src="/assets/go.svg" alt="" /></a>
        </div>
      </aside>
    </section>

    <div class="hero-metal-transition">
      <div class="hero-image-box" data-node-id="409:2231" role="img" aria-label="Glass knot vortex 3D sculpture"></div>
    </div>
    </div>
    </div>

    <section class="video-section" id="technology" aria-label="Technology and beauty video" data-node-id="228:7403">
      <div class="video-backdrop" aria-hidden="true"></div>
      <div class="video-tint" aria-hidden="true"></div>
      <div class="video-box">
        <img class="video-poster" src="/assets/video-poster-1.png" alt="JUVELOOK video poster" />
        <img class="video-corner corner-top-left" src="/assets/plus.svg" alt="" />
        <img class="video-corner corner-top-right" src="/assets/plus.svg" alt="" />
        <img class="video-corner corner-bottom-left" src="/assets/plus.svg" alt="" />
        <img class="video-corner corner-bottom-right" src="/assets/plus.svg" alt="" />
      </div>
      <p class="video-caption">Technology &times; Beauty</p>
    </section>
  </main>

`

const disposeHeroMetal = mountHeroMetal(document.querySelector('.hero-image-box'))
if (import.meta.hot) import.meta.hot.dispose(disposeHeroMetal)
