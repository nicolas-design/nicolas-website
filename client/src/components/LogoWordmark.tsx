import * as React from 'react'
import clsx from 'clsx'

type Props = {
  className?: string
  as?: keyof JSX.IntrinsicElements
  /** Wenn true, wird der Punkt in --primary gefärbt */
  accentDot?: boolean
}

export default function LogoWordmark({
  className,
  as: Tag = 'span',
  accentDot = false,
}: Props) {
  return (
    <Tag
      className={clsx(
        'inline-flex items-baseline leading-none font-extrabold antialiased',
        // exakt wie im SVG: Sora 800 + leicht negatives Tracking (~ -2px @ 160px)
        "[font-family:'Sora',Inter,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif]",
        'tracking-[-0.0125em]',
        className
      )}
      aria-label="gadner."
      title="gadner."
    >
      <span className="text-foreground">gadner</span>
      {accentDot ? (
        <span className="text-[hsl(var(--primary))]">.</span>
      ) : (
        <span className="text-foreground">.</span>
      )}
    </Tag>
  )
}
