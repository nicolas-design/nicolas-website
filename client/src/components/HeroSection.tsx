import { Button } from '@/components/ui/button'
import { ChevronDown, Github, Linkedin, Mail, Code2, Sparkles, Coffee } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface HeroSectionProps {
  onScrollToContact: () => void
}

/*
 * A refined hero section component designed for a portfolio website.
 * This version uses neutral text colours and a subtle animated background
 * to draw attention to your name and tagline without overpowering them.
 * All animations respect user preferences for reduced motion.
 */
export default function HeroSection({ onScrollToContact }: HeroSectionProps) {
  const [currentRole, setCurrentRole] = useState(0)
  const roles = [
    'Frontend Enthusiast 🎨',
    'Backend Architekt 🏗️',
    'Problem Solver 💡',
    'Surf Addict 🏄‍♂️'
  ]

  const reduce = useReducedMotion()

  // Cycle through the roles every 3 seconds, unless the user prefers reduced motion.
  useEffect(() => {
    if (reduce) return
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [reduce])

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' })
  }

  // Floating decorative icons shown only on medium and larger screens.
  const FloatingIcon = ({ delay, children, className }: any) => (
    <motion.div
      className={`absolute hidden md:block ${className}`}
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={reduce ? undefined : { opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
      transition={reduce ? undefined : { duration: 8, delay, repeat: Infinity, repeatDelay: 2 }}
    >
      {children}
    </motion.div>
  )

  return (
    <section
      id="hero"
      className="relative isolate min-h-screen flex items-center justify-center overflow-hidden bg-[hsl(var(--background))]"
    >
      {/*
        Animated background composed of soft gradients and noise. The colours are muted and
        layered to add depth without distracting from the content.
      */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Subtle grid pattern for structure */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(1200px 600px at 50% 20%, black 0%, transparent 70%)'
          }}
        />
        {/* Moving gradient layer */}
        <motion.div
          className="absolute -inset-[20%] blur-3xl opacity-60"
          style={{
            background:
              'radial-gradient(45% 35% at 20% 30%, rgba(99,102,241,0.28), transparent 60%), radial-gradient(40% 30% at 80% 35%, rgba(236,72,153,0.28), transparent 60%), radial-gradient(35% 30% at 50% 80%, rgba(56,189,248,0.28), transparent 60%)'
          }}
          animate={reduce ? undefined : { rotate: [0, 360], scale: [1, 1.05, 1] }}
          transition={reduce ? undefined : { duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        {/* Noise overlay to break up banding */}
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\" viewBox=\"0 0 100 100%\"><filter id=\"n\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(#n)\" opacity=\"0.6\"/></svg>')",
            backgroundSize: '300px 300px'
          }}
        />
        {/* Vignette to improve contrast in the centre */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(1100px 550px at 50% 30%, transparent 0%, rgba(0,0,0,0.35) 70%)'
          }}
        />
      </div>

      {/* Floating icons around the hero section */}
      <FloatingIcon delay={0} className="top-20 left-10 text-primary/30">
        <Code2 size={28} />
      </FloatingIcon>
      <FloatingIcon delay={2} className="top-40 right-20 text-purple-400/30">
        <Sparkles size={24} />
      </FloatingIcon>
      <FloatingIcon delay={4} className="bottom-40 left-20 text-blue-400/30">
        <Coffee size={26} />
      </FloatingIcon>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Name and tagline */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="relative mb-6">
            {/* Use neutral text colours instead of gradients */}
            <h1
               className="text-5xl md:text-7xl font-bold text-primary drop-shadow-sm"
              data-testid="hero-name"
            >
              Nicolas Gadner
            </h1>
            {/* Optional shadow glitch for subtle depth */}
            {!reduce && (
              <motion.div
                className="absolute inset-0 text-5xl md:text-7xl font-bold text-primary/10"
                animate={{ x: [0, -2, 2, 0], y: [0, 1, -1, 0] }}
                transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
                aria-hidden
              >
                Nicolas Gadner
              </motion.div>
            )}
          </div>
          {/* Role/Subtitle cycling */}
          <div className="h-16 mb-8" aria-live="polite">
            <motion.h2
              key={currentRole}
              className="text-xl md:text-3xl font-semibold text-muted-foreground"
              initial={{ opacity: 0, rotateX: -90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0, rotateX: 90 }}
              transition={{ duration: 0.5 }}
              data-testid="hero-title"
            >
              {roles[currentRole]}
            </motion.h2>
          </div>
          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            data-testid="hero-tagline"
          >
            Hey! Ich bin ein leidenschaftlicher Developer, der{' '}
            <span className="text-primary font-semibold">komplexe Probleme</span>{' '}
            in elegante Lösungen verwandelt – von der ersten Skizze bis zum finalen Deploy.{' '}
            <span className="text-accent font-semibold">
              Wenn Code zum Leben erwacht
            </span>
            , bin ich happy. 🚀
          </motion.p>
        </motion.header>
        {/* Call-to-action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
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
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.25 }}
            />
          </Button>
          {/* Social links with icons */}
          <div className="flex gap-2 sm:gap-4">
            {[
              { icon: Github, href: 'https://github.com/DEIN_GITHUB', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/DEIN_LINKEDIN', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:deine@mail.tld', label: 'Email' }
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 4 }}
                whileTap={{ scale: 0.95 }}
                aria-label={label}
              >
                <Button variant="ghost" size="icon" className="relative group">
                  <Icon className="h-5 w-5" />
                  <motion.span
                    className="absolute inset-0 rounded-full bg-primary/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    aria-hidden
                  />
                </Button>
              </motion.a>
            ))}
          </div>
        </motion.div>
        {/* Fun stats */}
        <motion.div
          className="grid grid-cols-3 gap-6 max-w-lg mx-auto text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          {[
            { number: '500+', label: 'Commits', icon: '🚀' },
            { number: '24/7', label: 'Debug Mode', icon: '🐛' },
            { number: '∞', label: 'Coffee Cups', icon: '☕' }
          ].map(({ number, label, icon }) => (
            <div key={label} className="space-y-1">
              <div className="text-2xl">{icon}</div>
              <div className="text-xl font-bold text-primary">{number}</div>
              <div className="text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors group"
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        whileHover={{ scale: 1.05 }}
        data-testid="button-scroll-down"
        aria-label="Weiter scrollen"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </motion.button>
    </section>
  )
}