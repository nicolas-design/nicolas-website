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
import { buildInsertContactMessageSchema } from '@shared/schema';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form'
import type { InsertContactMessage } from '@shared/schema'
import { useI18n } from '@/i18n'

export default function ContactSection() {
  const { t } = useI18n()
  const { toast } = useToast()

  const schema = buildInsertContactMessageSchema({
    t: (key) => t(key), 
    minMessage: 3,       // <- hier kannst du auch 1 setzen, wenn gewünscht
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', message: '' }
  });

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
        description:
          err instanceof Error ? err.message : t('contact.form.toastr.err.desc'),
        variant: 'destructive',
      })
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      // nutzt vorhandenen Form-Label-Key für "E-Mail"
      title: t('contact.form.email.label'),
      value: 'gadnernicolas@gmail.com',
      link: 'mailto:gadnernicolas@gmail.com',
    },
    {
      icon: Phone,
      // kein Key vorhanden -> vorerst hartkodiert (kann ich gern ergänzen)
      title: t('contact.info.phone'),
      value: '+43 678 1227369',
      link: 'tel:+436781227369',
    },
    {
      icon: MapPin,
      // kein Key vorhanden -> vorerst hartkodiert (kann ich gern ergänzen)
      title: t('contact.info.location'),
      value: t('contact.info.location2'),
      link: null,
    },
  ] as const

  return (
    <section id="contact" className="py-24 bg-white dark:bg-[hsl(222_15%_12%)] dark:to-[hsl(222_15%_11%)] border-t">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
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
          {/* Formular */}
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

          {/* Kontaktinfos */}
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

              <Card className="bg-card">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 text-foreground">{t('contact.response.title')}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('contact.response.desc')}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-sm text-emerald-600 dark:text-emerald-400">
                      {t('contact.response.available')}
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
