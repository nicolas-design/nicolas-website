import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // TODO: remove mock functionality - integrate with real backend
    console.log('Form submitted:', formData)
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Nachricht gesendet!",
        description: "Vielen Dank für Ihre Nachricht. Ich melde mich bald bei Ihnen.",
      })
      setFormData({ name: '', email: '', message: '' })
      setIsSubmitting(false)
    }, 1000)
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" data-testid="contact-title">
            Kontakt
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto" data-testid="contact-subtitle">
            Bereit für Ihr nächstes Projekt? Lassen Sie uns über Ihre Ideen sprechen 
            und gemeinsam eine maßgeschneiderte Lösung entwickeln.
          </p>
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Ihr vollständiger Name"
                      data-testid="input-name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">E-Mail</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="ihre.email@example.com"
                      data-testid="input-email"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Nachricht</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Beschreiben Sie Ihr Projekt oder Ihre Anfrage..."
                      className="min-h-32"
                      data-testid="input-message"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                    data-testid="button-submit"
                  >
                    {isSubmitting ? (
                      'Wird gesendet...'
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Nachricht senden
                      </>
                    )}
                  </Button>
                </form>
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