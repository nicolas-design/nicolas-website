'use client'

import { useEffect, useMemo, useState } from 'react'


type SlideKey = 'websites' | 'webapps' | 'landing' | 'mobile'
type Slide = {
  key: SlideKey
  label: string
  img: string
  alt: string
  blurb: string
  bullets: string[]
  kind: string
}

const SLIDES: Slide[] = [
  {
    key: 'websites',
    label: 'Websites',
    img: '/case/monika-website.png', // vorhandenes Bild nutzen
    alt: 'Beispiel-Website',
    blurb: 'Schnelle, SEO-starke Seiten, die Termine & Anfragen steigern.',
    bullets: ['<1s LCP', 'Core Web Vitals grün', 'CMS-Integration'],
    kind:'web'
  },
  {
    key: 'landing',
    label: 'Landing Pages',
    img: '/case/brng.png', // ggf. später eigenes Bild
    alt: 'Beispiel-Landing',
    blurb: 'Klar fokussierte Landing Pages, optimiert auf Conversion.',
    bullets: ['A/B bereit', 'Analytics', 'Schnelle Umsetzung'],
    kind:'web'
  },
  {
    key: 'webapps',
    label: 'Webapps',
    img: '/case/orderboy.png',
    alt: 'Beispiel-Webapp',
    blurb: 'Individuelle Webanwendungen – von MVP bis produktionsreif.',
    bullets: ['Next.js', 'API-ready', 'Auth & Payments'],
    kind:'web'
  },
  
  {
    key: 'mobile',
    label: 'Mobile',
    img: '/case/brng-phone.png', // Platzhalter
    alt: 'Mobile Oberfläche',
    blurb: 'Mobile-first UIs & App-Shells für nahtlose Flows.',
    bullets: ['PWA-Ready', 'Offline-fähig', 'App-Shell'],
    kind:'app' 
  },
]

function PhoneMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex justify-center p-4">
      <div
        className="
          relative
          h-[420px] w-[208px]                /* ~iPhone-ish footprint */
          rounded-[2rem]
          border border-slate-300
          bg-slate-900
          shadow-[0_8px_40px_rgba(2,6,23,0.25)]
          overflow-hidden
        "
      >
        {/* side bezel highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-white/10" />

        {/* notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 mt-1 h-5 w-28 rounded-b-2xl bg-black/80" />

        {/* screen */}
        <div className="absolute inset-[10px] rounded-[1.6rem] overflow-hidden bg-black">
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const [active, setActive] = useState<SlideKey>('websites')

  // Autoplay (respektiert Reduced Motion)
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mql.matches) return
    const order = SLIDES.map(s => s.key)
    const id = setInterval(() => {
      setActive(curr => {
        const i = order.indexOf(curr)
        return order[(i + 1) % order.length]
      })
    }, 6000)
    return () => clearInterval(id)
  }, [])

  // Preload
  useEffect(() => {
    SLIDES.forEach(s => { const i = new Image(); i.src = s.img })
  }, [])

  const slide = useMemo(() => SLIDES.find(s => s.key === active)!, [active])

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* soft background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-100 blur-3xl opacity-60" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-100 blur-3xl opacity-60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left: value copy */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200">
              Websites & Webapps — maßgeschneidert für Ihr Business
            </span>

            <h1 className="mt-5 text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
              Launchen Sie eine Seite, die <span className="text-indigo-600">Kund:innen gewinnt</span>
            </h1>

            <p className="mt-4 max-w-xl text-slate-600">
              Strategie, Design und Entwicklung aus einer Hand. Schnell, SEO-ready und auf Conversion gebaut — ohne Agentur-Overhead.
            </p>

            <ul className="mt-6 grid max-w-xl gap-3 text-sm text-slate-700">
              {[
                'Discovery → Prototyp → Launch in <3 Wochen',
                'Performance, Accessibility & SEO von Anfang an',
                'Integrationen: CMS, Payments, Booking, Analytics',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-none text-emerald-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path fillRule="evenodd" d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.07 7.09a1 1 0 0 1-1.42.01L3.29 9.88a1 1 0 1 1 1.42-1.41l3.19 3.19 6.36-6.37a1 1 0 0 1 1.444 0z" clipRule="evenodd" />
                  </svg>
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact" className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                Unverbindliches Angebot anfordern
              </a>
              <a href="#work" className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50">
                Projekte ansehen
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-2"><span className="font-semibold text-slate-700">12+</span> ausgelieferte Projekte</div>
              <div className="h-4 w-px bg-slate-200" />
              <div className="flex items-center gap-2"><span className="font-semibold text-slate-700">~3 Wochen</span> durchschnittliche Dauer</div>
              <div className="h-4 w-px bg-slate-200" />
              <div className="flex items-center gap-2"><span className="font-semibold text-slate-700">Core Web Vitals</span> im grünen Bereich</div>
            </div>
          </div>

          {/* Right: case study switcher / slideshow */}
          {/* Rechte Spalte: Kategorien-Slideshow */}
          <div className="md:justify-self-end">
            {/* Tabs */}
            <div className="mb-3 flex flex-wrap gap-2">
              {SLIDES.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={`rounded-full px-3 py-1 text-xs font-medium ring-1 transition ${
                    active === key
                      ? 'bg-slate-900 text-white ring-slate-900'
                      : 'bg-white text-slate-700 ring-slate-200 hover:bg-slate-50'
                  }`}
                  aria-pressed={active === key}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Card */}
            <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:ml-auto">
              {/* Bild */}
              <a href="#work" aria-label={`${slide.label} – mehr erfahren`}>
              {slide.kind === 'app' ? (
  <PhoneMockup src={slide.img} alt={slide.alt} />
) : (
  <img
    key={slide.img}
    src={slide.img}
    alt={slide.alt}
    className="h-64 w-full object-cover animate-fade"
    loading="eager"
    decoding="async"
  />
)}

              </a>

              {/* Inhalt */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900">{slide.label}</h3>
                  <span className="text-[10px] uppercase tracking-wide text-slate-500">Angebot</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{slide.blurb}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {slide.bullets.map((b) => (
                    <span
                      key={b}
                      className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200"
                      dangerouslySetInnerHTML={{ __html: b }}
                    />
                  ))}
                </div>

                <a href="#work" className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Mehr dazu
                  <svg className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path fillRule="evenodd" d="M12.3 5.3a1 1 0 011.4 0l3 3a1 1 0 010 1.4l-3 3a1 1 0 11-1.4-1.4L13.59 10H4a1 1 0 110-2h9.59l-1.29-1.29a1 1 0 010-1.41z" clipRule="evenodd"/>
                  </svg>
                </a>
              </div>

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {SLIDES.map(s => (
                  <button
                    key={s.key}
                    aria-label={`${s.label} anzeigen`}
                    onClick={() => setActive(s.key)}
                    className={`h-1.5 w-6 rounded-full transition ${
                      active === s.key ? 'bg-slate-900' : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="mx-auto mt-4 max-w-md text-center text-xs text-slate-500 md:text-right">
              Websites, Webapps, Landing Pages & Mobile — mehr Beispiele unten.
            </p>
          </div>
        </div>
      </div>

      {/* Mini-Fade-Animation */}
      <style>{`
        .animate-fade { opacity: 0; animation: fadeIn .5s ease-out forwards }
        @keyframes fadeIn { to { opacity: 1 } }
      `}</style>
    </section>
  )
}