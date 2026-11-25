import { steps } from '@/content'
import { Reveal } from '@/components/Reveal'

export function Steps() {
  return (
    <section id="steps" className="scroll-mt-20 py-20 sm:py-24">
      <div className="container-x">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Как купить автомобиль</p>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold leading-tight sm:text-3xl">
            7 шагов от заявки до выдачи ключей
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 60}>
              <li className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 font-display text-sm font-bold text-primary">
                    {pad(i + 1)}
                  </span>
                  {i < steps.length - 1 && (
                    <span className="hidden h-px flex-1 bg-border xl:block" aria-hidden="true" />
                  )}
                </div>
                <h3 className="mt-4 font-semibold leading-snug">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}
