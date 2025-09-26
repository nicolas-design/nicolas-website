// client/src/components/Footer.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail, Heart, Phone as PhoneIcon, MapPin } from 'lucide-react'
import { useI18n } from '@/i18n'

export default function Footer() {
  const { t } = useI18n()
  const currentYear = new Date().getFullYear()

  // Werte ggf. aus ENV/Config ziehen
  const EMAIL = 'gadnernicolas@gmail.com'
  const PHONE = '+43 678 1227369'
 

  const socialLinks = [
    { icon: Github,  label: 'GitHub',                         href: 'https://github.com',           testId: 'footer-github' },
    { icon: Linkedin,label: 'LinkedIn',                       href: 'https://linkedin.com',         testId: 'footer-linkedin' },
    { icon: Mail,    label: t('contact.form.email.label'),    href: `mailto:${EMAIL}`,              testId: 'footer-email' },
  ]

  const quickLinks = [
    { label: t('nav.about'),    href: '#about' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.contact'),  href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.getElementById(href.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.open(href, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-foreground" data-testid="footer-brand">
              {t('footer.brand')}
            </h3>
            <p className="mb-6 text-sm text-foreground/80" data-testid="footer-description">
              {t('footer.desc')}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <Button
                  key={link.testId}
                  variant="ghost"
                  size="icon"
                  onClick={() => scrollToSection(link.href)}
                  aria-label={link.label}
                  data-testid={link.testId}
                  className="text-foreground hover:text-primary hover:bg-foreground/5 dark:hover:bg-white/10"
                >
                  <link.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground" data-testid="footer-quick-links-title">
              {t('footer.quicklinks.title')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm transition-colors text-foreground/80 hover:text-primary"
                    data-testid={`footer-link-${i}`}
                    aria-label={link.label}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground" data-testid="footer-contact-title">
              {t('footer.contact.title')}
            </h4>
            <div className="space-y-3 text-sm">
              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" aria-hidden />
                <div>
                  <p className="font-medium text-foreground">{t('contact.form.email.label')}</p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-foreground/80 hover:text-primary transition-colors"
                    data-testid="footer-email-info"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-4 w-4 text-primary" aria-hidden />
                <div>
                  <p className="font-medium text-foreground">{t('contact.info.phone')}</p>
                  <a
                    href={`tel:${PHONE.replace(/\s+/g, '')}`}
                    className="text-foreground/80 hover:text-primary transition-colors"
                    data-testid="footer-phone-info"
                  >
                    {PHONE}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" aria-hidden />
                <div>
                  <p className="font-medium text-foreground">{t('contact.info.location')}</p>
                  <p className="text-foreground/80" data-testid="footer-location-info">
                    {t('contact.info.location2')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/70" data-testid="footer-copyright">
            © {currentYear} {t('footer.brand')}. {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-1 text-sm text-foreground/70" data-testid="footer-builtwith">
            <span>{t('footer.builtWith')}</span>
            <Heart className="h-4 w-4 text-red-500" aria-hidden />
            <span>{t('footer.andReact')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
