import { useState, type FormEvent } from 'react'
import { CheckCircle2, FileDown } from 'lucide-react'
import { leadMagnet } from '@/content'
import { Reveal } from '@/components/Reveal'

const PHONE_RE = /^[+\d][\d\s()\-–]{9,}$/

export function LeadMagnet() {
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!PHONE_RE.test(phone.trim())) {
      setError('Введите корректный номер телефона')
      return
    }
    try {
      const raw = localStorage.getItem('avtodrive_leads')
      const list = raw ? (JSON.parse(raw) as unknown[]) : []
      list.push({ source: 'Лид-магнит: каталог PDF', phone: phone.trim(), at: new Date().toISOString() })
      localStorage.setItem('avtodrive_leads', JSON.stringify(list))
    } catch {
      /* localStorage недоступен */
    }
    setDone(true)
  }

  return (
    <section className="pb-20 sm:pb-24">
      <div className="container-x">
        <Reveal>
          <div className="grid items-center gap-8 rounded-3xl border border-border bg-card p-8 sm:p-12 lg:grid-cols-2">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15">
                <FileDown className="h-7 w-7 text-primary" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold leading-tight sm:text-3xl">{leadMagnet.title}</h2>
              <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">{leadMagnet.sub}</p>
              <p className="mt-4 text-xs text-muted-foreground">{leadMagnet.fileNote}</p>
            </div>

            {done ? (
              <div className="flex flex-col items-center rounded-2xl border border-primary/30 bg-background/60 p-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary" />
                <p className="mt-4 font-display text-lg font-semibold">Каталог уже летит к вам!</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Отправили ссылку на PDF в SMS на номер {phone.trim()}. Если сообщение не пришло —
                  перезвоните нам, продублируем.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="rounded-2xl border border-border bg-background/60 p-6 sm:p-8">
                <label htmlFor="lead-phone" className="text-sm font-medium">
                  Номер телефона
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                    setError('')
                  }}
                  placeholder="+7 (___) ___-__-__"
                  className={`mt-2 w-full rounded-xl border bg-secondary px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary ${
                    error ? 'border-destructive' : 'border-border'
                  }`}
                />
                {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
                <button
                  type="submit"
                  className="mt-4 w-full cursor-pointer rounded-xl bg-primary py-3.5 font-display text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Получить каталог
                </button>
                <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
                  Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
