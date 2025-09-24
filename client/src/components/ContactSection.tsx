// client/src/components/ContactSection.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { insertContactMessageSchema } from '@shared/schema'
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form'
import type { InsertContactMessage } from '@shared/schema'

export default function ContactSection() {
  const { toast } = useToast()

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: { name: '', email: '', message: '' },
    mode: 'onTouched',
  })

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
          title: 'Nachricht gesendet',
          description: 'Danke! Ich melde mich zeitnah mit einer kurzen Einschätzung.',
        })
        form.reset()
      } else {
        throw new Error(result?.error || 'Senden fehlgeschlagen')
      }
    } catch (err) {
      toast({
        title: 'Fehler beim Senden',
        description: err instanceof Error ? err.message : 'Unerwarteter Fehler',
        variant: 'destructive',
      })
    }
  }

  const contactInfo = [
    { icon: Mail, title: 'E-Mail',   value: 'deine.mail@domain.com', link: 'mailto:deine.mail@domain.com' },
    { icon: Phone, title: 'Telefon', value: '+43 660 0000000',       link: 'tel:+436600000000' },
    { icon: MapPin, title: 'Standort', value: 'Tirol, Österreich',   link: null },
  ] as const

  return (
    <section id="contact" className="py-24 bg-white dark:bg-background border-t">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Unverbindlich anfragen. <span className="text-primary">Schnelle Rückmeldung.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-3 max-w-3xl mx-auto">
            Kurz beschreiben, was Sie brauchen – ich melde mich innerhalb von 24&nbsp;Stunden.
            Auf Wunsch erhalten Sie ein fixes Angebot mit Timeline.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Formular */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Nachricht senden</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ihr vollständiger Name"
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
                          <FormLabel>E-Mail</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="ihre.email@example.com"
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
                          <FormLabel>Nachricht</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Kurze Projektbeschreibung, Ziele, Timing …"
                              className="min-h-32"
                              data-testid="input-message"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={form.formState.isSubmitting}
                      data-testid="button-submit"
                    >
                      {form.formState.isSubmitting ? (
                        'Wird gesendet …'
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Nachricht senden
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      100&nbsp;% Geld-zurück-Garantie innerhalb von 30 Tagen nach Launch, wenn Sie nicht zufrieden sind.
                      Ihre Daten werden nur zur Beantwortung Ihrer Anfrage verwendet.
                    </p>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Kontaktinfos */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-6">Kontaktinformationen</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{info.title}</p>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-muted-foreground hover:text-primary transition-colors"
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

              <Card className="bg-card">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3">Antwortzeit</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    In der Regel innerhalb von 24 Stunden. Bei dringenden Projekten schneller.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-sm text-emerald-600 dark:text-emerald-400">
                      Verfügbar für neue Projekte
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
