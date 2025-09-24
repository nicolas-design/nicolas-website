// client/src/components/ProjectsSection.tsx
'use client'

type Project = {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  alt: string
  href: string
  chips: string[]
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Dr. Monika Gadner',
    subtitle: 'Praxis-Website',
    description:
      'Leichte, SEO-starke Praxisseite mit klarer Termin-CTA. Optimiert für Mobil & Core Web Vitals.',
    image: '/case/monika-website.png',
    alt: 'Praxiswebsite Hero – Dr. Monika Gadner',
    href: 'https://www.gadner.com/',
    chips: ['<1s LCP', '98 Lighthouse', 'CMS-ready'],
  },
  {
    id: 2,
    title: 'BRNG',
    subtitle: 'Landing & App-Shell',
    description:
      'Fokussierte Landing mit sauberer IA; App-Shell für schnelles Onboarding & Leads.',
    image: '/case/brng.png',
    alt: 'BRNG Landing – Screenshot',
    href: 'https://brng.app/',
    chips: ['Next.js', 'API-ready', 'Schnell & schlank'],
  },
]

export default function ProjectsSection() {
  return (
    <section id="work" className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-20">
      {/* soft background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/20">
            Ausgewählte Projekte
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-slate-900">
            <span className="text-primary">Ergebnisse</span>, die überzeugen
          </h2>
          <p className="text-lg mt-3 md:text-xl leading-relaxed text-muted-foreground mb-6 max-w-3xl mx-auto">
            Maßgeschneiderte Websites & Webapps – Performance, SEO und Conversion von Anfang an gedacht.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <article
              key={p.id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <a href={p.href} target="_blank" rel="noreferrer" aria-label={`${p.title} öffnen`}>
                <div className="relative">
                  <img
                    src={p.image}
                    alt={p.alt}
                    className="h-56 md:h-72 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* subtle top-right badge */}
                  <div className="pointer-events-none absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
                    {p.subtitle}
                  </div>
                </div>
              </a>

              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-slate-900">{p.title}</h3>
                  <svg
                    className="h-4 w-4 text-slate-400 transition group-hover:text-primary"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.3 5.3a1 1 0 011.4 0l3 3a1 1 0 010 1.4l-3 3a1 1 0 11-1.4-1.4L13.59 10H4a1 1 0 110-2h9.59l-1.29-1.29a1 1 0 010-1.41z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <p className="mt-1 text-sm leading-relaxed text-slate-600">{p.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.chips.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <div className="mt-4">
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-sm font-medium text-primary hover:opacity-90"
                  >
                    Live ansehen
                    <svg className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path
                        fillRule="evenodd"
                        d="M12.3 5.3a1 1 0 011.4 0l3 3a1 1 0 010 1.4l-3 3a1 1 0 11-1.4-1.4L13.59 10H4a1 1 0 110-2h9.59l-1.29-1.29a1 1 0 010-1.41z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-slate-500">
          Mehr Beispiele gern auf Anfrage – ich zeige Ihnen passende Cases für Ihre Branche.
        </p>
      </div>
    </section>
  )
}
