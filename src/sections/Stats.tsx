import { stats } from '@/content'
import { Reveal } from '@/components/Reveal'

export function Stats() {
  return (
    <section className="border-y border-border bg-card py-14">
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.value} delay={i * 80}>
            <div>
              <p className="font-display text-3xl font-bold text-primary sm:text-4xl">{s.value}</p>
              <p className="mt-2 max-w-[26ch] text-sm leading-relaxed text-muted-foreground">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
