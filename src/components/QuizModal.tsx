import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, ChevronLeft, X } from 'lucide-react'
import { quizBudgets, quizCountries } from '@/content'
import { useQuiz } from '@/components/quiz-context'

const PHONE_RE = /^[+\d][\d\s()\-–]{9,}$/

function saveLead(lead: Record<string, string>) {
  try {
    const raw = localStorage.getItem('avtodrive_leads')
    const list = raw ? (JSON.parse(raw) as unknown[]) : []
    list.push({ ...lead, at: new Date().toISOString() })
    localStorage.setItem('avtodrive_leads', JSON.stringify(list))
  } catch {
    /* localStorage недоступен — заявка просто показывается на экране */
  }
}

export function QuizModal() {
  const { isOpen, close, source } = useQuiz()
  const [step, setStep] = useState(0)
  const [country, setCountry] = useState('')
  const [budget, setBudget] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(true)
  const [errors, setErrors] = useState<{ phone?: string; name?: string }>({})
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setStep(0)
      setCountry('')
      setBudget('')
      setErrors({})
      setDone(false)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    if (isOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  const progress = useMemo(() => {
    if (done) return 100
    return Math.round((step / 3) * 100)
  }, [step, done])

  if (!isOpen) return null

  const submit = () => {
    const errs: { phone?: string; name?: string } = {}
    if (name.trim().length < 2) errs.name = 'Введите имя'
    if (!PHONE_RE.test(phone.trim())) errs.phone = 'Введите корректный телефон'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    saveLead({ source, country, budget, name: name.trim(), phone: phone.trim() })
    setDone(true)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Расчёт стоимости автомобиля"
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
    >
      <div className="animate-fade-up relative flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-border bg-card sm:rounded-2xl">
        <button
          onClick={close}
          aria-label="Закрыть окно"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="px-6 pt-6">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>{done ? 'Готово' : `Шаг ${step + 1} из 3`}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="overflow-y-auto px-6 pb-6 pt-4">
          {done ? (
            <div className="flex flex-col items-center py-8 text-center">
              <CheckCircle2 className="mb-4 h-14 w-14 text-primary" />
              <h3 className="font-display text-xl font-semibold">Заявка принята!</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {name.trim()}, менеджер перезвонит вам в течение 15 минут в рабочее время
                и назовёт точную стоимость{budget ? ` для бюджета «${budget}»` : ''}.
              </p>
              <button
                onClick={close}
                className="mt-6 h-12 w-full cursor-pointer rounded-xl bg-primary font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Отлично, жду звонка
              </button>
            </div>
          ) : step === 0 ? (
            <div>
              <h3 className="font-display text-lg font-semibold leading-snug">
                Откуда привезти автомобиль?
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {quizCountries.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCountry(c)
                      setStep(1)
                    }}
                    className={`h-11 cursor-pointer rounded-xl border px-4 text-sm font-medium transition-colors ${
                      country === c
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-secondary hover:border-primary/60'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(1)}
                className="mt-5 cursor-pointer text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                Пропустить вопрос →
              </button>
            </div>
          ) : step === 1 ? (
            <div>
              <h3 className="font-display text-lg font-semibold leading-snug">
                Какой бюджет под ключ?
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {quizBudgets.map((b) => (
                  <button
                    key={b}
                    onClick={() => {
                      setBudget(b)
                      setStep(2)
                    }}
                    className={`h-12 cursor-pointer rounded-xl border text-sm font-semibold transition-colors ${
                      budget === b
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-secondary hover:border-primary/60'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                className="mt-5 cursor-pointer text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                Пропустить вопрос →
              </button>
            </div>
          ) : (
            <div>
              <h3 className="font-display text-lg font-semibold leading-snug">
                Куда отправить расчёт?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {country || 'Страна покупки: подберём вместе'} · {budget || 'бюджет: уточним по телефону'}
              </p>
              <div className="mt-4 space-y-3">
                <div>
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      setErrors((p) => ({ ...p, name: undefined }))
                    }}
                    placeholder="Ваше имя"
                    aria-label="Ваше имя"
                    className={`h-12 w-full rounded-xl border bg-secondary px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary ${
                      errors.name ? 'border-destructive' : 'border-border'
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <input
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value)
                      setErrors((p) => ({ ...p, phone: undefined }))
                    }}
                    placeholder="+7 (___) ___-__-__"
                    inputMode="tel"
                    aria-label="Телефон"
                    className={`h-12 w-full rounded-xl border bg-secondary px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary ${
                      errors.phone ? 'border-destructive' : 'border-border'
                    }`}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                </div>
                <label className="flex cursor-pointer items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 cursor-pointer accent-primary"
                  />
                  Я даю согласие на обработку персональных данных
                </label>
                <button
                  onClick={submit}
                  disabled={!consent}
                  className="h-12 w-full cursor-pointer rounded-xl bg-primary font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Получить расчёт стоимости
                </button>
              </div>
            </div>
          )}

          {step > 0 && !done && (
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="mt-5 inline-flex cursor-pointer items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" /> Назад
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
