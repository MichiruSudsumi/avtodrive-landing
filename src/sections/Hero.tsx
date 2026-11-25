import { Check, Gift, Star } from 'lucide-react'
import { hero, site } from '@/content'
import { useQuiz } from '@/components/quiz-context'

export function Hero() {
  const { open } = useQuiz()

  return (
    <section id="top" className="relative flex min-h-[100dvh] items-end overflow-hidden">
      <img
        src={hero.img}
        alt={`${hero.model} — электрический кроссовер на прибрежной трассе на закате`}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />

      <div className="container-x relative pb-14 pt-28 sm:pb-20">
        <div className="max-w-3xl">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1.5 backdrop-blur-sm">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-semibold">{site.rating}</span>
              <span className="text-muted-foreground">{site.ratingSource}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1.5 backdrop-blur-sm">
              <Gift className="h-4 w-4 text-primary" />
              {hero.gift}
            </span>
          </div>

          <h1 className="animate-fade-up font-display text-[clamp(1.7rem,4.6vw,3.4rem)] font-bold leading-[1.12] text-balance">
            Привезём {hero.model} из {hero.country} под ключ в РФ{' '}
            <span className="text-primary">от {hero.priceFrom}</span> за {hero.days}
          </h1>

          <ul className="mt-6 space-y-2.5">
            {hero.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[15px] sm:text-base">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </span>
                <span className="text-foreground/90">{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={() => open('Первый экран')}
              className="h-14 cursor-pointer rounded-xl bg-primary px-8 font-display text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03] active:scale-[0.97]"
            >
              Рассчитать стоимость авто
            </button>
            <a
              href="#examples"
              className="inline-flex h-14 items-center justify-center rounded-xl border border-border bg-background/50 px-8 text-sm font-semibold backdrop-blur-sm transition-colors hover:border-primary/70 hover:text-primary"
            >
              Смотреть комплектации
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
