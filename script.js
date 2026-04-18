@import url("https://fonts.cdnfonts.com/css/pp-neue-montreal");

@font-face {
  font-family: "PPSupplyMono";
  src: url("https://assets.codepen.io/7558/PPSupplyMono-Regular.ttf")
    format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

:root {
  --font-mono: "PPSupplyMono", monospace;
  --font-sans: "PP Neue Montreal", sans-serif;
  --color-bg: #000;
  --color-bg-soft: #121212;
  --color-text: #fff;
  --color-text-muted: rgba(255, 255, 255, 0.8);
  --color-text-light: rgba(255, 255, 255, 0.6);
  --color-accent: #fff;
  --font-size-mono: clamp(10px, 1.2vw, 12px);
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-sans);
  background: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
  overflow-x: hidden;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

.bg {
  position: fixed;
  inset: 0;
  background: radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.06), transparent 40%),
    radial-gradient(circle at 80% 10%, rgba(255, 255, 255, 0.04), transparent 45%),
    radial-gradient(circle at 50% 80%, rgba(255, 255, 255, 0.05), transparent 50%),
    linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%);
  z-index: -2;
  pointer-events: none;
}

.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 48px;
  backdrop-filter: blur(10px);
  background: rgba(8, 8, 8, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  z-index: 10;
}

.logo {
  font-size: 0.85rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  font-weight: 600;
}

.nav ul {
  display: flex;
  gap: 28px;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.nav a {
  padding: 6px 0;
  color: var(--color-text);
  opacity: 0.75;
  transition: opacity 0.2s ease;
}

.nav a:hover {
  opacity: 1;
}

.slider-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  padding-top: 72px;
}

.webgl-canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.slide-number {
  position: absolute;
  top: 50%;
  left: var(--spacing-md);
  transform: translateY(-50%);
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text);
  z-index: 3;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.slide-total {
  position: absolute;
  top: 50%;
  right: var(--spacing-md);
  transform: translateY(-50%);
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text);
  z-index: 3;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.slides-navigation {
  position: absolute;
  bottom: var(--spacing-md);
  left: var(--spacing-md);
  right: var(--spacing-md);
  display: flex;
  gap: 0;
  z-index: 3;
  pointer-events: all;
}

.slide-nav-item {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: var(--spacing-sm);
  flex: 1;
  border: none;
  background: none;
}

.slide-progress-line {
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.2);
  margin-bottom: 8px;
  border-radius: 1px;
  overflow: hidden;
}

.slide-progress-fill {
  height: 100%;
  width: 0%;
  background: var(--color-accent);
  transition: width 0.1s ease, opacity 0.3s ease;
  border-radius: 1px;
}

.slide-nav-title {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-text-muted);
  font-weight: 600;
  transition: color 0.3s ease;
}

.slide-nav-item.active .slide-nav-title {
  color: var(--color-text);
}

.help-text {
  position: absolute;
  top: var(--spacing-md);
  left: var(--spacing-md);
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  color: var(--color-text-muted);
  z-index: 3;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  padding: 0 12vw;
  z-index: 2;
  pointer-events: none;
}

.hero {
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
  max-width: 520px;
  pointer-events: auto;
}

.page-hero {
  gap: 12px;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.4em;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.hero h1 {
  font-size: clamp(2.4rem, 5vw, 4rem);
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 1.05rem;
  color: var(--color-text-light);
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 999px;
  background: var(--color-text);
  color: #0a0a0a;
  font-size: 0.9rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 600;
}

.button.ghost {
  background: transparent;
  color: var(--color-text);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 140px 48px 120px;
  display: flex;
  flex-direction: column;
  gap: 120px;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.section-heading h2 {
  font-size: 1.6rem;
  letter-spacing: 0.04em;
}

.section-heading p {
  color: var(--color-text-muted);
  max-width: 560px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.card {
  background: var(--color-bg-soft);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 24px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-tag {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-text-muted);
}

.card h3 {
  font-size: 1.2rem;
}

.card p {
  color: var(--color-text-muted);
}

.split {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
  color: var(--color-text-muted);
}

.meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: var(--color-text-muted);
}

.contact-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  padding: 24px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.contact-list span {
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.7rem;
  color: var(--color-text-muted);
  margin-bottom: 8px;
}

.contact-list a {
  font-size: 0.95rem;
  color: var(--color-text);
}

.tp-dfwv {
  position: fixed !important;
  top: 20px !important;
  right: 20px !important;
  z-index: 1000 !important;
  max-width: 320px !important;
  background: rgba(0, 0, 0, 0.9) !important;
  backdrop-filter: blur(20px) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 8px !important;
}

.tp-dfwv .tp-btnv_b {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: #ffffff !important;
  font-family: var(--font-mono) !important;
  border-radius: 4px !important;
}

.tp-dfwv .tp-btnv_b:hover {
  background: rgba(255, 255, 255, 0.2) !important;
}

@media (max-width: 600px) {
  .slides-navigation {
    bottom: var(--spacing-sm);
    left: var(--spacing-sm);
    right: var(--spacing-sm);
  }

  .slide-nav-item {
    padding: 0.75rem;
  }

  .help-text {
    top: var(--spacing-sm);
    left: var(--spacing-sm);
  }

  .slide-number {
    left: var(--spacing-sm);
  }

  .slide-total {
    right: var(--spacing-sm);
  }

  .tp-dfwv {
    top: 10px !important;
    right: 10px !important;
    max-width: 280px !important;
  }
}

.slider-wrapper {
  opacity: 0;
  transition: opacity 1.5s ease-in;
  pointer-events: none;
}

.slider-wrapper.loaded {
  opacity: 1;
  pointer-events: auto;
}

@media (max-width: 768px) {
  .nav {
    padding: 16px 24px;
    flex-direction: column;
    gap: 12px;
  }

  .nav ul {
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }

  .content {
    padding: 120px 24px 80px;
    gap: 80px;
  }

  .hero-overlay {
    padding: 0 24px;
  }
}
