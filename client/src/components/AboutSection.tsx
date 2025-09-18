import { Card, CardContent } from '@/components/ui/card'
import { GraduationCap, Briefcase, Code, Award, Heart, Zap, Target, Lightbulb } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function AboutSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const achievements = [
    {
      icon: GraduationCap,
      emoji: "🎓",
      title: 'Bachelor in Software Engineering & Digital Business',
      description: 'Fundierte Ausbildung in moderner Softwareentwicklung und digitalen Geschäftsmodellen',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: Briefcase,
      emoji: "💼",
      title: '1+ Jahr Berufserfahrung',
      description: 'Praktische Erfahrung in einem Software-Entwicklungsunternehmen',
      color: 'from-green-500 to-blue-500'
    },
    {
      icon: Code,
      emoji: "⚡",
      title: 'Vielfältige Projekte',
      description: 'Entwicklung verschiedener Websites und Apps für unterschiedliche Branchen',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Award,
      emoji: "🏆",
      title: 'Qualitätsorientiert',
      description: 'Fokus auf sauberen Code, beste Praktiken und benutzerfreundliche Lösungen',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const passions = [
    { icon: Heart, text: "Problemlösung", color: "text-red-500" },
    { icon: Zap, text: "Innovation", color: "text-yellow-500" },
    { icon: Target, text: "Perfektion", color: "text-blue-500" },
    { icon: Lightbulb, text: "Kreativität", color: "text-green-500" }
  ]

  return (
    <section id="about" className="py-24 bg-background relative">
      {/* Creative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "backOut" }}
              data-testid="about-title"
            >
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Meine Story
              </span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              data-testid="about-subtitle"
            >
              <p className="mb-6">
                Ich bin nicht nur ein Developer - ich bin ein{' '}
                <span className="text-primary font-semibold">digitaler Geschichtenerzähler</span>! 📖
              </p>
              <p>
                Jede Zeile Code ist für mich wie ein Pinselstrich auf einer Leinwand. 
                Seit über einem Jahr verwandle ich{' '}
                <span className="text-purple-500 font-semibold">verrückte Ideen</span>{' '}
                in funktionierende Realität. 🎨✨
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Achievements Grid with Creative Hover Effects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateY: -45 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "backOut" }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card className="h-full relative overflow-hidden group cursor-pointer" data-testid={`achievement-card-${index}`}>
                {/* Gradient Background on Hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  animate={hoveredCard === index ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <CardContent className="p-6 text-center relative z-10">
                  <motion.div 
                    className="relative mb-6"
                    animate={hoveredCard === index ? { 
                      scale: 1.2, 
                      rotate: [0, -10, 10, 0],
                      y: -5
                    } : { scale: 1, rotate: 0, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-4xl mb-2">{achievement.emoji}</div>
                    <div className={`w-16 h-16 bg-gradient-to-br ${achievement.color} opacity-20 rounded-2xl flex items-center justify-center mx-auto`}>
                      <achievement.icon className="h-8 w-8 text-primary" />
                    </div>
                  </motion.div>
                  
                  <motion.h3 
                    className="font-bold mb-3 text-sm"
                    animate={hoveredCard === index ? { color: "hsl(var(--primary))" } : {}}
                    data-testid={`achievement-title-${index}`}
                  >
                    {achievement.title}
                  </motion.h3>
                  
                  <p className="text-muted-foreground text-sm" data-testid={`achievement-description-${index}`}>
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Personal Philosophy Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-8">Was mich antreibt 🔥</h3>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {passions.map((passion, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 bg-card/50 backdrop-blur-sm px-6 py-3 rounded-full border"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              >
                <passion.icon className={`h-5 w-5 ${passion.color}`} />
                <span className="font-medium">{passion.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Personal Quote */}
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <blockquote className="text-xl md:text-2xl text-muted-foreground italic leading-relaxed mb-6" data-testid="about-description">
            "Code ist Poesie in Aktion. Jedes Projekt ist eine neue Chance, 
            etwas Einzigartiges zu schaffen und das Leben von Menschen zu verbessern. 
            <span className="text-primary font-semibold not-italic"> 
              Das ist es, was mich jeden Tag motiviert! 
            </span> 🚀"
          </blockquote>
          <motion.div
            className="w-16 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
          />
        </motion.div>
      </div>
    </section>
  )
}