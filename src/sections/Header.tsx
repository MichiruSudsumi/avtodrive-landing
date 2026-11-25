import { useEffect, useState } from 'react'
import { Menu, Phone, X } from 'lucide-react'
import { nav, site } from '@/content'
import { useQuiz } from '@/components/quiz-context'

export function Header() {
  const { open } = useQuiz()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled || menuOpen ? 'border-b border-border bg-background/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-baseline gap-2" aria-label="Наверх — на главную">
          <span className="font-display text-lg font-bold tracking-wide">{site.brand}</span>
          <span className="hidden text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:inline">
            {site.tagline}
          </span>
        </a>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Основная навигация">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 whitespace-nowrap text-sm font-semibold transition-colors hover:text-primary md:flex"
          >
            <Phone className="h-4 w-4 text-primary" />
            {site.phone}
          </a>
          <button
            onClick={() => open('Шапка сайта')}
            className="hidden h-11 cursor-pointer items-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-[0.97] sm:flex"
          >
            Рассчитать стоимость
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-border bg-secondary/60 transition-colors hover:text-primary lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-border bg-background/95 backdrop-blur-md lg:hidden" aria-label="Мобильная навигация">
          <div className="container-x flex flex-col py-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border/60 py-3 text-sm font-medium last:border-0"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false)
                open('Мобильное меню')
              }}
              className="mt-3 h-12 w-full cursor-pointer rounded-xl bg-primary font-semibold text-primary-foreground"
            >
              Рассчитать стоимость
            </button>
          </div>
        </nav>
      )}
    </header>
  )
}
