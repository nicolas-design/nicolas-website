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

interface ServicesSectionProps {
  onContactClick: () => void
}

const STARTING_PRICE = '€ 590'

export default function ServicesSection({ onContactClick }: ServicesSectionProps) {
  const services = [
    {
      icon: Globe,
      title: 'Webseiten & Landings',
      description: 'Moderne, responsive Sites, die Leads und Vertrauen aufbauen.',
      features: ['Next.js / React', 'Mobil-first & schnell', 'SEO-Basics inklusive', 'Core Web Vitals im Blick'],
    },
    {
      icon: Smartphone,
      title: 'Webapps & Mobile',
      description: 'Von MVP bis produktionsreif – sauber strukturiert, skalierbar.',
      features: ['React / React Native / Flutter', 'API-Integration', 'Auth & Payments', 'Cloud-Backend (z. B. Firebase)'],
    },
    {
      icon: Settings,
      title: 'Digitale Lösungen',
      description: 'Automatisierung & Integration, die Zeit spart und sichtbar wirkt.',
      features: ['Workflows & Automations', 'Datenanalyse & Dashboards', 'System-Integration', 'CI/CD & Hosting'],
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
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Schlank starten. <span className="text-primary">Messbar wachsen.</span>
          </h2>

          <p className="text-lg mt-3 md:text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
            Faire, einsteigerfreundliche Pakete für KMU & Startups – mit klaren Fixpreisen, kurzen Laufzeiten
            und echter Verantwortung für Ergebnis & Qualität.
          </p>

          {/* Value badges (improved dark contrast) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1
                              bg-emerald-50 text-emerald-700 ring-emerald-200
                              dark:bg-emerald-400/15 dark:text-emerald-200 dark:ring-emerald-400/30">
              <PiggyBank className="h-4 w-4" />
              Budget-freundlicher Einstieg{STARTING_PRICE ? ` (${STARTING_PRICE})` : ''}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1
                              bg-primary/10 text-primary ring-primary/20
                              dark:bg-primary/20 dark:text-primary dark:ring-primary/25">
              <ShieldCheck className="h-4 w-4" />
              100 % Geld-zurück-Garantie
            </span>

            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1
                              bg-accent/10 text-accent ring-accent/20
                              dark:bg-accent/20 dark:text-accent dark:ring-accent/25">
              <RotateCcw className="h-4 w-4" />
              Launch in ~3 Wochen
            </span>
          </div>
        </motion.div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <Card className="h-full hover-elevate bg-card">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 bg-primary/10 dark:bg-primary/15">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>

                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full"
                    onClick={onContactClick}
                    aria-label={`Unverbindliches Angebot für ${service.title} anfordern`}
                  >
                    Kostenloses Angebot anfordern
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
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
        100 % Geld-zurück-Garantie
      </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  Wenn Sie innerhalb von <span className="font-medium">30 Tagen nach Launch</span> nicht zufrieden sind,
                  erhalten Sie Ihr Geld zurück. Ohne Wenn und Aber. Null Risiko, maximaler Nutzen.
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
          <div className="bg-card p-8 rounded-lg border max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-2 text-foreground dark:text-white">
  Starter-Paket für den schnellen Markteintritt
</h3>
            <p className="text-muted-foreground mb-5">
              Ideal zum Loslegen: 1–3 Seiten, individuelles Design, SEO-Basics, Tracking, Launch in 2–3 Wochen.
              {STARTING_PRICE ? <> <span className="font-semibold text-foreground">Ab {STARTING_PRICE}</span>.</> : null}
            </p>
            <Button size="lg" onClick={onContactClick} aria-label="Unverbindliche Erstberatung vereinbaren">
              Kostenlose Erstberatung
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
