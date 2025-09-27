import * as React from 'react'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { useI18n } from '@/i18n'

type Props = {
  variant?: 'accent' | 'clean'   // accent = more primary color
  tagline?: string
}

export default function HeroWordmark({
  variant = 'accent',
}: Props) {
  const isAccent = variant === 'accent'
  const { t } = useI18n()
  const tagline = t('gadner.tagline')

  return (
    <section
      className={clsx(
        'relative isolate flex items-center justify-center',
        // einzige Änderung: Phone höher, ab sm wieder dein alter Wert
        'min-h-[100svh] sm:min-h-[85svh]',
        'px-4 sm:px-6',
        'bg-background',
        '-mb-px', // << gegen 1px-Hairline
        isAccent ? 'text-white' : 'text-foreground bg-background'
      )}
    >
      {/* Background */}
      {isAccent ? (
        <>
          {/* primary gradient wash (UNVERÄNDERT) */}
          <div
            aria-hidden="true"
            className="
              absolute inset-0 -z-10
              [background:radial-gradient(1200px_600px_at_50%_10%,hsl(var(--primary))_0%,hsl(var(--primary)/0.80)_30%,hsl(var(--primary)/0.55)_60%,hsl(var(--primary)/0.35)_80%,transparent_98%)]
              bg-[hsl(var(--primary)/0.35)]
            "
          />
          {/* subtle grid overlay for texture (UNVERÄNDERT) */}
          <div
            aria-hidden="true"
            className="
              absolute inset-0 -z-10 opacity-[0.15]
              [background-image:radial-gradient(white_1px,transparent_1px)]
              [background-size:18px_18px]
              mix-blend-soft-light
            "
          />
          {/* Bottom feather (UNVERÄNDERT) */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-x-0 bottom-0 -z-0 h-10
              bg-gradient-to-b from-transparent to-[hsl(var(--background))]
            "
          />
        </>
      ) : (
        // clean: just a soft radial tint
        <div
          aria-hidden="true"
          className="
            absolute inset-0 -z-10
            [background:radial-gradient(900px_400px_at_50%_20%,hsl(var(--primary)/0.10),transparent_60%)]
          "
        />
      )}

      {/* Content */}
      <div className="mx-auto w-full max-w-4xl text-center">
        {/* BIG logo */}
        <div className="mb-6 flex justify-center">
          <img
            src="/case/gadner_stacked.svg"
            alt="gadner."
            className="block w-auto h-[180px] md:h-[240px] lg:h-[300px]"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Tagline */}
        <p
          className={clsx(
            'mx-auto max-w-2xl',
            isAccent ? 'text-white/90' : 'text-muted-foreground',
            'text-base sm:text-lg'
          )}
        >
          {tagline}
        </p>

        {/* CTA(s) */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button
            size="lg"
            className={clsx(
              'px-5',
              isAccent
                ? 'bg-white text-[hsl(var(--primary))] hover:brightness-95'
                : 'bg-[hsl(var(--primary))] text-white hover:brightness-110'
            )}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('gadner.contact')}
          </Button>

          <Button
            size="lg"
            variant={isAccent ? 'outline' : 'outline'}
            className={clsx(
              isAccent
                ? 'border-white/40 text-white hover:bg-white/10'
                : 'border-foreground/15'
            )}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('gadner.projects')}
          </Button>
        </div>

        {/* small primary accent line */}
        <div className="mt-12 flex justify-center">
          <span
            className={clsx(
              'h-[3px] w-24 rounded-full',
              isAccent ? 'bg-white/70' : 'bg-[hsl(var(--primary))]'
            )}
          />
        </div>
      </div>
    </section>
  )
}
