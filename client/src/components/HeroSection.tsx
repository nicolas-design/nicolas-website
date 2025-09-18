import { Button } from '@/components/ui/button'
import { ChevronDown, Github, Linkedin, Mail, Code2, Sparkles, Coffee } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface HeroSectionProps {
  onScrollToContact: () => void
}

export default function HeroSection({ onScrollToContact }: HeroSectionProps) {
  const [currentRole, setCurrentRole] = useState(0)
  const roles = [
    "Frontend Enthusiast 🎨",
    "Backend Architekt 🏗️", 
    "Problem Solver 💡",
    "Coffee Addict ☕"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const FloatingElement = ({ delay, children, className }: any) => (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
        rotate: [0, 180, 360, 360]
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        repeatDelay: 2
      }}
    >
      {children}
    </motion.div>
  )

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 200, 255, 0.05) 0%, transparent 50%),
          linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)
        `
      }}
    >
      {/* Floating Creative Elements */}
      <FloatingElement delay={0} className="top-20 left-10 text-primary/20">
        <Code2 size={32} />
      </FloatingElement>
      <FloatingElement delay={2} className="top-40 right-20 text-purple-400/20">
        <Sparkles size={28} />
      </FloatingElement>
      <FloatingElement delay={4} className="bottom-40 left-20 text-blue-400/20">
        <Coffee size={30} />
      </FloatingElement>
      <FloatingElement delay={6} className="top-60 right-10 text-pink-400/20">
        <Github size={26} />
      </FloatingElement>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Kreativer Name mit Glitch-Effekt */}
          <motion.div className="relative mb-6">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent" data-testid="hero-name">
              Max Mustermann
            </h1>
            <motion.div
              className="absolute inset-0 text-5xl md:text-7xl font-bold text-primary/10"
              animate={{
                x: [0, -2, 2, 0],
                y: [0, 1, -1, 0]
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut"
              }}
            >
              Max Mustermann
            </motion.div>
          </motion.div>

          {/* Animierte Rolle */}
          <div className="h-16 mb-8">
            <motion.h2 
              key={currentRole}
              className="text-xl md:text-3xl font-semibold text-primary"
              initial={{ opacity: 0, rotateX: -90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0, rotateX: 90 }}
              transition={{ duration: 0.5 }}
              data-testid="hero-title"
            >
              {roles[currentRole]}
            </motion.h2>
          </div>

          {/* Persönlichere Beschreibung */}
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            data-testid="hero-tagline"
          >
            Hey! Ich bin ein leidenschaftlicher Developer, der gerne{' '}
            <span className="text-primary font-semibold">komplexe Probleme</span>{' '}
            in elegante Lösungen verwandelt. Von der ersten Skizze bis zum finalen Deploy - 
            ich liebe es, wenn{' '}
            <span className="text-purple-500 font-semibold">Code zum Leben erwacht</span>! 🚀
          </motion.p>
          
          {/* Kreative CTAs */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Button 
              size="lg" 
              onClick={onScrollToContact}
              className="relative overflow-hidden group"
              data-testid="button-contact-cta"
            >
              <span className="relative z-10">Lass uns quatschen! 💬</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </Button>
            
            <div className="flex gap-4">
              {[
                { icon: Github, color: "hover:text-purple-400", label: "GitHub" },
                { icon: Linkedin, color: "hover:text-blue-400", label: "LinkedIn" },
                { icon: Mail, color: "hover:text-green-400", label: "Email" }
              ].map((social, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`relative group ${social.color} transition-all duration-300`}
                    data-testid={`link-${social.label.toLowerCase()}`}
                  >
                    <social.icon className="h-5 w-5" />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-current opacity-10"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Fun Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 max-w-lg mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {[
              { number: "500+", label: "Commits", icon: "🚀" },
              { number: "24/7", label: "Debug Mode", icon: "🐛" },
              { number: "∞", label: "Coffee Cups", icon: "☕" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-2xl">{stat.icon}</div>
                <div className="text-xl font-bold text-primary">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Animierter Scroll Indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors group"
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        data-testid="button-scroll-down"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </motion.button>
    </section>
  )
}