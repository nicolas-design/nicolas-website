// client/src/components/Navigation.tsx
import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useI18n } from '@/i18n'
import LogoWordmark from '@/components/LogoWordmark'

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
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null)
  const firstFocusableRef = useRef<HTMLButtonElement | null>(null)
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


  // Close on ESC and basic (soft) focus management
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        requestAnimationFrame(() => toggleBtnRef.current?.focus()) // <- add
      }
      // very light focus trap: loop focus within sheet
      if (e.key === 'Tab') {
        const focusables = Array.from(
          document.querySelectorAll<HTMLElement>('#mobile-menu [tabindex], #mobile-menu button, #mobile-menu a')
        ).filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'))
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        const active = document.activeElement as HTMLElement | null
        if (!e.shiftKey && active === last) { e.preventDefault(); first.focus() }
        if (e.shiftKey && active === first) { e.preventDefault(); last.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    // focus first control inside
    firstFocusableRef.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen])

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
        {/* Full-width bar that hugs the screen edges */}
        <nav className="w-screen box-border px-4 sm:px-6" role="navigation" aria-label="Main">
          <div className="h-14 w-full flex items-center justify-between">
            {/* Left: Logo (fixed width to avoid font metric wiggles) */}
        
            <button
  onClick={() => scrollToSection('hero')}
  title="gadner."
  aria-label="Go to home"
  className="inline-flex items-center cursor-pointer"
>
<LogoWordmark className="text-[28px] md:text-[32px]" accentDot />
</button>




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

            {/* Right: actions — desktop (theme + language) */}
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

            {/* Right: actions — mobile (ONLY language + hamburger) */}
            <div className="md:hidden flex items-center justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={switchLang}
                aria-label="Sprache wechseln"
                className="px-2 h-9"
              >
                {lang === 'de' ? 'EN' : 'DE'}
              </Button>

              <Button
              ref={toggleBtnRef}
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(v => !v)}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-haspopup="dialog"
                data-testid="mobile-menu-toggle"
                className={iconBtn}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile sheet (theme toggle lives here) */}
      {isOpen && (
        <div id="mobile-menu" className="fixed inset-0 z-[70] md:hidden" role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title">
          {/* Backdrop fills screen from below the header; close on outside click */}
          <div
            className="fixed inset-0 top-14 bg-black/40 backdrop-blur-[2px]"
            onPointerDown={() => {
              setIsOpen(false)
              // return focus to the hamburger
              requestAnimationFrame(() => toggleBtnRef.current?.focus())
            }}
          />
          {/* Sheet container; stop outside-close when interacting inside */}
          <div
            className="fixed left-0 right-0 top-14 w-full box-border"
            onPointerDown={e => e.stopPropagation()}
          >
            <div
              className="mx-auto box-border w-full max-w-full overflow-hidden rounded-xl border border-border bg-card shadow-lg backdrop-blur supports-[backdrop-filter]:bg-card/95"
              style={{
                maxWidth:
                  'min(720px, calc(100svw - max(2rem, env(safe-area-inset-left) + env(safe-area-inset-right))))',
              } as React.CSSProperties}
            >
              <div className="min-w-0 flex items-center justify-between border-b border-border px-4 py-3">
                <span id="mobile-menu-title" className="min-w-0 truncate text-sm font-medium text-foreground/80">Menu</span>
                <div className="shrink-0 flex items-center gap-2">
                  <Button
                    ref={firstFocusableRef}
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
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        // respect reduced motion
                        const preferReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
                        const el = document.getElementById(item.id)
                        if (el) el.scrollIntoView({ behavior: preferReduced ? 'auto' : 'smooth' })
                        setActiveSection(item.id)
                        setIsOpen(false)
                        requestAnimationFrame(() => toggleBtnRef.current?.focus())
                      }}
                      className={`
                        w-full px-4 py-3.5 text-left text-base font-medium transition-colors block
                        ${activeSection === item.id ? 'text-primary' : 'text-foreground'}
                        hover:bg-foreground/[0.04] dark:hover:bg-white/5
                      `}
                      data-testid={`mobile-nav-${item.id}`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
