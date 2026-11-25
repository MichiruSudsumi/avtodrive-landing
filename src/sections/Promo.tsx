import { useEffect, useState } from 'react'
import { Gift } from 'lucide-react'
import { promo } from '@/content'
import { Reveal } from '@/components/Reveal'
import { useQuiz } from '@/components/quiz-context'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function Promo() {
  const { open } = useQuiz()
  const [deadline] = useState(() => Date.now() + promo.hours * 3600_000)
  const [left, setLeft] = useState(deadline - Date.now())

  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(0, deadline - Date.now())), 1000)
    return () => clearInterval(t)
  }, [deadline])

  const h = Math.floor(left / 3600_000)
  const m = Math.floor((left % 3600_000) / 60_000)
  const s = Math.floor((left % 60_000) / 1000)

  return (
    <section id="promo" className="scroll-mt-20 pb-20 sm:pb-24">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/10 p-8 sm:p-12">
            <Gift className="absolute -right-8 -top-8 h-48 w-48 text-primary/10" aria-hidden="true" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
              <div>
                <h2 className="font-display text-2xl font-bold leading-tight sm:text-3xl">{promo.title}</h2>
                <p className="mt-3 flex items-center gap-2 text-lg font-semibold text-primary">
                  <Gift className="h-5 w-5" /> {promo.gift}
                </p>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{promo.note}</p>
              </div>
              <div className="flex flex-col items-start gap-4 lg:items-end">
                <div className="flex gap-2" role="timer" aria-label="До конца акции">
                  {[
                    { v: pad(h), l: 'часов' },
                    { v: pad(m), l: 'минут' },
                    { v: pad(s), l: 'секунд' },
                  ].map((cell) => (
                    <div
                      key={cell.l}
                      className="flex w-20 flex-col items-center rounded-xl border border-border bg-background/70 py-3 backdrop-blur-sm"
                    >
                      <span className="font-display text-2xl font-bold tabular-nums text-primary">{cell.v}</span>
                      <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{cell.l}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => open('Акция с таймером')}
                  className="w-full cursor-pointer rounded-xl bg-primary px-8 py-3.5 font-display text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03] active:scale-[0.97] lg:w-auto"
                >
                  Успеть на акцию
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
