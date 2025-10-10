// client/src/components/ContactSection.tsx
'use client'

import { useEffect, useSyncExternalStore, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin, Send, Video } from 'lucide-react'
import { motion } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { buildInsertContactMessageSchema } from '@shared/schema'
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form'
import type { InsertContactMessage } from '@shared/schema'
import { useI18n } from '@/i18n'

// Cal.com Embed
import Cal, { getCalApi } from '@calcom/embed-react'

/* ---------------------------------
 * Dark-mode subscription (html.dark)
 * --------------------------------*/
function useHtmlDark(): boolean {
  const subscribe = (cb: () => void) => {
    const obs = new MutationObserver(cb)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }
  const getSnapshot = () => document.documentElement.classList.contains('dark')
  const getServerSnapshot = () => false
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

// Optional: only keep if you want to tint the popup background/text via embed
const calBrandingFor = (dark: boolean) => ({
  brandColor: '#6558F5',              // your primary
  textColor: dark ? '#E5E7EB' : '#0F172A',
  backgroundColor: dark ? '#0B1220' : '#FFFFFF',
})

export default function ContactSection() {
  const { t } = useI18n()
  const { toast } = useToast()
  const dark = useHtmlDark()

  const schema = buildInsertContactMessageSchema({
    t: (key) => t(key),
    minMessage: 3,
  })

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', message: '' }
  })

  // Cal link (prefer ENV)
  const rawCal = import.meta.env.VITE_CALL_LINK as string | undefined
  const calLink = (typeof rawCal === 'string' && rawCal.trim()) ? rawCal.trim() : 'test'

  // Theme-keyed namespace prevents Cal from reusing stale UI
  const ns = useMemo(() => `contact-${dark ? 'dark' : 'light'}`, [dark])

  // Re-apply UI whenever theme/namespace flips, and preload so first open is fresh
  useEffect(() => {
    let cancelled = false
    const id = setTimeout(() => {
      getCalApi({ namespace: ns }).then((cal) => {
        if (cancelled) return
        cal('ui', {
          theme: dark ? 'dark' : 'light',
          layout: 'month_view',
          // If you want Cal dashboard to own colors, remove "styles" below.
          styles: { branding: calBrandingFor(dark) },
        })
        cal('preload', { calLink })
      })
    }, 0)
    return () => { cancelled = true; clearTimeout(id) }
  }, [ns, dark, calLink])


  
  
  const handleSubmit = async (data: InsertContactMessage) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (res.ok && result?.success) {
        toast({
          title: t('contact.form.toastr.ok.title'),
          description: t('contact.form.toastr.ok.desc'),
        })
        form.reset()
      } else {
        throw new Error(result?.error || t('contact.form.toastr.err.title'))
      }
    } catch (err) {
      toast({
        title: t('contact.form.toastr.err.title'),
        description: err instanceof Error ? err.message : t('contact.form.toastr.err.desc'),
        variant: 'destructive',
      })
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.form.email.label'),
      value: 'nicolas@gadner.dev',
      link: 'mailto:nicolas@gadner.dev',
    },
    {
      icon: Phone,
      title: t('contact.info.phone'),
      value: '+43 678 1227369',
      link: 'tel:+436781227369',
    },
    {
      icon: MapPin,
      title: t('contact.info.location'),
      value: t('contact.info.location2'),
      link: null,
    },
  ] as const

  // Live values for Cal config
  const name = form.watch('name')
  const email = form.watch('email')
  const notes = form.watch('message')

  return (
    <section id="contact" className="py-24 bg-white dark:bg-[hsl(222_15%_12%)] border-t">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="
            inline-flex items-center gap-2 rounded-full mb-4
            bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/20
            dark:bg-primary/20 dark:text-primary dark:ring-primary/30
          ">
            {t('contact.contact')}
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            {t('contact.title.leading')}
            <span className="text-primary">{t('contact.title.highlight')}</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-3 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">{t('contact.form.submit')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">{t('contact.form.name.label')}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t('contact.form.name.placeholder')}
                              autoComplete="name"
                              data-testid="input-name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">{t('contact.form.email.label')}</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={t('contact.form.email.placeholder')}
                              autoComplete="email"
                              inputMode="email"
                              data-testid="input-email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">{t('contact.form.message.label')}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t('contact.form.message.placeholder')}
                              className="min-h-32"
                              data-testid="input-message"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Primary submit */}
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={form.formState.isSubmitting}
                      data-testid="button-submit"
                      aria-label={t('contact.form.submit')}
                    >
                      {form.formState.isSubmitting ? (
                        t('contact.form.sending')
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          {t('contact.form.submit')}
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      {t('contact.legal.note')}
                    </p>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          {/* MOBILE CTA directly under header */}
          <BookingCTA
            className="mb-12 lg:hidden"
            ns={ns}
            calLink={calLink}
            name={name}
            email={email}
            notes={notes}
            t={t}
          />

          {/* Contact info + DESKTOP sticky CTA */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-6 text-foreground">{t('contact.info.title')}</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="
                        flex h-10 w-10 items-center justify-center rounded-lg
                        bg-primary/10 ring-1 ring-primary/20
                        dark:bg-white/10 dark:ring-white/15
                      ">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{info.title}</p>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="transition-colors text-foreground/80 hover:text-primary dark:text-foreground hover:dark:text-primary"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop sticky CTA */}
              <div className="hidden lg:block lg:sticky lg:top-24">
                <BookingCTA
                  ns={ns}
                  calLink={calLink}
                  name={name}
                  email={email}
                  notes={notes}
                  t={t}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hidden Cal iframe — remount and re-namespaced per theme */}
      <Cal
        key={ns}
        namespace={ns}
        calLink={calLink}
        // You can omit config since we call cal('ui', …) above, but keeping it is fine:
        // config={{ theme: dark ? 'dark' : 'light', layout: 'month_view' }}
        style={{ position: 'fixed', width: 0, height: 0, border: 0, opacity: 0, pointerEvents: 'none' }}
      />
    </section>
  )
}

