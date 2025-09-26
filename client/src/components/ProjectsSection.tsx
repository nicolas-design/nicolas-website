// client/src/components/ProjectsSection.tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useI18n } from '@/i18n'

type ProjectMeta = {
  id: 'monika' | 'brng'
  image: string
  href: string
}

const PROJECTS_META: ProjectMeta[] = [
  { id: 'monika', image: '/case/monika-website.png', href: 'https://www.gadner.com/' },
  { id: 'brng',   image: '/case/brng.png',            href: 'https://brng.app/' },
]

export default function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion()
  const { t } = useI18n()

  // Lokaliserte Projektdaten auf Basis der Meta-Liste
  const projects = PROJECTS_META.map(meta => {
    const base = `items.${meta.id}`
    return {
      id: meta.id,
      title: t(`${base}.title`),
      subtitle: t(`${base}.subtitle`),
      description: t(`${base}.description`),
      image: meta.image,
      alt: t(`${base}.alt`),
      href: meta.href,
      chips: [1,2,3].map(n => t(`${base}.chip.${n}`)),
    }
  })

  const gridVariants = {
    hidden: {},
    show: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.08 } },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <section
      id="projects"
      className="
        relative overflow-hidden py-20
        bg-gradient-to-b from-white to-brand-50
        dark:from-[hsl(222_15%_14%)] dark:to-[hsl(222_15%_12%)]
      "
    >
      {/* Blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl opacity-60 dark:bg-primary/35 dark:opacity-30" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl opacity-60 dark:bg-accent/35 dark:opacity-30" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-50 dark:bg-primary/20 dark:opacity-25" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center"
        >
          <span className="
            inline-flex items-center gap-2 rounded-full
            bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/20
            dark:bg-primary/20 dark:text-primary dark:ring-primary/30
          ">
            {t('projects.badge')}
          </span>

          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-foreground">
            {t('projects.title.leading')}
            <span className="text-primary">{t('projects.title.highlight')}</span>
          </h2>

          <p className="text-lg mt-3 md:text-xl leading-relaxed text-muted-foreground mb-6 max-w-3xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="mt-12 grid gap-8 md:grid-cols-2"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {projects.map((p) => (
            <motion.article
              key={p.id}
              variants={cardVariants}
              className="
                group overflow-hidden rounded-3xl border bg-card shadow-sm transition
                hover:shadow-md hover:border-primary/30 border-border
              "
            >
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${p.title} — ${t('projects.card.live')}`}
              >
                <div className="relative">
                  <motion.img
                    key={p.image}
                    src={p.image}
                    alt={p.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-56 md:h-72 w-full object-cover"
                    initial={{ opacity: 0, scale: 1.02 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeOut' }}
                  />
                  {/* Badge oben rechts */}
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="
                      pointer-events-none absolute top-4 right-4 rounded-full
                      px-3 py-1 text-xs font-medium ring-1
                      bg-white/90 text-slate-700 ring-slate-200
                      dark:bg-white/10 dark:text-foreground/90 dark:ring-white/15
                    "
                  >
                    {p.subtitle}
                  </motion.div>
                </div>
              </a>

              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-foreground">{p.title}</h3>
                  <svg
                    className="h-4 w-4 text-muted-foreground transition group-hover:text-primary"
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

                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.chips.map((c) => (
                    <motion.span
                      key={c}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="
                        inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium
                        bg-muted text-muted-foreground ring-1 ring-muted-border
                        dark:bg-white/5 dark:text-foreground/80 dark:ring-white/10
                      "
                      dangerouslySetInnerHTML={{ __html: c }}
                    />
                  ))}
                </div>

                <div className="mt-4">
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-sm font-medium text-primary hover:opacity-90"
                  >
                    {t('projects.card.live')}
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
            </motion.article>
          ))}
        </motion.div>

        <motion.p
          className="mx-auto mt-8 max-w-3xl text-center text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {t('projects.footnote')}
        </motion.p>
      </div>
    </section>
  )
}
