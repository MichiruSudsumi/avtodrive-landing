import { MapPin, ShieldCheck } from 'lucide-react'
import { about } from '@/content'
import { Reveal } from '@/components/Reveal'

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-y border-border bg-card py-20 sm:py-24">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">О компании</p>
            <h2 className="mt-3 font-display text-2xl font-bold leading-tight sm:text-3xl">{about.heading}</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{about.text}</p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {about.digits.map((d) => (
                <div key={d.value} className="rounded-2xl border border-border bg-background/60 p-4">
                  <p className="font-display text-xl font-bold text-primary sm:text-2xl">{d.value}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{d.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {about.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center rounded-xl border border-border bg-background/60 px-5 text-sm font-semibold transition-colors hover:border-primary/70 hover:text-primary"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </Reveal>

          <div>
            <Reveal delay={100}>
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
                <ShieldCheck className="h-5 w-5 text-primary" /> Гарантии
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {about.guarantees.map((g) => (
                  <div key={g.title} className="rounded-2xl border border-border bg-background/60 p-5">
                    <p className="font-semibold">{g.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{g.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={180}>
              <h3 className="mt-10 flex items-center gap-2 font-display text-lg font-semibold">
                <MapPin className="h-5 w-5 text-primary" /> Мы в регионах России — {about.cities.length} городов
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {about.cities.map((city) => (
                  <span
                    key={city}
                    className="rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-sm text-muted-foreground"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
