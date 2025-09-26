// client/src/components/AboutSection.tsx
'use client'

import { Card, CardContent } from '@/components/ui/card'
import { GraduationCap, Briefcase, Code, Award, Heart, Zap, Target, Lightbulb } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { useI18n } from '@/i18n'

export default function AboutSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const { t } = useI18n()

  const achievements = [
    { icon: GraduationCap, title: t('about.achievements.1.title'), description: t('about.achievements.1.desc'), color: 'from-primary to-accent' },
    { icon: Briefcase,     title: t('about.achievements.2.title'), description: t('about.achievements.2.desc'), color: 'from-emerald-500 to-primary' },
    { icon: Code,          title: t('about.achievements.3.title'), description: t('about.achievements.3.desc'), color: 'from-primary to-accent' },
    { icon: Award,         title: t('about.achievements.4.title'), description: t('about.achievements.4.desc'), color: 'from-amber-500 to-rose-500' },
  ] as const

  const passions = [
    { icon: Heart,     text: t('about.values.problemSolving'), color: 'text-rose-500' },
    { icon: Zap,       text: t('about.values.performance'),    color: 'text-amber-500' },
    { icon: Target,    text: t('about.values.clarity'),        color: 'text-primary'   },
    { icon: Lightbulb, text: t('about.values.creativity'),     color: 'text-emerald-500' },
  ] as const

  const skills: { name: string; level: number }[] = [
    { name: 'React', level: 90 }, { name: 'Next.js', level: 85 }, { name: 'Angular', level: 75 },
    { name: 'Flutter', level: 72 }, { name: 'Dart', level: 89 }, { name: 'Node.js', level: 82 },
    { name: 'Firebase', level: 76 }, { name: 'PostgreSQL', level: 74 }, { name: 'MongoDB', level: 68 },
    { name: 'TypeScript', level: 88 },
  ]

  return (
    <section id="about" className="relative py-24 bg-brand-100 dark:bg-background">
      {/* blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-15" aria-hidden>
        <div className="absolute top-16 left-8 h-32 w-32 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute bottom-16 right-8 h-40 w-40 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 h-24 w-24 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/20 dark:bg-primary/20 dark:text-primary dark:ring-primary/30">
            {t('about.title')}
          </span>
          <h2 className="mt-4 mb-4 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Nicolas<span className="text-primary"> Gadner</span>
          </h2>

          <div className="mx-auto mb-6 flex flex-col items-center">
            <div className="h-28 w-28 overflow-hidden rounded-full ring-2 ring-primary/20 dark:ring-white/15 shadow-sm">
              <img src="/case/cto.jpg" alt="Nicolas Gadner – Portrait" className="h-full w-full object-cover" loading="eager" decoding="async" />
            </div>
            <p className="mt-4 max-w-3xl text-lg md:text-xl text-muted-foreground mx-auto">
              {t('about.intro')}
            </p>
          </div>
        </motion.div>

        {/* Achievements */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
              <Card className="group relative h-full cursor-default overflow-hidden bg-card border border-border">
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

        {/* Werte */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="mb-6 text-2xl font-bold text-foreground">{t('about.values.title')}</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {passions.map((p, i) => (
              <motion.div
                key={p.text}
                className="flex items-center gap-3 rounded-full border ring-1 ring-muted-border bg-card/70 px-5 py-2.5 backdrop-blur-sm text-foreground dark:bg-white/10 dark:ring-white/15"
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
          <h3 className="mb-4 text-2xl font-bold text-foreground">{t('about.tech.title')}</h3>
          <p className="mb-6 text-sm text-muted-foreground">{t('about.tech.desc')}</p>

          <div className="space-y-4">
            {skills.map(({ name, level }, idx) => (
              <div key={name}>
                <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{name}</span>
                  <span>{level}%</span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.9,
                      delay: prefersReducedMotion ? 0 : idx * 0.05,
                      ease: 'easeOut',
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
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
