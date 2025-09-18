import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com',
      testId: 'footer-github'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      testId: 'footer-linkedin'
    },
    {
      icon: Mail,
      label: 'E-Mail',
      href: 'mailto:max.mustermann@email.com',
      testId: 'footer-email'
    }
  ]

  const quickLinks = [
    { label: 'Über mich', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projekte', href: '#projects' },
    { label: 'Kontakt', href: '#contact' }
  ]

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.open(href, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <footer className="bg-card border-t">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-lg font-bold mb-4" data-testid="footer-brand">
              Max Mustermann
            </h3>
            <p className="text-muted-foreground mb-6" data-testid="footer-description">
              Software Developer mit Leidenschaft für moderne, 
              benutzerfreundliche digitale Lösungen.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  onClick={() => scrollToSection(link.href)}
                  aria-label={link.label}
                  data-testid={link.testId}
                >
                  <link.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4" data-testid="footer-quick-links-title">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    data-testid={`footer-link-${index}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4" data-testid="footer-contact-title">
              Kontakt
            </h4>
            <div className="space-y-3 text-sm">
              <p className="text-muted-foreground" data-testid="footer-email-info">
                max.mustermann@email.com
              </p>
              <p className="text-muted-foreground" data-testid="footer-phone-info">
                +49 123 456 789
              </p>
              <p className="text-muted-foreground" data-testid="footer-location-info">
                Berlin, Deutschland
              </p>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm" data-testid="footer-copyright">
            © {currentYear} Max Mustermann. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <span>Entwickelt mit</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>und React</span>
          </div>
        </div>
      </div>
    </footer>
  )
}