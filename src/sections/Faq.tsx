import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faq } from '@/content'
import { Reveal } from '@/components/Reveal'

export function Faq() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-x max-w-4xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Популярные вопросы</p>
          <h2 className="mt-3 font-display text-2xl font-bold leading-tight sm:text-3xl">
            Отвечаем до того, как вы спросите
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <Accordion type="single" collapsible className="mt-8 space-y-3">
            {faq.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`item-${i}`}
                className="rounded-2xl border border-border bg-card px-5 data-[state=open]:border-primary/40"
              >
                <AccordionTrigger className="cursor-pointer py-5 text-left font-semibold hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
