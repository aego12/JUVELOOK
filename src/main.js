import './style.css'

const app = document.querySelector('#app')

const metric = (value, label) => `
  <div class="metric">
    <p class="metric-value">${value}</p>
    <a class="metric-label" href="#about">${label}<img src="/assets/go.svg" alt="" /></a>
  </div>
`

app.innerHTML = `
  <main class="page-shell">
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
  </main>
`
