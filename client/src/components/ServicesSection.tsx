import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Globe, Smartphone, Settings, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface ServicesSectionProps {
  onContactClick: () => void
}

export default function ServicesSection({ onContactClick }: ServicesSectionProps) {
  const services = [
    {
      icon: Globe,
      title: 'Webentwicklung',
      description: 'Moderne, responsive Websites und Webanwendungen',
      features: [
        'React & Next.js Entwicklung',
        'Responsive Design',
        'SEO-Optimierung',
        'Performance-Optimierung'
      ]
    },
    {
      icon: Smartphone,
      title: 'App-Entwicklung',
      description: 'Native und Cross-Platform mobile Anwendungen',
      features: [
        'React Native',
        'iOS & Android',
        'API-Integration',
        'Cloud-Backend'
      ]
    },
    {
      icon: Settings,
      title: 'Digitale Lösungen',
      description: 'Maßgeschneiderte Software für Ihr Unternehmen',
      features: [
        'Automatisierung',
        'Datenanalyse',
        'Systemintegration',
        'Cloud-Lösungen'
      ]
    }
  ]

  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" data-testid="services-title">
            Meine Services
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto" data-testid="services-subtitle">
            Von der Konzeption bis zur Umsetzung - ich biete umfassende Entwicklungsdienstleistungen 
            mit einem fairen und transparenten Preissystem.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover-elevate" data-testid={`service-card-${index}`}>
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3" data-testid={`service-title-${index}`}>
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6" data-testid={`service-description-${index}`}>
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex} 
                        className="flex items-center gap-3"
                        data-testid={`service-feature-${index}-${featureIndex}`}
                      >
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-card p-8 rounded-lg border mb-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4" data-testid="pricing-title">
              Faires Preissystem
            </h3>
            <p className="text-muted-foreground mb-6" data-testid="pricing-description">
              Transparente Preisgestaltung ohne versteckte Kosten. Ich biete flexible Lösungen, 
              die zu Ihrem Budget und Ihren Anforderungen passen.
            </p>
            <Button 
              size="lg" 
              onClick={onContactClick}
              data-testid="button-pricing-contact"
            >
              Kostenlos beraten lassen
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}