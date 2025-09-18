import { Button } from '@/components/ui/button'
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

interface HeroSectionProps {
  onScrollToContact: () => void
}

export default function HeroSection({ onScrollToContact }: HeroSectionProps) {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30 relative"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6" data-testid="hero-name">
            Max Mustermann
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-primary mb-8" data-testid="hero-title">
            Software Developer
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto" data-testid="hero-tagline">
            Ich entwickle moderne, benutzerfreundliche Webanwendungen und digitale Lösungen, 
            die Ihr Unternehmen voranbringen.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              onClick={onScrollToContact}
              data-testid="button-contact-cta"
            >
              Kontakt aufnehmen
            </Button>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" data-testid="link-github">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="link-linkedin">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="link-email">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.button
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        data-testid="button-scroll-down"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </motion.button>
    </section>
  )
}