// client/src/i18n.ts
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type Lang = 'de' | 'en'

export const messages: Record<Lang, Record<string, string>> = {
  de: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.projects": "Projekte",
    "nav.about": "Über mich",
    "nav.contact": "Kontakt",

    "gadner.tagline": "Softwareentwickler für schnelle, saubere Web-Apps und Developer-Tools.",
    "gadner.contact": "Kontaktiere mich",
    "gadner.projects": "Projekte ansehen",
    "hero.badge": "Websites & Webapps — maßgeschneidert für Ihr Business",
    "hero.h1.leading": "Launchen Sie eine Seite, die ",
    "hero.h1.highlight": "Kund:innen gewinnt",
    "hero.p": "Strategie, Design und Entwicklung aus einer Hand. Schnell, SEO-ready und auf Conversion gebaut — ohne Agentur-Overhead.",
    "hero.bullet.1": "Discovery → Prototyp → Launch in <3 Wochen",
    "hero.bullet.2": "Performance, Accessibility & SEO von Anfang an",
    "hero.bullet.3": "Integrationen: CMS, Payments, Booking, Analytics",
    "hero.cta.primary": "Unverbindliches Angebot anfordern",
    "hero.cta.secondary": "Projekte ansehen",
    "hero.stats.projects": "12+ ausgelieferte Projekte",
    "hero.stats.duration": "~3 Wochen durchschnittliche Dauer",
    "hero.stats.vitals": "Core Web Vitals im grünen Bereich",
    "hero.desc": "Websites, Webapps, Landing Pages & Mobile — mehr Beispiele unten.",

    "slides.websites.label": "Websites",
    "slides.websites.blurb": "Schnelle, SEO-starke Seiten, die Termine & Anfragen steigern.",
    "slides.websites.bullet.1": "<1s LCP",
    "slides.websites.bullet.2": "Core Web Vitals grün",
    "slides.websites.bullet.3": "CMS-Integration",

    "slides.landing.label": "Landing Pages",
    "slides.landing.blurb": "Klar fokussierte Landing Pages, optimiert auf Conversion.",
    "slides.landing.bullet.1": "A/B bereit",
    "slides.landing.bullet.2": "Analytics",
    "slides.landing.bullet.3": "Schnelle Umsetzung",

    "slides.webapps.label": "Webapps",
    "slides.webapps.blurb": "Individuelle Webanwendungen – von MVP bis produktionsreif.",
    "slides.webapps.bullet.1": "Next.js",
    "slides.webapps.bullet.2": "API-ready",
    "slides.webapps.bullet.3": "Auth & Payments",

    "slides.mobile.label": "Mobile",
    "slides.mobile.blurb": "Mobile-first UIs & App-Shells für nahtlose Flows.",
    "slides.mobile.bullet.1": "PWA-Ready",
    "slides.mobile.bullet.2": "Offline-fähig",
    "slides.mobile.bullet.3": "App-Shell",

    "hero.card.offer": "Angebot",
    "hero.card.more": "Mehr dazu",
    "hero.card.moreAria": "Mehr dazu",

    "services.title.leading": "Schlank starten. ",
    "services.title.highlight": "Messbar wachsen.",
    "services.subtitle": "Faire, einsteigerfreundliche Pakete für KMU & Startups – mit klaren Fixpreisen, kurzen Laufzeiten und echter Verantwortung für Ergebnis & Qualität.",
    "services.badge.budget": "Budget-freundlicher Einstieg",
    "services.badge.guarantee": "100 % Geld-zurück-Garantie",
    "services.badge.launch": "Launch in ~3 Wochen",
    "services.card.web.title": "Webseiten & Landings",
    "services.card.web.desc": "Moderne, responsive Sites, die Leads und Vertrauen aufbauen.",
    "services.card.web.feature.1": "Next.js / React",
    "services.card.web.feature.2": "Mobil-first & schnell",
    "services.card.web.feature.3": "SEO-Basics inklusive",
    "services.card.web.feature.4": "Core Web Vitals im Blick",
    "services.card.app.title": "Webapps & Mobile",
    "services.card.app.desc": "Von MVP bis produktionsreif – sauber strukturiert, skalierbar.",
    "services.card.app.feature.1": "React / React Native / Flutter",
    "services.card.app.feature.2": "API-Integration",
    "services.card.app.feature.3": "Auth & Payments",
    "services.card.app.feature.4": "Cloud-Backend (z. B. Firebase)",
    "services.card.sol.title": "Digitale Lösungen",
    "services.card.sol.desc": "Automatisierung & Integration, die Zeit spart und sichtbar wirkt.",
    "services.card.sol.feature.1": "Workflows & Automations",
    "services.card.sol.feature.2": "Datenanalyse & Dashboards",
    "services.card.sol.feature.3": "System-Integration",
    "services.card.sol.feature.4": "CI/CD & Hosting",
    "services.cta.request": "Kostenloses Angebot anfordern",
    "services.guarantee.title": "100 % Geld-zurück-Garantie",
    "services.guarantee.body": "Wenn Sie innerhalb von 30 Tagen nach Launch nicht zufrieden sind, erhalten Sie Ihr Geld zurück. Ohne Wenn und Aber. Null Risiko, maximaler Nutzen.",
    "services.starter.title": "Starter-Paket für den schnellen Markteintritt",
    "services.starter.desc": "Ideal zum Loslegen: 1–3 Seiten, individuelles Design, SEO-Basics, Tracking, Launch in 2–3 Wochen.",
    "services.starter.cta": "Kostenlose Erstberatung",

    "projects.badge": "Ausgewählte Projekte",
    "projects.title.leading": "Ergebnisse",
    "projects.title.highlight": ", die überzeugen",
    "projects.subtitle": "Maßgeschneiderte Websites & Webapps – Performance, SEO und Conversion von Anfang an gedacht.",
    "projects.card.live": "Live ansehen",
    "projects.footnote": "Mehr Beispiele gern auf Anfrage – ich zeige Ihnen passende Cases für Ihre Branche.",
    "items.monika.title": "Dr. Monika Gadner",
    "items.monika.subtitle": "Praxis-Website",
    "items.monika.description": "Leichte, SEO-starke Praxisseite mit klarer Termin-CTA. Optimiert für Mobil & Core Web Vitals.",
    "items.monika.alt": "Praxiswebsite Hero – Dr. Monika Gadner",
    "items.monika.chip.1": "<1s LCP",
    "items.monika.chip.2": "98 Lighthouse",
    "items.monika.chip.3": "CMS-ready",
  
    "items.brng.title": "BRNG",
    "items.brng.subtitle": "Landing & App-Shell",
    "items.brng.description": "Fokussierte Landing mit sauberer IA; App-Shell für schnelles Onboarding & Leads.",
    "items.brng.alt": "BRNG Landing – Screenshot",
    "items.brng.chip.1": "Next.js",
    "items.brng.chip.2": "API-ready",
    "items.brng.chip.3": "Schnell & schlank",

    "about.title": "Über mich",
    "about.intro": "Full-Stack mit Produktfokus: Strategie, Design und Entwicklung aus einer Hand – für schnelle, zugängliche und messbar erfolgreiche Websites & Webapps.",
    "about.values.title": "Werte",
    "about.tech.title": "Tech-Stack",
    "about.tech.desc": "Hauptwerkzeuge für Web & Apps. Balken zeigen, wo ich aktuell am meisten liefere.",
    "about.achievements.1.title": "B.Sc. Software Engineering & Digital Business",
    "about.achievements.1.desc": "Fundierte Grundlage in moderner Softwareentwicklung & digitalen Geschäftsmodellen (Leistungsstipendium).",
    "about.achievements.2.title": "1+ Jahr Berufserfahrung (Deniba)",
    "about.achievements.2.desc": "Arbeit in realen Projekten: sauberer Code, Teamwork, Verantwortung.",
    "about.achievements.3.title": "Praxis in Startups (BRNG, Voyal)",
    "about.achievements.3.desc": "Produktfokus: schnelle Iteration, klare UX, „shippen statt schippern“.",
    "about.achievements.4.title": "Qualität & Ergebnisse",
    "about.achievements.4.desc": "Performance, Accessibility & SEO von Beginn an – messbare Wirkung statt Spielereien.",
    "about.values.problemSolving": "Problemlösung",
"about.values.performance": "Performance",
"about.values.clarity": "Klarheit",
"about.values.creativity": "Kreativität",


    "contact.title.leading": "Unverbindlich anfragen. ",
    "contact.title.highlight": "Schnelle Rückmeldung.",
    "contact.subtitle": "Kurz beschreiben, was Sie brauchen – ich melde mich innerhalb von 24 Stunden. Auf Wunsch erhalten Sie ein fixes Angebot mit Timeline.",
    "contact.form.name.label": "Name",
    "contact.form.name.placeholder": "Ihr vollständiger Name",
    "contact.form.email.label": "E-Mail",
    "contact.form.email.placeholder": "ihre.email@example.com",
    "contact.form.message.label": "Nachricht",
    "contact.form.message.placeholder": "Kurze Projektbeschreibung, Ziele, Timing …",
    "contact.form.submit": "Nachricht senden",
    "contact.form.sending": "Wird gesendet …",
    "contact.form.toastr.ok.title": "Nachricht gesendet",
    "contact.form.toastr.ok.desc": "Danke! Ich melde mich zeitnah mit einer kurzen Einschätzung.",
    "contact.form.toastr.err.title": "Fehler beim Senden",
    "contact.form.toastr.err.desc": "Bitte später erneut versuchen.",
    "contact.info.title": "Kontaktinformationen",
    "contact.response.title": "Antwortzeit",
    "contact.response.desc": "In der Regel innerhalb von 24 Stunden. Bei dringenden Projekten schneller.",
    "contact.response.available": "Verfügbar für neue Projekte",
    "contact.legal.note": "100 % Geld-zurück-Garantie innerhalb von 30 Tagen nach Launch, wenn Sie nicht zufrieden sind. Ihre Daten werden nur zur Beantwortung Ihrer Anfrage verwendet.",
    "contact.info.phone": "Telefon",
"contact.info.location": "Standort",
"contact.info.location2": "Wien, Österreich",
"contact.contact": "Kontakt",

    "footer.brand": "Nicolas Gadner",
    "footer.desc": "Software Developer mit Leidenschaft für moderne, benutzerfreundliche digitale Lösungen.",
    "footer.quicklinks.title": "Quick Links",
    "footer.contact.title": "Kontakt",
    "footer.copyright": "Alle Rechte vorbehalten.",
    "footer.builtWith": "Entwickelt mit",
    "footer.andReact": "und React",

    "common.startingPrice.prefix": "Ab",
    "common.live": "Live",
    "common.guarantee.short": "30 Tage Geld-zurück",

    "validation.name.min": "Name muss mindestens 2 Zeichen lang sein",
  "validation.email": "Bitte gib eine gültige E-Mail-Adresse ein",
  "validation.message.min": "Nachricht muss mindestens 3 Zeichen lang sein"
  },

  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.about": "About",
    "nav.contact": "Contact",

    "gadner.tagline": "Software engineer building fast, clean web apps and developer tooling.",
    "gadner.contact": "Contact me",
    "gadner.projects": "View projects",

    "hero.badge": "Websites & Web Apps — tailored to your business",
    "hero.h1.leading": "Launch a site that ",
    "hero.h1.highlight": "wins customers",
    "hero.p": "Strategy, design and development from one source. Fast, SEO-ready and conversion-focused — without agency overhead.",
    "hero.bullet.1": "Discovery → Prototype → Launch in <3 weeks",
    "hero.bullet.2": "Performance, accessibility & SEO from day one",
    "hero.bullet.3": "Integrations: CMS, payments, booking, analytics",
    "hero.cta.primary": "Request a free quote",
    "hero.cta.secondary": "View projects",
    "hero.stats.projects": "12+ delivered projects",
    "hero.stats.duration": "~3 weeks average timeline",
    "hero.stats.vitals": "Core Web Vitals in the green",
    "hero.desc": "Websites, Webapps, Landing Pages & Mobile — more Examples below.",

    "slides.websites.label": "Websites",
    "slides.websites.blurb": "Fast, SEO-strong pages that increase bookings & inquiries.",
    "slides.websites.bullet.1": "<1s LCP",
    "slides.websites.bullet.2": "Core Web Vitals green",
    "slides.websites.bullet.3": "CMS integration",

    "slides.landing.label": "Landing Pages",
    "slides.landing.blurb": "Focused landings, optimized for conversion.",
    "slides.landing.bullet.1": "A/B ready",
    "slides.landing.bullet.2": "Analytics",
    "slides.landing.bullet.3": "Rapid delivery",

    "slides.webapps.label": "Web Apps",
    "slides.webapps.blurb": "Custom web applications — from MVP to production.",
    "slides.webapps.bullet.1": "Next.js",
    "slides.webapps.bullet.2": "API-ready",
    "slides.webapps.bullet.3": "Auth & payments",

    "slides.mobile.label": "Mobile",
    "slides.mobile.blurb": "Mobile-first UIs & app shells for seamless flows.",
    "slides.mobile.bullet.1": "PWA-ready",
    "slides.mobile.bullet.2": "Offline capable",
    "slides.mobile.bullet.3": "App shell",

    "hero.card.offer": "Offer",
    "hero.card.more": "Learn more",
    "hero.card.moreAria": "Learn more",

    "services.title.leading": "Start lean. ",
    "services.title.highlight": "Grow measurably.",
    "services.subtitle": "Fair, beginner-friendly packages for SMEs & startups — clear fixed prices, short timelines, full accountability for outcome & quality.",
    "services.badge.budget": "Budget-friendly entry",
    "services.badge.guarantee": "100% money-back guarantee",
    "services.badge.launch": "Launch in ~3 weeks",
    "services.card.web.title": "Websites & Landings",
    "services.card.web.desc": "Modern, responsive sites that build trust and drive leads.",
    "services.card.web.feature.1": "Next.js / React",
    "services.card.web.feature.2": "Mobile-first & fast",
    "services.card.web.feature.3": "SEO basics included",
    "services.card.web.feature.4": "Core Web Vitals focus",
    "services.card.app.title": "Web Apps & Mobile",
    "services.card.app.desc": "From MVP to production — clean architecture, scalable.",
    "services.card.app.feature.1": "React / React Native / Flutter",
    "services.card.app.feature.2": "API integrations",
    "services.card.app.feature.3": "Auth & payments",
    "services.card.app.feature.4": "Cloud backend (e.g. Firebase)",
    "services.card.sol.title": "Digital solutions",
    "services.card.sol.desc": "Automation & integration that saves time and shows impact.",
    "services.card.sol.feature.1": "Workflows & automations",
    "services.card.sol.feature.2": "Analytics & dashboards",
    "services.card.sol.feature.3": "System integration",
    "services.card.sol.feature.4": "CI/CD & hosting",
    "services.cta.request": "Request a free quote",
    "services.guarantee.title": "100% Money-back Guarantee",
    "services.guarantee.body": "If you’re not satisfied within 30 days after launch, you’ll get your money back. No questions asked. Zero risk, maximum value.",
    "services.starter.title": "Starter package for fast go-to-market",
    "services.starter.desc": "Perfect to begin: 1–3 pages, custom design, SEO basics, tracking, launch in 2–3 weeks.",
    "services.starter.cta": "Free consultation",

    "projects.badge": "Selected Projects",
    "projects.title.leading": "Results",
    "projects.title.highlight": " that convince",
    "projects.subtitle": "Tailored websites & web apps — built for performance, SEO and conversion from the start.",
    "projects.card.live": "View live",
    "projects.footnote": "More examples on request — I’ll show relevant cases for your industry.",
    "items.monika.title": "Dr. Monika Gadner",
    "items.monika.subtitle": "Practice website",
    "items.monika.description": "Lightweight, SEO-strong practice site with clear booking CTA. Optimized for mobile & Core Web Vitals.",
    "items.monika.alt": "Practice website hero — Dr. Monika Gadner",
    "items.monika.chip.1": "<1s LCP",
    "items.monika.chip.2": "98 Lighthouse",
    "items.monika.chip.3": "CMS-ready",
  
    "items.brng.title": "BRNG",
    "items.brng.subtitle": "Landing & App shell",
    "items.brng.description": "Focused landing with clean IA; app shell for fast onboarding & leads.",
    "items.brng.alt": "BRNG landing — screenshot",
    "items.brng.chip.1": "Next.js",
    "items.brng.chip.2": "API-ready",
    "items.brng.chip.3": "Lean & fast",

    "about.title": "About me",
    "about.intro": "Full-stack with product focus: strategy, design and development from one source — for fast, accessible and measurably successful websites & web apps.",
    "about.values.title": "Values",
    "about.tech.title": "Tech Stack",
    "about.tech.desc": "Core tools for web & apps. Bars indicate where I currently deliver most.",
    "about.achievements.1.title": "B.Sc. Software Engineering & Digital Business",
    "about.achievements.1.desc": "Solid foundation in modern software development & digital business (merit scholarship).",
    "about.achievements.2.title": "1+ year professional experience (Deniba)",
    "about.achievements.2.desc": "Real-world projects: clean code, teamwork, ownership.",
    "about.achievements.3.title": "Startup experience (BRNG, Voyal)",
    "about.achievements.3.desc": "Product focus: rapid iteration, clear UX, shipping over polishing.",
    "about.achievements.4.title": "Quality & outcomes",
    "about.achievements.4.desc": "Performance, accessibility & SEO from day one — measurable impact, not gimmicks.",
    "about.values.problemSolving": "Problem solving",
