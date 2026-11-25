import { manager } from '@/content'
import { Reveal } from '@/components/Reveal'
import { useQuiz } from '@/components/quiz-context'

export function Manager() {
  const { open } = useQuiz()

  return (
    <section className="border-y border-border bg-card py-16">
      <div className="container-x grid items-center gap-8 md:grid-cols-[280px_1fr]">
        <Reveal>
          <div className="relative mx-auto w-56 md:w-full">
            <div className="absolute -inset-2 rounded-3xl bg-primary/15 blur-xl" aria-hidden="true" />
            <img
              src={manager.img}
              alt={`${manager.name} — ${manager.role}`}
              loading="lazy"
              className="relative aspect-[4/5] w-full rounded-3xl border border-border object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Личная консультация</p>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{manager.name}</h2>
          <p className="mt-1 font-medium text-foreground/80">{manager.role}</p>
          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{manager.text}</p>
          <button
            onClick={() => open(`Консультация: ${manager.name}`)}
            className="mt-6 cursor-pointer rounded-xl bg-primary px-8 py-3.5 font-display text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-[0.97]"
          >
            Получить консультацию
          </button>
        </Reveal>
      </div>
    </section>
  )
}
