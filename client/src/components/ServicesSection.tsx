// client/src/components/ServicesSection.tsx
'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Globe,
  Smartphone,
  Settings,
  CheckCircle,
  ShieldCheck,
  PiggyBank,
  RotateCcw,
  ArrowRight,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useI18n } from '@/i18n'

interface ServicesSectionProps {
  onContactClick: () => void
}

type ServiceDef = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
  features: string[]
}

const STARTING_PRICE = '€ 590'

export default function ServicesSection({ onContactClick }: ServicesSectionProps) {
  const { t } = useI18n()

  const services: ServiceDef[] = [
    {
      icon: Globe,
      title: t('services.card.web.title'),
      description: t('services.card.web.desc'),
      features: [
        t('services.card.web.feature.1'),
        t('services.card.web.feature.2'),
        t('services.card.web.feature.3'),
        t('services.card.web.feature.4'),
      ],
    },
    {
      icon: Smartphone,
      title: t('services.card.app.title'),
      description: t('services.card.app.desc'),
      features: [
        t('services.card.app.feature.1'),
        t('services.card.app.feature.2'),
        t('services.card.app.feature.3'),
        t('services.card.app.feature.4'),
      ],
    },
    {
      icon: Settings,
      title: t('services.card.sol.title'),
      description: t('services.card.sol.desc'),
      features: [
        t('services.card.sol.feature.1'),
        t('services.card.sol.feature.2'),
        t('services.card.sol.feature.3'),
        t('services.card.sol.feature.4'),
      ],
    },
  ]

  return (
    <section id="services" className="relative py-24 bg-brand-100 dark:bg-background">
      {/* Soft accents in hero colors */}
      <div className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-10" aria-hidden>
        <div className="absolute -top-16 -right-10 h-56 w-56 rounded-full bg-primary/25 blur-3xl dark:hidden" />
        <div className="absolute -bottom-16 -left-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl dark:hidden" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span
            className="
              inline-flex items-center gap-2 rounded-full
              bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/20
              dark:bg-primary/20 dark:text-primary dark:ring-primary/30
            "
          >
            {t('nav.services')}
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            {t('services.title.leading')}
            <span className="text-primary">{t('services.title.highlight')}</span>
          </h2>

          <p className="text-lg mt-3 md:text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>

          {/* Value badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1
                              bg-emerald-50 text-emerald-700 ring-emerald-200
                              dark:bg-emerald-400/15 dark:text-emerald-200 dark:ring-emerald-400/30">
              <PiggyBank className="h-4 w-4" />
              {t('services.badge.budget')}
              {STARTING_PRICE ? ` (${t('common.startingPrice.prefix')} ${STARTING_PRICE})` : ''}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1
                              bg-primary/10 text-primary ring-primary/20
                              dark:bg-primary/20 dark:text-primary dark:ring-primary/25">
              <ShieldCheck className="h-4 w-4" />
              {t('services.badge.guarantee')}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1
                              bg-accent/10 text-accent ring-accent/20
                              dark:bg-accent/20 dark:text-accent dark:ring-accent/25">
              <RotateCcw className="h-4 w-4" />
              {t('services.badge.launch')}
            </span>
          </div>
        </motion.div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 items-stretch">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="h-full"
            >
              <Card className="h-full flex">
                <CardContent className="p-8 flex flex-col flex-1 min-w-0">
                  <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 bg-primary/10 dark:bg-primary/15">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>

                  {/* Kopfbereich mit fester Mindesthöhe (optional für noch gleichere Höhen) */}
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-1">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>

                  <ul className="space-y-3">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Spacer + Button unten */}
                  <div className="mt-auto pt-6">
                    <Button
                      className="inline-flex w-auto mx-auto whitespace-normal break-words leading-tight
                                 text-sm px-3 py-2 rounded-md gap-2"
                      onClick={onContactClick}
                      aria-label={`${t('services.cta.request')} – ${service.title}`}
                    >
                      {t('services.cta.request')}
                      <ArrowRight className="h-4 w-4 flex-shrink-0 hidden sm:inline" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Garantie-Panel */}
        <motion.div
          className="max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg
                              bg-emerald-50 ring-1 ring-emerald-200
                              dark:bg-emerald-400/10 dark:ring-emerald-400/20">
                <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {t('services.guarantee.title')}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {t('services.guarantee.body')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Starter-Paket */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-card p-8 rounded-lg border max-w-2xl mx-auto flex flex-col">
            <h3 className="text-xl font-semibold mb-2 text-foreground dark:text-white">
              {t('services.starter.title')}
            </h3>
            <p className="text-muted-foreground">
              {t('services.starter.desc')}{' '}
              {STARTING_PRICE ? (
                <span className="font-semibold text-foreground">
                  {t('common.startingPrice.prefix')} {STARTING_PRICE}.
                </span>
              ) : null}
            </p>

            <div className="mt-auto pt-6">
              <Button
                className="inline-flex w-auto mx-auto text-sm px-3 py-2 rounded-md gap-2 leading-tight"
                onClick={onContactClick}
                aria-label={t('services.starter.cta')}
              >
                {t('services.starter.cta')}
                <ArrowRight className="h-4 w-4 hidden sm:inline" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
