// client/src/components/AboutSection.tsx
'use client'

import { Card, CardContent } from '@/components/ui/card'
import { GraduationCap, Briefcase, Code, Award, Heart, Zap, Target, Lightbulb } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function AboutSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const achievements = [
    {
      icon: GraduationCap,
      title: 'B.Sc. Software Engineering & Digital Business',
      description: 'Fundierte Grundlage in moderner Softwareentwicklung & digitalen Geschäftsmodellen (Leistungsstipendium).',
      color: 'from-primary to-accent',
    },
    {
      icon: Briefcase,
      title: '1+ Jahr Berufserfahrung (Deniba)',
      description: 'Arbeit in realen Projekten: sauberer Code, Teamwork, Verantwortung.',
      color: 'from-emerald-500 to-primary',
    },
    {
      icon: Code,
      title: 'Praxis in Startups (BRNG, Voyal)',
      description: 'Produktfokus: schnelle Iteration, klare UX, „shippen statt schippern“.',
      color: 'from-primary to-accent',
    },
    {
      icon: Award,
      title: 'Qualität & Ergebnisse',
      description: 'Performance, Accessibility & SEO von Beginn an – messbare Wirkung statt Spielereien.',
      color: 'from-amber-500 to-rose-500',
    },
  ] as const

  const passions = [
    { icon: Heart,     text: 'Problemlösung', color: 'text-rose-500' },
    { icon: Zap,       text: 'Performance',   color: 'text-amber-500' },
    { icon: Target,    text: 'Klarheit',      color: 'text-primary'   },
    { icon: Lightbulb, text: 'Kreativität',   color: 'text-emerald-500' },
  ] as const

  const skills: { name: string; level: number }[] = [
    { name: 'React', level: 90 },
    { name: 'Next.js', level: 85 },
    { name: 'Angular', level: 75 },
    { name: 'Flutter', level: 72 },
    { name: 'Node.js', level: 82 },
    { name: 'Firebase', level: 76 },
    { name: 'PostgreSQL', level: 74 },
    { name: 'MongoDB', level: 68 },
    { name: 'TypeScript', level: 88 },
  ]

  return (
    <section id="about" className="relative py-24 bg-brand-100 dark:bg-background">
      {/* soft background accents */}
      <div className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-10" aria-hidden>
        <div className="absolute top-16 left-8 h-32 w-32 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute bottom-16 right-8 h-40 w-40 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 h-24 w-24 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header + portrait */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-primary">
            Über mich
          </h2>

          <div className="mx-auto mb-6 flex flex-col items-center">
            <div className="h-28 w-28 overflow-hidden rounded-full ring-2 ring-primary/20 shadow-sm">
              {/* put your image in /public/case/cto.jpg or adjust path */}
              <img
                src="/case/cto.jpg"
                alt="Nicolas Gadner – Portrait"
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
            <p className="text-lg md:text-xl mt-4 text-muted-foreground max-w-3xl mx-auto">
              Full-Stack mit Produktfokus: Strategie, Design und Entwicklung aus einer Hand – für schnelle,
              zugängliche und messbar erfolgreiche Websites & Webapps.
            </p>
          </div>
        </motion.div>

        {/* Achievements */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {achievements.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 40, rotateY: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: 'easeOut' }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card className="group relative h-full cursor-default overflow-hidden">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${a.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
                  animate={hoveredCard === i ? { scale: 1.04 } : { scale: 1 }}
                  transition={{ duration: 0.25 }}
                />
                <CardContent className="relative z-10 p-6 text-center">
                  <div className="mb-4 flex items-center justify-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
                      <a.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-sm font-semibold text-foreground">{a.title}</h3>
                  <p className="text-sm text-muted-foreground">{a.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-foreground">Werte</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {passions.map((p, i) => (
              <motion.div
                key={p.text}
                className="flex items-center gap-3 rounded-full border bg-card/70 px-5 py-2.5 backdrop-blur-sm"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
              >
                <p.icon className={`h-4 w-4 ${p.color}`} />
                <span className="text-sm">{p.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech stack bars */}
        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-foreground">Tech-Stack</h3>
          <p className="mb-6 text-sm text-muted-foreground">
            Hauptwerkzeuge für Web & Apps. Balken zeigen, wo ich aktuell am meisten liefere.
          </p>

          <div className="space-y-4">
            {skills.map(({ name, level }) => (
              <div key={name}>
                <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{name}</span>
                  <span>{level}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    style={{ width: `${level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
