import { Card, CardContent } from '@/components/ui/card'
import { GraduationCap, Briefcase, Code, Award } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AboutSection() {
  const achievements = [
    {
      icon: GraduationCap,
      title: 'Bachelor in Software Engineering & Digital Business',
      description: 'Fundierte Ausbildung in moderner Softwareentwicklung und digitalen Geschäftsmodellen'
    },
    {
      icon: Briefcase,
      title: '1+ Jahr Berufserfahrung',
      description: 'Praktische Erfahrung in einem Software-Entwicklungsunternehmen'
    },
    {
      icon: Code,
      title: 'Vielfältige Projekte',
      description: 'Entwicklung verschiedener Websites und Apps für unterschiedliche Branchen'
    },
    {
      icon: Award,
      title: 'Qualitätsorientiert',
      description: 'Fokus auf sauberen Code, beste Praktiken und benutzerfreundliche Lösungen'
    }
  ]

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" data-testid="about-title">
            Über mich
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto" data-testid="about-subtitle">
            Als Software Developer bringe ich technische Expertise und kreative Problemlösung zusammen, 
            um digitale Lösungen zu schaffen, die wirklich einen Unterschied machen.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover-elevate" data-testid={`achievement-card-${index}`}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-sm" data-testid={`achievement-title-${index}`}>
                    {achievement.title}
                  </h3>
                  <p className="text-muted-foreground text-sm" data-testid={`achievement-description-${index}`}>
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto" data-testid="about-description">
            Meine Leidenschaft liegt darin, komplexe technische Herausforderungen in elegante, 
            benutzerfreundliche Lösungen zu verwandeln. Mit einem starken Fundament in Software Engineering 
            und dem Verständnis für digitale Geschäftsprozesse bringe ich sowohl technische Exzellenz 
            als auch strategisches Denken in jedes Projekt ein.
          </p>
        </motion.div>
      </div>
    </section>
  )
}