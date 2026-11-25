import { QuizProvider } from '@/components/quiz-context'
import { QuizModal } from '@/components/QuizModal'
import { Header } from '@/sections/Header'
import { Hero } from '@/sections/Hero'
import { Marquee } from '@/sections/Marquee'
import { Trims } from '@/sections/Trims'
import { Stats } from '@/sections/Stats'
import { Reviews } from '@/sections/Reviews'
import { Promo } from '@/sections/Promo'
import { Manager } from '@/sections/Manager'
import { Steps } from '@/sections/Steps'
import { LeadMagnet } from '@/sections/LeadMagnet'
import { About } from '@/sections/About'
import { Faq } from '@/sections/Faq'
import { Footer } from '@/sections/Footer'

export default function App() {
  return (
    <QuizProvider>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Trims />
        <Stats />
        <Reviews />
        <Promo />
        <Manager />
        <Steps />
        <LeadMagnet />
        <About />
        <Faq />
      </main>
      <Footer />
      <QuizModal />
    </QuizProvider>
  )
}
