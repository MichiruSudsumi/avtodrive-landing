import { marquee } from '@/content'

export function Marquee() {
  const items = [...marquee, ...marquee]
  return (
    <div className="overflow-hidden border-y border-border bg-card py-3.5" aria-hidden="true">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {items.map((text, i) => (
          <span key={i} className="flex items-center gap-8 text-sm font-medium text-muted-foreground">
            {text}
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
        ))}
      </div>
    </div>
  )
}
