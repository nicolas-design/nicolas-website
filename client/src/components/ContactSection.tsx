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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import type { InsertContactMessage } from '@shared/schema'

export default function ContactSection() {
  const { toast } = useToast()
  
  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })

  const handleSubmit = async (data: InsertContactMessage) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      const result = await response.json()
      
      if (result.success) {
        toast({
          title: "Nachricht gesendet! 🎉",
          description: "Vielen Dank für Ihre Nachricht. Ich melde mich bald bei Ihnen!",
        })
        form.reset()
      } else {
        throw new Error(result.error || 'Unbekannter Fehler')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      toast({
        title: "Fehler beim Senden 😔",
        description: error instanceof Error ? error.message : "Etwas ist schiefgelaufen. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      })
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'E-Mail',
      value: 'max.mustermann@email.com',
      link: 'mailto:max.mustermann@email.com'
    },
    {
      icon: Phone,
      title: 'Telefon',
      value: '+49 123 456 789',
      link: 'tel:+49123456789'
    },
    {
      icon: MapPin,
      title: 'Standort',
      value: 'Berlin, Deutschland',
      link: null
    }
  ]

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "backOut" }}
            data-testid="contact-title"
          >
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Lass uns quatschen!
            </span>
            <motion.span 
              className="inline-block ml-2"
              animate={{ 
                rotate: [0, 20, -20, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              💬
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground text-center mb-16 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            data-testid="contact-subtitle"
          >
            Hast du eine{' '}
            <span className="text-primary font-semibold">verrückte Idee</span>? 
            Brauchst du Hilfe bei einem Projekt? Oder willst du einfach nur{' '}
            <span className="text-purple-500 font-semibold">über Code philosophieren</span>? 
            <br />
            Ich freue mich auf deine Nachricht! ✨🚀
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card>
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
                              placeholder="Beschreiben Sie Ihr Projekt oder Ihre Anfrage..."
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
                        'Wird gesendet...'
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Nachricht senden
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-6" data-testid="contact-info-title">
                  Kontaktinformationen
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-4"
                      data-testid={`contact-info-${index}`}
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{info.title}</p>
                        {info.link ? (
                          <a 
                            href={info.link}
                            className="text-muted-foreground hover:text-primary transition-colors"
                            data-testid={`contact-link-${index}`}
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

              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3" data-testid="response-time-title">
                    Antwortzeit
                  </h4>
                  <p className="text-muted-foreground text-sm mb-4" data-testid="response-time-description">
                    Ich antworte normalerweise innerhalb von 24 Stunden auf alle Anfragen. 
                    Bei dringenden Projekten auch schneller.
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 dark:text-green-400">
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