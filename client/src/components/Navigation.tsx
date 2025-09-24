import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, Sun, Moon } from 'lucide-react'

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Robustere Initialisierung (localStorage -> prefers-color-scheme)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const navItems = [
    { id: 'hero',     label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projekte' },
    { id: 'about',    label: 'Über mich' },
    { id: 'contact',  label: 'Kontakt' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Toggle Klasse + speichern
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
    setIsOpen(false)
  }

  // Gemeinsame Button-Styles für gute Lesbarkeit in beiden Modi
  const themeBtnClass =
    'text-foreground hover:text-primary hover:bg-foreground/5 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            className="cursor-pointer text-xl font-bold text-foreground hover-elevate"
            onClick={() => scrollToSection('hero')}
            data-testid="logo"
          >
            Portfolio
          </div>

          {/* Desktop */}
          <div className="hidden items-center gap-8 md:flex">
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

            {/* Dark-Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode((v) => !v)}
              aria-pressed={darkMode}
              aria-label={darkMode ? 'Helles Design aktivieren' : 'Dunkles Design aktivieren'}
              data-testid="theme-toggle"
              className={themeBtnClass}
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode((v) => !v)}
              aria-pressed={darkMode}
              aria-label={darkMode ? 'Helles Design aktivieren' : 'Dunkles Design aktivieren'}
              data-testid="theme-toggle-mobile"
              className={themeBtnClass}
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen((v) => !v)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              data-testid="mobile-menu-toggle"
              className="text-foreground hover:text-primary hover:bg-foreground/5 dark:hover:bg-white/10"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div id="mobile-menu" className="mt-4 border-t border-border pb-4 md:hidden">
            <div className="flex flex-col gap-4 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  data-testid={`mobile-nav-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