/* ---------------------------
 * Reusable CTA components
 * --------------------------*/

function BookingCTA({
  className = '',
  ns,
  calLink,
  name,
  email,
  notes,
  t,
}: {
  className?: string
  ns: string
  calLink: string
  name?: string
  email?: string
  notes?: string
  t: (k: string) => string
}) {
  // IMPORTANT: don't include theme/styles here so global cal('ui', …) config wins
  const calConfig = useMemo(() => ({
    name: name || undefined,
    email: email || undefined,
    notes: notes || undefined,
    layout: 'month_view',
  }), [name, email, notes])

  return (
    <Card className={`bg-card ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
         

          <div className="flex-1">
            <h4 className="font-semibold mb-1 text-foreground">
              {t('contact.response.title')}
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              {t('contact.response.desc')}
            </p>

            <div className="flex items-center gap-2 mb-4">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-sm text-emerald-600 dark:text-emerald-400">
                {t('contact.response.available')}
              </span>
            </div>

            <Button
              type="button"
              data-cal-namespace={ns}
              data-cal-link={calLink}
              data-cal-config={JSON.stringify(calConfig)}
              className="w-full"
            >
              <Video className="mr-2 h-4 w-4" />
              {t('contact.response.cta') || 'Jetzt Video-Call buchen'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function InlineBookButton({
  ns,
  calLink,
  name,
  email,
  notes,
  label = 'Book a 15-min video call',
}: {
  ns: string
  calLink: string
  name?: string
  email?: string
  notes?: string
  label?: string
}) {
  return (
    <Button
      type="button"
      variant="outline"
      data-cal-namespace={ns}
      data-cal-link={calLink}
      data-cal-config={JSON.stringify({
        name: name || undefined,
        email: email || undefined,
        notes: notes || undefined,
        layout: 'month_view',
      })}
      className="mt-2"
    >
      <Video className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}
