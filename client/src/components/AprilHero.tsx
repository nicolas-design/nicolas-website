'use client'

import { useEffect, useMemo, useState, useCallback, useRef } from 'react'

const ROTATE_MS = 6000

import { useI18n } from '@/i18n'

type SlideKey = 'websites' | 'webapps' | 'landing' | 'mobile'
type Slide = {
  key: SlideKey
  label: string
  img: string
  alt: string
  blurb: string
  bullets: string[]
  kind: 'web' | 'app'
}

function PhoneMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex justify-center p-4">
      <div
        className="
          relative h-[420px] w-[208px] rounded-[2rem]
          border border-slate-300 dark:border-slate-700/60
          bg-slate-900 dark:bg-slate-900
          shadow-[0_8px_40px_rgba(2,6,23,0.25)]
          overflow-hidden
        "
      >
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-white/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 mt-1 h-5 w-28 rounded-b-2xl bg-black/80" />
        <div className="absolute inset-[10px] rounded-[1.6rem] overflow-hidden bg-black">
          <img src={src} alt={alt} className="h-full w-full object-cover" loading="eager" decoding="async" />
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const { t } = useI18n()
  const [active, setActive] = useState<SlideKey>('websites')



  // Smooth scroll with offset for sticky header
  const smoothScroll = useCallback((targetId: string) => {
    const el = document.getElementById(targetId)
    if (!el) return

    // Try to read a header height; fallback to 80px
    const header = document.getElementById('site-header')
    const offset =
      (header?.getBoundingClientRect().height ?? 80) +
      8 // a tiny extra breathing space

    const top =
      el.getBoundingClientRect().top + window.pageYOffset - offset

    window.scrollTo({ top, behavior: 'smooth' })
  }, [])

  // optional: react to hash in URL (direct visits / back button)
  useEffect(() => {
    const handler = () => {
      const id = location.hash.slice(1)
      if (id) setTimeout(() => smoothScroll(id), 0)
    }
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [smoothScroll])
  

  // Build localized slides
  const SLIDES: Slide[] = useMemo(
    () => [
      {
        key: 'websites',
        label: t('slides.websites.label'),
        img: '/case/monika-website.png',
        alt: t('slides.websites.label'),
        blurb: t('slides.websites.blurb'),
        bullets: [
          t('slides.websites.bullet.1'),
          t('slides.websites.bullet.2'),
          t('slides.websites.bullet.3'),
        ],
        kind: 'web',
      },
      {
        key: 'landing',
        label: t('slides.landing.label'),
        img: '/case/brng.png',
        alt: t('slides.landing.label'),
        blurb: t('slides.landing.blurb'),
        bullets: [
          t('slides.landing.bullet.1'),
          t('slides.landing.bullet.2'),
          t('slides.landing.bullet.3'),
        ],
        kind: 'web',
      },
      {
        key: 'webapps',
        label: t('slides.webapps.label'),
        img: '/case/orderboy.png',
        alt: t('slides.webapps.label'),
        blurb: t('slides.webapps.blurb'),
        bullets: [
          t('slides.webapps.bullet.1'),
          t('slides.webapps.bullet.2'),
          t('slides.webapps.bullet.3'),
        ],
        kind: 'web',
      },
      {
        key: 'mobile',
        label: t('slides.mobile.label'),
        img: '/case/brng-phone.png',
        alt: t('slides.mobile.label'),
        blurb: t('slides.mobile.blurb'),
        bullets: [
          t('slides.mobile.bullet.1'),
          t('slides.mobile.bullet.2'),
          t('slides.mobile.bullet.3'),
        ],
        kind: 'app',
      },
    ],
    [t]
  )


// detect prefers-reduced-motion once
const prm = useMemo(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false, [])

const order = useMemo(() => SLIDES.map(s => s.key), [SLIDES])
const timerRef = useRef<number | null>(null)

const clearTimer = useCallback(() => {
  if (timerRef.current) {
    window.clearTimeout(timerRef.current)
    timerRef.current = null
  }
}, [])

const scheduleNext = useCallback(() => {
  clearTimer()
  if (prm) return
  timerRef.current = window.setTimeout(() => {
    setActive(curr => order[(order.indexOf(curr) + 1) % order.length])
    scheduleNext() // schedule again
  }, ROTATE_MS)
}, [order, prm, clearTimer])

// start on mount, cleanup on unmount, rewire when order changes
useEffect(() => {
  scheduleNext()
  return clearTimer
}, [scheduleNext, clearTimer])

  useEffect(() => {
    SLIDES.forEach((s) => {
      const i = new Image()
      i.src = s.img
    })
  }, [SLIDES])

  const slide = useMemo(
    () => SLIDES.find((s) => s.key === active)!,
    [active, SLIDES]
  )

  return (
    <section id="hero" className="relative overflow-hidden bg-background">
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left */}
          <div>
            <span
              className="
                inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1
                bg-indigo-50 text-indigo-700 ring-indigo-200
                dark:bg-indigo-400/10 dark:text-indigo-300 dark:ring-indigo-400/20
              "
            >
              {t('hero.badge')}
            </span>

            <h1 className="mt-5 text-4xl font-semibold leading-tight text-slate-900 md:text-5xl dark:text-slate-100">
              {t('hero.h1.leading')}
              <span className="text-indigo-600 dark:text-indigo-400">
                {t('hero.h1.highlight')}
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-slate-600 dark:text-slate-300">
              {t('hero.p')}
            </p>

            <ul className="mt-6 grid max-w-xl gap-3 text-sm text-slate-700 dark:text-slate-300">
              {[t('hero.bullet.1'), t('hero.bullet.2'), t('hero.bullet.3')].map(
                (item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-none text-emerald-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.09 7.09a1 1 0 0 1-1.42.01L3.29 9.88a1 1 0 1 1 1.42-1.41l3.19 3.19 6.36-6.37a1 1 0 0 1 1.444 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                )
              )}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => smoothScroll('contact')}
                className="
                  inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium shadow-sm transition
                  bg-indigo-600 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400
                  dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:text-slate-900
                "
                aria-label={t('hero.cta.primary')}
              >
                {t('hero.cta.primary')}
              </button>

              <button
                type="button"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="
                  inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium transition
                  ring-1 ring-slate-200 text-slate-700 hover:bg-slate-50
                  dark:ring-slate-700/60 dark:text-slate-200 dark:hover:bg-slate-800
                "
                aria-label={t('hero.cta.secondary')}
              >
                {t('hero.cta.secondary')}
              </button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {t('hero.stats.projects')}
                </span>
              </div>
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-700/60" />
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {t('hero.stats.duration')}
                </span>
              </div>
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-700/60" />
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {t('hero.stats.vitals')}
                </span>
              </div>
            </div>
          </div>

          {/* Right: switcher */}
          <div className="md:justify-self-end">
            {/* Tabs */}
            <div className="mb-3 flex flex-wrap gap-2">
              {SLIDES.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => { setActive(key); scheduleNext(); }}

                  className={`
                    rounded-full px-3 py-1 text-xs font-medium ring-1 transition
                    ${
                      active === key
                        ? 'bg-slate-900 text-white ring-slate-900 dark:bg-slate-200 dark:text-slate-900 dark:ring-slate-200'
                        : 'bg-white text-slate-700 ring-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700/60 dark:hover:bg-slate-700/60'
                    }
                  `}
                  aria-pressed={active === key}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Card */}
            <div
              className="
                relative mx-auto w-full max-w-md overflow-hidden rounded-3xl
                border border-slate-200 bg-white shadow-sm md:ml-auto
                dark:border-slate-700/60 dark:bg-slate-900/60
              "
            >
              <button
                type="button"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label={`${slide.label} — ${t('hero.card.moreAria')}`}
                className="block w-full text-left"
              >
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
              </button>

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {slide.label}
                  </h3>
                  <span className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {t('hero.card.offer')}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {slide.blurb}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {slide.bullets.map((b) => (
                    <span
                      key={b}
                      className="
                        inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium
                        bg-slate-50 text-slate-700 ring-1 ring-slate-200
                        dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700/60
                      "
                      dangerouslySetInnerHTML={{ __html: b }}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  aria-label={t('hero.card.more')}
                >
                  {t('hero.card.more')}
                  <svg className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path
                      fillRule="evenodd"
                      d="M12.3 5.3a1 1 0 011.4 0l3 3a1 1 0 010 1.4l-3 3a1 1 0 11-1.4-1.4L13.59 10H4a1 1 0 110-2h9.59l-1.29-1.29a1 1 0 010-1.41z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {SLIDES.map((s) => (
                  <button
                    key={s.key}
                    aria-label={`${s.label} ${t('hero.card.moreAria')}`}
                    onClick={() => setActive(s.key)}
                    className={`
                      h-1.5 w-6 rounded-full transition
                      ${
                        active === s.key
                          ? 'bg-slate-900 dark:bg-slate-200'
                          : 'bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600'
                      }
                    `}
                  />
                ))}
              </div>
            </div>

            <p className="mx-auto mt-4 max-w-md text-center text-xs text-slate-500 md:text-right dark:text-slate-400">
              {t('hero.desc')}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .animate-fade { opacity: 0; animation: fadeIn .5s ease-out forwards }
        @keyframes fadeIn { to { opacity: 1 } }
      `}</style>
    </section>
  )
}
