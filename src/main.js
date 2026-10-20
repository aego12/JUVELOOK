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

    <section class="con1" aria-label="JUVELOOK Volume introduction" data-node-id="228:7347">
      <div class="con1-inner">
        <div class="con1-top-panel" aria-hidden="true"></div>

        <div class="con1-intro" data-node-id="228:7359">
          <p class="con1-lead">Juvelook is a scientific approach<br />to skin rejuvenation providing<br />safe and effective you can trust.</p>
          <h2>JUVELOOK<br />Volume</h2>
        </div>

        <p class="con1-technology" data-node-id="228:7375">VAIM’s key technology revolves around the creation of PDLLA microparticles.<br />Aqueous PDLLA solution is sprayed into a cold vat to produce our unique porous &amp; reticular microparticles.</p>

        <div class="con1-bottle-stage" data-node-id="228:7349">
          <img class="con1-orbit" src="/assets/con1-circle.svg" alt="" />
          <div class="con1-bottle-wrap"><img class="con1-bottle" src="/assets/con1-bottle.png" alt="JUVELOOK Volume bottle, 200 mg per vial" /></div>
          <img class="con1-plus con1-plus-tl" src="/assets/con1-plus.svg" alt="" />
          <img class="con1-plus con1-plus-tr" src="/assets/con1-plus.svg" alt="" />
          <img class="con1-plus con1-plus-bl" src="/assets/con1-plus.svg" alt="" />
          <img class="con1-plus con1-plus-br" src="/assets/con1-plus.svg" alt="" />
          <img class="con1-marker-line con1-marker-top" src="/assets/con1-line-1.svg" alt="" />
          <img class="con1-marker-line con1-marker-bottom" src="/assets/con1-line.svg" alt="" />
        </div>

        <div class="con1-hud-label" data-node-id="267:2680">
          <span><span class="con1-n">N.</span> <span class="con1-percent">%</span></span>
          <span class="con1-dots" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>
          <span>100%</span>
        </div>

        <figure class="con1-microparticle" data-node-id="228:7366">
          <img src="/assets/con1-image-box-1.svg" alt="Microparticles viewed under magnification" />
          <img class="con1-micro-indicator" src="/assets/con1-icon-circle.svg" alt="" />
          <img class="con1-micro-return" src="/assets/con1-arrow.svg" alt="" />
        </figure>

        <div class="con1-effect" data-node-id="228:7362">
          <p class="con1-effect-label">Effect of JUVELOOK</p>
          <p>Induces the skin’s own collagen production to improve overall skin structure.<br />JUVELOOK promotes collagen production slowly and naturally from within the skin.</p>
        </div>

        <div class="con1-formula" data-node-id="228:7364">
          <p>PDLLA 170mg<br />+ HA 30mg</p>
          <img src="/assets/con1-detail.svg" alt="" />
        </div>

        <img class="con1-callout con1-callout-left" src="/assets/con1-line-3.svg" alt="" />
        <img class="con1-callout con1-callout-bottom" src="/assets/con1-line-2.svg" alt="" />
        <figure class="con1-molecule" data-node-id="228:7356"><img src="/assets/con1-image-box.svg" alt="Metallic molecular structure illustration" /></figure>
      </div>
    </section>
  </main>

`

const disposeHeroMetal = mountHeroMetal(document.querySelector('.hero-image-box'))
if (import.meta.hot) import.meta.hot.dispose(disposeHeroMetal)
