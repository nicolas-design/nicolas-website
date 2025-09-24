import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import ProjectsSection from '@/components/ProjectsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import HeroApril from '@/components/AprilHero'

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero')

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
      setActiveSection('contact')
    }
  }

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'services', 'projects', 'contact']
      const scrollPosition = window.scrollY + 100

      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        <HeroApril />
        
        <ServicesSection onContactClick={scrollToContact} />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}