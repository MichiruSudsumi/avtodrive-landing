import { useState } from 'react'
import { MapPin, Phone, X } from 'lucide-react'
import { about, footer, nav, site } from '@/content'

export function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false)

  return (
    <footer id="contacts" className="scroll-mt-20 border-t border-border bg-card">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1.2fr]">
        <div>
          <a href="#top" className="font-display text-lg font-bold tracking-wide">
            {site.brand}
          </a>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{site.tagline}</p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">{footer.copyright}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {about.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary/70 hover:text-primary"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Навигация в подвале">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Разделы</p>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Контакты</p>
          <a
            href={site.phoneHref}
            className="mt-4 inline-flex items-center gap-2 font-display text-lg font-semibold transition-colors hover:text-primary"
          >
            <Phone className="h-5 w-5 text-primary" /> {site.phone}
          </a>
          <a
            href={footer.mapHref}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground transition-colors hover:text-foreground"
          >
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {footer.address}
          </a>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            {footer.legalName} · {footer.inn} · {footer.ogrn}
          </p>
        </div>
      </div>

      <div className="border-t border-border py-6">
        <div className="container-x flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl leading-relaxed">{footer.disclaimer}</p>
          <button
            onClick={() => setPrivacyOpen(true)}
            className="cursor-pointer text-left underline-offset-4 transition-colors hover:text-foreground hover:underline sm:text-right"
          >
            Политика обработки персональных данных
          </button>
        </div>
        <p className="container-x mt-4 text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} {site.brand}. Демо-шаблон лендинга: все данные вымышлены.
        </p>
      </div>

      {privacyOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Политика обработки персональных данных"
          onClick={(e) => {
            if (e.target === e.currentTarget) setPrivacyOpen(false)
          }}
        >
          <div className="relative max-h-[80dvh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card p-6">
            <button
              onClick={() => setPrivacyOpen(false)}
              aria-label="Закрыть"
              className="absolute right-3 top-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="pr-10 font-display text-lg font-semibold">Политика обработки персональных данных</h3>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Оставляя заявку на сайте, вы даёте согласие на обработку указанных персональных данных
                (имя, номер телефона) с целью расчёта стоимости автомобиля, консультирования и связи
                по вашему обращению.
              </p>
              <p>
                Данные не передаются третьим лицам, кроме случаев, предусмотренных законодательством РФ,
                и хранятся не дольше, чем этого требуют цели обработки. Вы можете отозвать согласие в любой
                момент, обратившись по телефону {site.phone}.
              </p>
              <p className="text-xs">Демо-текст шаблона — замените на юридически верифицированную версию.</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}
