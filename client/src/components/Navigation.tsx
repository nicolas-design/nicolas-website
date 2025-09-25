// client/src/components/Navigation.tsx
import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useI18n } from '@/i18n'

type NavigationProps = {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const { lang, setLang, t } = useI18n()

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navItems = useMemo(
    () => [
      { id: 'hero',     label: t('nav.home') },
      { id: 'services', label: t('nav.services') },
      { id: 'projects', label: t('nav.projects') },
      { id: 'about',    label: t('nav.about') },
      { id: 'contact',  label: t('nav.contact') },
    ],
    [t]
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    if (!isOpen) return
    const body = document.body
    const prev = body.style.overflow
    body.style.overflow = 'hidden'
    return () => { body.style.overflow = prev }
  }, [isOpen])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
    }
    setIsOpen(false)
  }

  const switchLang = () => setLang(lang === 'de' ? 'en' : 'de')

  const iconBtn =
    'w-10 h-10 shrink-0 text-foreground hover:bg-foreground/5 dark:hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-all duration-300 ${
          scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        {/* Full-width bar that always matches the screen width */}
        <nav className="w-screen box-border px-4 sm:px-6" role="navigation" aria-label="Main">
          {/* Flex row: left & right hug edges, middle centers on desktop */}
          <div className="h-14 w-full flex items-center justify-between">
            {/* Left: Logo (fixed width to avoid font-metric wiggles) */}
            <div
              className="w-[110px] min-w-[110px] max-w-[110px] truncate cursor-pointer text-xl font-bold text-foreground hover-elevate"
              onClick={() => scrollToSection('hero')}
              data-testid="logo"
              title="Portfolio"
            >
              Portfolio
            </div>

            {/* Center: Desktop nav */}
            <div className="hidden md:flex flex-1 items-center justify-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  data-testid={`nav-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right: actions — desktop */}
            <div className="hidden md:flex items-center justify-end gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(v => !v)}
                aria-pressed={darkMode}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                data-testid="theme-toggle"
                className={iconBtn}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={switchLang} aria-label="Switch language">
                {lang === 'de' ? 'EN' : 'DE'}
              </Button>
            </div>

            {/* Right: actions — mobile (stick to edge via justify-between on parent) */}
            <div className="md:hidden flex items-center justify-end gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(v => !v)}
                aria-pressed={darkMode}
                aria-label={darkMode ? 'Helles Design aktivieren' : 'Dunkles Design aktivieren'}
                data-testid="theme-toggle-mobile"
                className={iconBtn}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(v => !v)}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                data-testid="mobile-menu-toggle"
                className={iconBtn}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      {isOpen && (
  <div
    id="mobile-menu"
    className="fixed inset-x-0 top-14 z-[70] md:hidden box-border px-4"
    style={{
      // keep at least 1rem padding, but respect safe-area notches
      paddingLeft: 'max(1rem, env(safe-area-inset-left))',
      paddingRight: 'max(1rem, env(safe-area-inset-right))',
    }}
  >
    <div className="w-full max-w-[720px] mx-auto overflow-hidden rounded-xl border border-border bg-card shadow-lg backdrop-blur supports-[backdrop-filter]:bg-card/95">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium text-foreground/80">Menu</span>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={switchLang} aria-label="Switch language">
            {lang === 'de' ? 'EN' : 'DE'}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDarkMode(v => !v)}
            aria-pressed={darkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-10 h-10"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div className="max-h-[70vh] overflow-auto">
        <div className="flex flex-col divide-y divide-border">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`
                w-full px-4 py-3.5 text-left text-base font-medium transition-colors
                ${activeSection === item.id ? 'text-primary' : 'text-foreground'}
                hover:bg-foreground/[0.04] dark:hover:bg-white/5
              `}
              data-testid={`mobile-nav-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
)}

    </>
  )
}
