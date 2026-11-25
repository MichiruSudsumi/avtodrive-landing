import { BadgeCheck, Star } from 'lucide-react'
import { reviews } from '@/content'
import { Reveal } from '@/components/Reveal'

export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-20 py-20 sm:py-24">
      <div className="container-x">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Отзывы</p>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold leading-tight sm:text-3xl">
            {reviews.heading}
          </h2>
          <p className="mt-3 text-muted-foreground">{reviews.sub}</p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {reviews.badges.map((b, i) => (
            <Reveal key={b.label} delay={i * 70}>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                  <Star className="h-6 w-6 fill-primary text-primary" />
                </div>
                <div>
                  <p className="font-display text-xl font-bold">{b.value}</p>
                  <p className="text-xs text-muted-foreground">{b.label}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            {reviews.deals.map((deal, i) => (
              <Reveal key={deal.car} delay={i * 80}>
                <div className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{deal.car}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">{deal.city}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-primary/15 px-3 py-1 text-sm font-bold text-primary">
                      {deal.benefit}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">Сумма выгоды против покупки в РФ</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {reviews.items.map((r, i) => (
              <Reveal key={r.name} delay={i * 60}>
                <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-5">
                  <BadgeCheck className="h-5 w-5 text-primary" />
                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground/85">
                    «{r.text}»
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-semibold">{r.name}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
