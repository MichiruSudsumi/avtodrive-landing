import { trims } from '@/content'
import { Reveal } from '@/components/Reveal'
import { useQuiz } from '@/components/quiz-context'

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-dashed border-border/70 py-2 text-sm last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  )
}

export function Trims() {
  const { open } = useQuiz()

  return (
    <section id="examples" className="scroll-mt-20 py-20 sm:py-24">
      <div className="container-x">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Примеры авто</p>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold leading-tight sm:text-3xl">
            Три комплектации {trims[0].name.split(' ')[0]} {trims[0].name.split(' ')[1]} — цена под заказ и выгода
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {trims.map((trim, i) => (
            <Reveal key={trim.id} delay={i * 90}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/50">
                <div className="relative overflow-hidden">
                  <img
                    src={trim.img}
                    alt={trim.name}
                    loading="lazy"
                    className="aspect-[3/2] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  {trim.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                      {trim.badge}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base font-semibold leading-snug">{trim.name}</h3>

                  <div className="mt-3">
                    <Row label="Год выпуска" value={trim.year} />
                    <Row label="Пробег" value={trim.mileage} />
                    <Row label="Состояние" value={trim.condition} />
                    <Row label="Характеристики" value={trim.specs} />
                    <Row label="Привод" value={trim.drive} />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Цены в РФ от</p>
                      <p className="mt-0.5 text-sm font-semibold text-muted-foreground line-through decoration-destructive/80">
                        {trim.priceRf}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Цена под заказ</p>
                      <p className="mt-0.5 font-display text-sm font-bold text-primary">{trim.priceOrder}</p>
                    </div>
                  </div>

                  <p className="mt-3">
                    <span className="text-xs text-muted-foreground">Выгода </span>
                    <span className="font-display text-xl font-bold text-primary">{trim.benefit}</span>
                  </p>

                  <button
                    onClick={() => open(`Карточка ${trim.name}`)}
                    className="mt-5 h-12 w-full cursor-pointer rounded-xl border border-primary/60 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    Рассчитать стоимость
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