"about.values.performance": "Performance",
"about.values.clarity": "Clarity",
"about.values.creativity": "Creativity",


    "contact.title.leading": "Get in touch. ",
    "contact.title.highlight": "Fast reply.",
    "contact.subtitle": "Briefly describe what you need — I’ll get back within 24 hours. If you like, you’ll receive a fixed quote with timeline.",
    "contact.form.name.label": "Name",
    "contact.form.name.placeholder": "Your full name",
    "contact.form.email.label": "Email",
    "contact.form.email.placeholder": "your.email@example.com",
    "contact.form.message.label": "Message",
    "contact.form.message.placeholder": "Short project description, goals, timing…",
    "contact.form.submit": "Send message",
    "contact.form.sending": "Sending…",
    "contact.form.toastr.ok.title": "Message sent",
    "contact.form.toastr.ok.desc": "Thanks! I’ll get back with a brief assessment.",
    "contact.form.toastr.err.title": "Send failed",
    "contact.form.toastr.err.desc": "Please try again later.",
    "contact.info.title": "Contact information",
    "contact.response.title": "Response time",
    "contact.response.desc": "Usually within 24 hours. Faster for urgent projects.",
    "contact.response.available": "Available for new projects",
    "contact.legal.note": "100% money-back guarantee within 30 days after launch if you’re not satisfied. Your data is only used to respond to your request.",
    "contact.info.phone": "Phone",
"contact.info.location": "Location",
"contact.info.location2": "Vienna, Austria",
"contact.contact": "Contact",

    "footer.brand": "Nicolas Gadner",
    "footer.desc": "Software developer with a passion for modern, user-friendly digital products.",
    "footer.quicklinks.title": "Quick links",
    "footer.contact.title": "Contact",
    "footer.copyright": "All rights reserved.",
    "footer.builtWith": "Built with",
    "footer.andReact": "and React",

    "common.startingPrice.prefix": "From",
    "common.live": "Live",
    "common.guarantee.short": "30-day money-back",

    "validation.name.min": "Name must be at least 2 characters",
  "validation.email": "Please enter a valid email address",
  "validation.message.min": "Message must be at least 3 characters"
  },
}

// Lookup with fallback to EN, then key
export function translate(lang: Lang, key: string) {
  return messages[lang][key] ?? messages.en[key] ?? key
}

type I18nCtx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nCtx | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('lang') as Lang | null
      return saved ?? 'de'
    } catch {
      return 'de'
    }
  })

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem('lang', l)
    } catch {}
  }

  // keep <html lang="…"> in sync
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  // bind t to current lang
  const t = useMemo(() => (key: string) => translate(lang, key), [lang])

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
