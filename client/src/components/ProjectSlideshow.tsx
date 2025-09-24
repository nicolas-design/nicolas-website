// Right: slideshow of projects linking to #work
import { useEffect, useRef, useState } from 'react'

type Project = {
  title: string
  tag: string
  img: string            // put files in /public/case/...
  caption?: string
  kpis?: string[]        // optional chips
}

const projects: Project[] = [
  {
    title: 'brng — Network scale UI',
    tag: 'Webapp',
    img: '/case/brng-map.jpg',
    caption: 'Interaktive Karte, klare Story.',
    kpis: ['98 Lighthouse', '<1s LCP', 'A11y-ready']
  },
  {
    title: 'Dr. Monika Gadner — Praxiswebsite',
    tag: 'Website',
    img: '/case/gadner-hero.jpg',
    caption: 'Termin-CTA im Fokus.',
    kpis: ['+Kontaktanfragen', 'SEO-Basics', 'Schnell']
  },
  // add more later…
]

export function ProjectSlideshow() {
  const [i, setI] = useState(0)
  const hoverRef = useRef<HTMLDivElement>(null)

  // autoplay (pauses on hover, respects reduced motion)
  useEffect(() => {
    const reduce = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let timer: number | undefined
    const start = () => (timer = window.setInterval(() =>
      setI((n) => (n + 1) % projects.length), 3500))
    const stop = () => { if (timer) window.clearInterval(timer) }

    start()
    const el = hoverRef.current
    el?.addEventListener('mouseenter', stop)
    el?.addEventListener('mouseleave', start)
    return () => {
      stop()
      el?.removeEventListener('mouseenter', stop)
      el?.removeEventListener('mouseleave', start)
    }
  }, [])

  const prev = () => setI((n) => (n - 1 + projects.length) % projects.length)
  const next = () => setI((n) => (n + 1) % projects.length)

  const p = projects[i]

  return (
    <div className="relative md:pl-8">
      <div
        ref={hoverRef}
        className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:ml-auto"
      >
        {/* clickable visual */}
        <a href="#work" aria-label={`Mehr zu: ${p.title}`} className="group block">
          {/* slides (fade) */}
          <div className="relative h-64 w-full md:h-80">
            {projects.map((proj, idx) => (
              <img
                key={proj.title}
                src={proj.img}
                alt={proj.title}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  idx === i ? 'opacity-100' : 'opacity-0'
                }`}
                loading={idx === i ? 'eager' : 'lazy'}
              />
            ))}
          </div>

          {/* caption */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">{p.title}</h3>
              <span className="text-[10px] uppercase tracking-wide text-slate-500">{p.tag}</span>
            </div>
            {p.caption && <p className="mt-1 text-sm text-slate-600">{p.caption}</p>}

            {p.kpis && (
              <div className="mt-4 flex flex-wrap gap-2">
                {p.kpis.map((k) => (
                  <span
                    key={k}
                    className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200"
                  >
                    {k}
                  </span>
                ))}
              </div>
            )}

            <span className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 group-hover:text-indigo-500">
              Projekte ansehen
              <svg className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M12.3 5.3a1 1 0 011.4 0l3 3a1 1 0 010 1.4l-3 3a1 1 0 11-1.4-1.4L13.59 10H4a1 1 0 110-2h9.59l-1.29-1.29a1 1 0 010-1.41z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </a>

        {/* controls */}
        <button
          onClick={prev}
          aria-label="Vorheriges Projekt"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow ring-1 ring-slate-200 backdrop-blur transition hover:bg-white"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M12.7 15.7a1 1 0 01-1.4 0l-5-5a1 1 0 010-1.4l5-5a1 1 0 111.4 1.4L8.42 10l4.3 4.3a1 1 0 010 1.4z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Nächstes Projekt"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow ring-1 ring-slate-200 backdrop-blur transition hover:bg-white"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M7.3 4.3a1 1 0 011.4 0l5 5a1 1 0 010 1.4l-5 5a1 1 0 11-1.4-1.4L11.58 10 7.3 5.7a1 1 0 010-1.4z" clipRule="evenodd" />
          </svg>
        </button>

        {/* dots */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
          {projects.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Slide ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-1.5 w-6 rounded-full transition ${
                idx === i ? 'bg-slate-900/70' : 'bg-slate-300/70 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>

      <p className="mx-auto mt-4 max-w-md text-center text-xs text-slate-500 md:text-right">
        Echte Projekte. Keine Templates. Mehr Cases unten.
      </p>
    </div>
  )
}
