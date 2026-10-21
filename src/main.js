import './style.css'
import { mountHeroMetal } from './hero-metal.js'

const app = document.querySelector('#app')

const metric = (value, label) => `
  <div class="metric">
    <p class="metric-value">${value}</p>
    <a class="metric-label" href="#about">${label}<img src="/assets/go.svg" alt="" /></a>
  </div>
`

const con3Corners = `
  <span class="con3-corner con3-corner-tl"><img src="/assets/con3-box-corner.svg" alt="" /></span>
  <span class="con3-corner con3-corner-tr"><img src="/assets/con3-box-corner.svg" alt="" /></span>
  <span class="con3-corner con3-corner-bl"><img src="/assets/con3-box-corner.svg" alt="" /></span>
  <span class="con3-corner con3-corner-br"><img src="/assets/con3-box-corner.svg" alt="" /></span>
`

const con3Products = [
  ['con3-image-a.svg', 'JUVELOOK', 'PDLLA 42.5mg + HA 7.5mg'],
  ['con3-image-b.svg', 'JUVELOOK Volume', 'PDLLA 170mg + HA 30mg'],
  ['con3-image-c.svg', 'JUVELOOK i', 'PDLLA 25.5mg + HA 4.5mg'],
  ['con3-image-d.svg', 'JUVELOOK Skin', 'PDLLA 25.5mg + HA 4.5mg'],
  ['con3-image-e.svg', 'JUVELOOK G', 'PDLLA 170mg + HA 30mg'],
].map(([image, name, formula]) => `
  <article class="con3-product">
    <div class="con3-product-image"><img src="/assets/${image}" alt="${name} product vial" />
      <span class="con3-product-corner con3-product-corner-tl"><img src="/assets/con3-box-corner.svg" alt="" /></span>
      <span class="con3-product-corner con3-product-corner-tr"><img src="/assets/con3-box-corner.svg" alt="" /></span>
      <span class="con3-product-corner con3-product-corner-bl"><img src="/assets/con3-box-corner.svg" alt="" /></span>
      <span class="con3-product-corner con3-product-corner-br"><img src="/assets/con3-box-corner.svg" alt="" /></span>
    </div>
    <div class="con3-product-caption"><p>${name}</p><p>${formula}</p></div>
  </article>
`).join('')

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
        <video class="video-poster" autoplay muted loop playsinline preload="metadata" poster="/assets/video-poster-1.png" aria-label="JUVELOOK hero video">
          <source src="/assets/juvelook-hero.mp4" type="video/mp4" />
        </video>
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
          <span class="con1-micro-indicator" data-node-id="228:7401" aria-hidden="true"><img src="/assets/con1-hud.svg" alt="" /></span>
          <span class="con1-micro-return" aria-hidden="true" data-node-id="228:7382"><img src="/assets/con1-arrow.svg" alt="" /></span>
        </figure>
        <img class="con1-technology-mark" src="/assets/con1-icon-circle.svg" alt="" data-node-id="228:7376" />

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

    <section class="con2" aria-label="JUVELOOK Guide Table" data-node-id="228:7318">
      <div class="con2-inner">
        <p class="con2-title" data-node-id="228:7340">JUVELOOK<br />Guide Table</p>

        <div class="con2-labels" aria-hidden="true">
          <span class="con2-label con2-wrinkles">wrinkles</span>
          <span class="con2-label con2-fine-lines">fine lines</span>
          <span class="con2-label con2-skin-elasticity">skin elasticity</span>
          <span class="con2-label con2-large-pores">large pores</span>
          <span class="con2-label con2-acne-scars">acne scars</span>
          <span class="con2-label con2-skin-texture">skin texture</span>
          <span class="con2-label con2-skin-rejuvenation">skin rejuvenation</span>
        </div>

        <div class="con2-circle" aria-hidden="true">
          <div class="con2-curve con2-curve-a"><img src="/assets/con2-ellipse-a.svg" alt="" /></div>
          <div class="con2-curve con2-curve-b"><img src="/assets/con2-ellipse-b.svg" alt="" /></div>
          <i class="con2-point con2-point-1"></i>
          <i class="con2-point con2-point-2"></i>
          <i class="con2-point con2-point-3"></i>
          <i class="con2-point con2-point-4"></i>
          <i class="con2-point con2-point-5"></i>
          <i class="con2-point con2-point-6"></i>
          <i class="con2-point con2-point-7"></i>
        </div>

        <p class="con2-value" aria-label="85 percent PDLLA"><span class="con2-value-number">85</span><span class="con2-value-percent">%</span><span class="con2-value-space"> </span><span class="con2-value-name">PDLLA</span></p>
        <span class="con2-trademark" aria-hidden="true">™</span>

        <div class="con2-message" data-node-id="228:7341">
          <p>Safe. Naturally You. Long-Lasting.</p>
          <img class="con2-plus con2-plus-tl" src="/assets/con1-plus.svg" alt="" />
          <img class="con2-plus con2-plus-tr" src="/assets/con1-plus.svg" alt="" />
          <img class="con2-plus con2-plus-bl" src="/assets/con1-plus.svg" alt="" />
          <img class="con2-plus con2-plus-br" src="/assets/con1-plus.svg" alt="" />
        </div>
      </div>
    </section>

    <section class="con3" aria-label="Technology and product lineup" data-node-id="300:7635">
      <div class="con3-inner">
        <h2 class="con3-heading" data-node-id="300:7636">Technology</h2>
        <p class="con3-lineup-heading" data-node-id="300:7637">Line up</p>
        <div class="con3-intro" data-node-id="300:7638">
          <p data-node-id="300:7639">AIM’s core technology creates PDLLA microparticles.<br /> It powers JUVELOOK’s rejuvenation effects.</p>
          <div class="con3-all" data-node-id="300:7640"><span>all</span><span class="con3-all-arrow"><img src="/assets/con3-arrow.svg" alt="" /></span></div>
        </div>
        <span class="con3-divider" aria-hidden="true"><img src="/assets/con3-main-line.svg" alt="" /></span>

        <aside class="con3-lineup" aria-label="JUVELOOK product lineup" data-node-id="300:7645">
          ${con3Products}
        </aside>

        <div class="con3-top-mini" data-node-id="300:7651">
          <span>Technology</span>
          <span class="con3-mini-divider"><img src="/assets/con3-line-a.svg" alt="" /></span>
          <span>Line up</span>
          <span class="con3-mini-rule"><img src="/assets/con3-line-b.svg" alt="" /></span>
        </div>

        <div class="con3-gallery" data-node-id="300:7656">
          <article class="con3-gallery-card con3-structure-card" data-node-id="300:7657">
            <div class="con3-gallery-image con3-structure-image"><span class="con3-photo-crop"><img src="/assets/con3-naturally-derived.svg" alt="Microparticle structure" /></span>${con3Corners}</div>
            <div class="con3-gallery-caption"><p>PDLLA + HA Composite</p><p>Precision-engineered PDLLA microparticles</p></div>
          </article>

          <article class="con3-gallery-card con3-spherical-card" data-node-id="300:7712">
            <div class="con3-gallery-image con3-spherical-image"><span class="con3-photo-crop"><img src="/assets/con3-porous.png" alt="Spherical microparticle" /></span>${con3Corners}</div>
            <div class="con3-gallery-caption"><p>Spherical</p></div>
          </article>

          <article class="con3-gallery-card con3-porous-card" data-node-id="300:7665">
            <div class="con3-gallery-image con3-porous-image"><span class="con3-photo-crop"><img src="/assets/con3-corn-source.png" alt="Porous PDLLA microparticle" /></span>${con3Corners}</div>
            <div class="con3-gallery-caption"><p>Porous&nbsp;&nbsp; High mechanical stability</p></div>
          </article>

          <article class="con3-gallery-card con3-network-card" data-node-id="300:7701">
            <div class="con3-gallery-image con3-network-image"><span class="con3-photo-crop"><img src="/assets/con3-spherical.png" alt="PDLLA molecular network" /></span>${con3Corners}</div>
          </article>

          <article class="con3-gallery-card con3-corn-card" data-node-id="300:7676">
            <div class="con3-gallery-image con3-corn-image"><span class="con3-photo-crop"><img src="/assets/con3-pdllaha.png" alt="Naturally derived corn starch material" /></span>${con3Corners}</div>
            <div class="con3-gallery-caption"><p>100% Naturally Derived</p><p>Made from corn starch</p></div>
          </article>

          <article class="con3-gallery-card con3-adhesion-card" data-node-id="300:7687">
            <div class="con3-gallery-image con3-adhesion-image"><span class="con3-photo-crop"><img src="/assets/con3-cell-adhesion.png" alt="Cell adhesion structure" /></span>${con3Corners}</div>
            <div class="con3-gallery-caption"><p>Improved Cell Adhesion</p><p>Active cell integration and stable pH balance</p></div>
          </article>
        </div>
      </div>
    </section>

    <section class="con4" id="about" aria-label="About JUVELOOK" data-node-id="300:8630">
      <div class="con4-inner">
        <div class="con4-vial-stage con4-vial-stage-small" data-node-id="300:8632"><div class="con4-vial-rotated"><img src="/assets/con4-vial-small.png" alt="" /></div></div>
        <div class="con4-vial-stage con4-vial-stage-large" data-node-id="300:8633"><div class="con4-vial-rotated"><img src="/assets/con4-vial-large.png" alt="" /></div></div>
        <h2 class="con4-heading" data-node-id="300:8636">ABOUT</h2>
        <p class="con4-copy" data-node-id="300:8637">JUVELOOK is an advanced collagen biostimulator designed to enhance skin quality.<br /> Its core technology combines precision-engineered PDLLA™ microparticles with HA.<br /> Spherical and porous particles are engineered with a controlled microstructure.</p>
        <a class="con4-more" href="#contact" data-node-id="300:8635"><span class="con4-more-label">More</span><span class="con4-button" data-node-id="300:8638"><img src="/assets/con4-arrow.svg" alt="" /></span></a>
        <div class="con4-stats" aria-label="JUVELOOK global impact">
          <div class="con4-stat con4-stat-countries" data-node-id="300:8641"><p>30+</p><span>Global Countries</span></div>
          <div class="con4-stat con4-stat-clinics" data-node-id="300:8644"><p>1,200+</p><span>Clinics</span></div>
          <div class="con4-stat con4-stat-award" data-node-id="300:8647"><p>2022</p><span>Award</span></div>
        </div>
      </div>
    </section>

    <footer class="site-footer" id="contact" data-node-id="228:7205">
      <div class="footer-inner">
        <div class="footer-column footer-office" data-node-id="228:7211">
          <h2>Office</h2>
          <div class="footer-details">
            <section><h3>Seoul Office</h3><p>502, Yeongdong-daero, Gangnam-gu,<br />Seoul, Republic of Korea (PO 06173)</p></section>
            <section><h3>Production, Research &amp; Development</h3><p>30, Techno 1-ro, Yuseong-gu, Daejeon,<br />Republic of Korea (PO 34016)</p></section>
          </div>
        </div>
        <div class="footer-column footer-navigation" data-node-id="228:7216">
          <h2>Navigation</h2>
          <div class="footer-details">
            <section><h3>Juvelook</h3><p>Juvelook | Juvelook Volume | Benefits | FAQ | Before &amp; After</p></section>
            <section><h3>Technology</h3><p>Technology</p></section>
            <section><h3>Media</h3><p>Conference | Newsletter | Clinical Studies</p></section>
            <section><h3>Contact Us</h3><p>Contact Us</p></section>
            <section><h3>JULIA Academy</h3><p>JULIA Academy</p></section>
          </div>
        </div>
        <div class="footer-column footer-legal" data-node-id="228:7224">
          <h2>Legal</h2>
          <div class="footer-details"><section><h3>Legal</h3><p>Copyright © JUVELOOK. All Rights Reserved.</p></section></div>
        </div>
        <div class="footer-column footer-brand" data-node-id="228:7228">
          <h2>Brand</h2>
          <p class="footer-brand-name">JUVELOOK®<br />For export only</p>
        </div>
        <p class="footer-follow">FOLLOW US</p>
        <nav class="footer-socials" aria-label="Social media" data-node-id="228:7232"><a href="#facebook">FACEBOOK</a><a href="#instagram">INSTAGRAM</a><a href="#x">X</a><a href="#behance">BEHANCE</a></nav>
        <form class="footer-newsletter" data-node-id="228:7237" action="#contact">
          <div class="footer-newsletter-prompt" data-node-id="228:7239"><label for="footer-email">Give an email, get the newsletter.</label><button type="submit" aria-label="Subscribe"><img src="/assets/footer-arrow.svg" alt="" /></button></div>
          <input id="footer-email" type="email" aria-label="Email address" />
          <img class="footer-email-line" src="/assets/footer-email-line.svg" alt="" />
          <img class="footer-plus footer-plus-tl" src="/assets/con1-plus.svg" alt="" />
          <img class="footer-plus footer-plus-tr" src="/assets/con1-plus.svg" alt="" />
          <img class="footer-plus footer-plus-bl" src="/assets/con1-plus.svg" alt="" />
          <img class="footer-plus footer-plus-br" src="/assets/con1-plus.svg" alt="" />
        </form>
      </div>
      <div class="footer-bottom" data-node-id="228:7206"><div class="footer-bottom-inner"><div class="footer-family" data-node-id="228:7207"><a href="#family-site">FAMILY SITE</a><img src="/assets/footer-family-line.svg" alt="" /><a href="#julia-academy">JULIA ACADEMY</a></div></div></div>
    </footer>
  </main>

`

const disposeHeroMetal = mountHeroMetal(document.querySelector('.hero-image-box'))
if (import.meta.hot) import.meta.hot.dispose(disposeHeroMetal)
